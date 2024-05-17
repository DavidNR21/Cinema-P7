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


        Filmes.create(
            nome_filme = nome,
            imagem = img,
            preco_ingresso = preco,
            horarios = horario,
            dub_leg = dublagem,
            duracao = duracao,
            cinema = cinema,
        )
        #filme.save()


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


@filme_bp.route('/<string:cinema>', methods=['GET'])
def getFilme_por_cinema(cinema):
    try:
        
        filmes = Filmes.select().where(Filmes.cinema == cinema)

        
        filmes_dict = [model_to_dict(f) for f in filmes]

        return jsonify(filmes_dict), 200

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400



@filme_bp.route('/details/<string:id>', methods=['GET'])
def getFilme_por_id(id):
    try:

        query = Filmes.select().where(Filmes.id == id)

        f = [model_to_dict(item) for item in query]

        query_sala = Salas.select().where(Salas.cinema_nome == f[0]['cinema'])

        s = [model_to_dict(item_sala) for item_sala in query_sala]

        query_cidade = Cidades.select().where(Cidades.cinema_nome == s[0]['cinema_nome'])

        c = [model_to_dict(item_cidade) for item_cidade in query_cidade]

        f[0]['salas'] = s
        f[0]['cidades'] = c

        print(f[0]['nome_filme'])

        # Retornando o dicionário como JSON
        return jsonify(f), 200


    except Filmes.DoesNotExist:
        return jsonify({"error": "Filme não encontrado"}), 404

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400
