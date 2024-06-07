from flask import Blueprint, request, jsonify, send_file
from models.esquema import *
from playhouse.shortcuts import model_to_dict
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib import utils
import io
import requests
from PIL import Image
import json


reservas_bp = Blueprint('reservas',__name__)



@reservas_bp.route('/criar', methods=['POST'])
def createReserva():
    try:
        data = request.get_json()

        usuario = data['nome_usuario']
        sala = data['nome_sala']
        filme = data['nome_filme']
        cinema = data['nome_cinema']
        horario = data['horario']
        cadeiras = data['cadeiras']
        ingressos = data['ingressos']
        dia = data['dia']
        idSala = data['id_sala']

        print(data)

        for i in range(int(ingressos)):
            print(f'ingresso {i}, cadeira: {cadeiras[i]}')

            Reservas.create(
                usuario = usuario,
                sala = Salas.get(Salas.id == idSala),
                filme = Filmes.select().where(Filmes.nome_filme == filme).get(),
                cidade = Cidades.select().where(Cidades.cinema_nome == cinema).get(),
                horario = horario,
                cadeiras = cadeiras[i],
                dia = dia
            )


        response = {
            "message": "Dados JSON recebidos e processados com sucesso",
            "data": data,
            "success" : True
        }


        return jsonify(response), 200

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400
    
    

@reservas_bp.route('/', methods=['get'])
def getReservas():
    try:
        reservas = Reservas.select()

        
        reservas_dict = [model_to_dict(f) for f in reservas]

        return jsonify(reservas_dict), 200

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400


@reservas_bp.route('/all/<string:nome>', methods=['get'])
def getReservas_user(nome):
    try:
        reservas = Reservas.select().where(Reservas.usuario == nome)
        
        reservas_dict = [model_to_dict(f) for f in reservas]

        return jsonify(reservas_dict), 200

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400
    



@reservas_bp.route('/v2/gerar/<string:reserva_id>', methods=['GET'])
def gerar_pdfV2(reserva_id):

    def get_image_from_url(url):
        response = requests.get(url)
        img = Image.open(io.BytesIO(response.content))
        return img
    
    def mm2p(milimetro):
        return milimetro / 0.352777

    try:
        reserva = Reservas.get_by_id(reserva_id)

        buffer = io.BytesIO()
        p = canvas.Canvas(buffer, pagesize=A4)
        width, height = A4

        p.drawImage('./utils/template_ingresso.png', 0, 0, width=width, height=height)

        # Baixar e desenhar a imagem do filme
        img = get_image_from_url(reserva.filme.imagem)
        img_width, img_height = img.size
        aspect = img_height / float(img_width)
        img_width = 2 * inch
        img_height = img_width * aspect
        img_path = "temp_image.jpg"
        img.save(img_path)
        p.drawImage(img_path, 60, height - img_height - 80, width=img_width, height=img_height)

        # Ajustar posição após a imagem
        y_position = mm2p(175)

        # Desenhar texto no PDF com melhor estilização
        p.setFont("Helvetica-Bold", 20)
        p.drawString(mm2p(20), y_position, f"Ingresso para: {reserva.usuario}")
        
        y_position -= 35
        p.setFont("Helvetica", 17)
        p.drawString(mm2p(20), y_position, f"Filme: {reserva.filme.nome_filme}")
        y_position -= 20
        p.drawString(mm2p(20), y_position, f"Cinema: {reserva.cidade.cinema_nome}")
        y_position -= 20
        p.drawString(mm2p(20), y_position, f"Cidade: {reserva.cidade.nome_cidade}")
        y_position -= 20
        p.drawString(mm2p(20), y_position, f"Sala: {reserva.sala.nome_sala}")
        y_position -= 50
        p.drawString(mm2p(20), y_position, f"Horário: {reserva.horario}")
        y_position -= 20
        p.drawString(mm2p(20), y_position, f"Cadeira: {reserva.cadeiras}")
        y_position -= 20
        p.drawString(mm2p(20), y_position, f"Dia: {reserva.dia}")

        # Melhorar o layout visual
        p.line(40, y_position - 10, width - 100, y_position - 10)
        y_position -= 20
        p.setFont("Helvetica-Oblique", 10)
        p.drawString(40, y_position, "Obrigado por escolher nosso cinema!")

        p.showPage()
        p.save()

        buffer.seek(0)
        return send_file(buffer, as_attachment=True, download_name='ingresso.pdf', mimetype='application/pdf')


    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400

