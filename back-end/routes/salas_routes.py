from flask import Blueprint, request, jsonify
from models.esquema import *
from playhouse.shortcuts import model_to_dict


sala_bp = Blueprint('sala',__name__)


@sala_bp.route('/criar', methods=['POST'])
def createSala():
    try:
        data = request.get_json()

        nome = data['nome_sala']
        lugares = data['quantidade_de_lugares']
        tipo = data['tipo']
        img_sala = data['img']
        cinema = data['cinema_nome']

        sala = Salas(
            nome_sala = nome,
            img_sala = img_sala,
            tipo = tipo,
            quantidade_de_lugares = lugares,
            cinema_nome = cinema
        )
        sala.save()


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
    
@sala_bp.route('/', methods=['GET'])
def salas():
    try:
        salas = Salas.select()
        
        salas_dict = [model_to_dict(sala) for sala in salas]


        return jsonify(salas_dict), 200

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400


@sala_bp.route('/<string:cinema>', methods=['GET'])  # usando na tela de Salas
def getSlas(cinema):
    try:
        
        salas = Salas.select().where(Salas.cinema_nome == cinema)

        lugares_reservados_por_sala = {}
        
        for reserva in Reservas.select():
            sala_id = reserva.sala.id
            cadeiras = json.loads(reserva.cadeiras)
            if sala_id not in lugares_reservados_por_sala:
                lugares_reservados_por_sala[sala_id] = []
            lugares_reservados_por_sala[sala_id].extend(cadeiras)
        
        salas_dict = [model_to_dict(sala) for sala in salas]
        
        for sala_dict in salas_dict:
            sala_id = sala_dict['id']
            if sala_id in lugares_reservados_por_sala:
                sala_dict['lugares_reservados'] = lugares_reservados_por_sala[sala_id]
            else:
                sala_dict['lugares_reservados'] = []


        return jsonify(salas_dict), 200

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400


@sala_bp.route('/v2/<string:nome_cinema>', methods=['GET'])
def get_salas_e_reservas_por_cinemav2(nome_cinema):
    try:
        # Obtém todas as salas e suas reservas associadas ao cinema especificado
        salas_com_reservas = []
        
        for sala in Salas.select().where(Salas.cinema_nome == nome_cinema):
            reservas_sala = Reservas.select().where(Reservas.sala == sala)
            cadeiras_reservadas = [json.loads(reserva.cadeiras) for reserva in reservas_sala]
            salas_com_reservas.append({
                "sala": model_to_dict(sala),
                "reservas": cadeiras_reservadas
            })

        return jsonify(salas_com_reservas), 200

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400
