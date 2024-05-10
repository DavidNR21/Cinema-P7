from flask import Blueprint, request, jsonify
from models.esquema import *
from playhouse.shortcuts import model_to_dict


filme_bp = Blueprint('filmes',__name__)


@filme_bp.route('/criar', methods=['POST']) # criar
def createFilme():
    try:
        data = request.get_json()

        nome = data['nome']
        img = data['imagem']
        preco = data['preco']
        horario = data['horario']
        duracao = data['duracao']
        dublagem = data['dublagem']
        cinema = data['cinema_nome']
        sala = data['sala_nome']


        filme = Filmes(
            nome_filme = nome,
            imagem = img,
            preco_ingresso = preco,
            horarios = horario,
            dub_leg = dublagem,
            duracao = duracao,
            cinema = cinema,
            sala = Salas.select().where(Salas.nome_sala == sala).get()
        )
        filme.save()


        response = {
            "message": "Dados JSON recebidos e processados com sucesso",
            "dados enviados": data
        }


        return jsonify(response), 200

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400



@filme_bp.route('/all', methods=['GET'])  # pegar todos os filmes disponiveis
def getFilme():
    try:
        
        filmes = Filmes.select()

        
        filmes_dict = [model_to_dict(f) for f in filmes]

        return jsonify(filmes_dict), 200

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400


@filme_bp.route('/<string:cinema>', methods=['GET'])  # pegar todos os filmes disponiveis
def getFilme_por_cinema(cinema):
    try:
        
        filmes = Filmes.select().where(Filmes.cinema == cinema)

        
        filmes_dict = [model_to_dict(f) for f in filmes]

        return jsonify(filmes_dict), 200

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400

