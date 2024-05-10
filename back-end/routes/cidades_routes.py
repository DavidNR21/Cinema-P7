from flask import Blueprint, request, jsonify
from models.esquema import *
from playhouse.shortcuts import model_to_dict


cidades_bp = Blueprint('cidades',__name__)


@cidades_bp.route('/criar', methods=['POST']) # criar
def createCidades():
    try:
        data = request.get_json()

        nome = data['nome_cidade']
        cinema = data['cidade_nome']

        cidade = Cidades(
            nome_cidade = nome,
            cinema_nome = cinema
        )
        cidade.save()


        response = {
            "message": "Dados JSON recebidos e processados com sucesso",
            "data": data
        }


        return jsonify(response), 200

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400



@cidades_bp.route('/', methods=['GET'])
def getCidades():
    try:
        cidades = Cidades.select()

        cidades_dict = [model_to_dict(cidade) for cidade in cidades]

        return jsonify(cidades_dict), 200

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400



@cidades_bp.route('/all', methods=['GET'])
def getCidades_v2():
    try:
        cidades = (
            Cidades
            .select(Cidades.nome_cidade, fn.MIN(Cidades.id).alias('id'))
            .group_by(Cidades.nome_cidade)
        )

        cidades_dict = [model_to_dict(cidade) for cidade in cidades]

        return jsonify(cidades_dict), 200

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400


@cidades_bp.route('/<string:regiao>', methods=['GET'])
def getCinema_v2(regiao):
    try:

        cinemas = Cidades().select().where(Cidades.nome_cidade == regiao)

        cinemas_dict = [model_to_dict(cinema) for cinema in cinemas]

        return jsonify(cinemas_dict), 200

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400

