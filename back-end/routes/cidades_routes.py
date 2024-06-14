from flask import Blueprint, request, jsonify
from models.esquema import *
from playhouse.shortcuts import model_to_dict


cidades_bp = Blueprint('cidades',__name__)


@cidades_bp.route('/criar', methods=['POST']) # criar
def createCidades():
    try:
        data = request.get_json()

        nome = data['nome_cidade']
        cinema = data['cinema_nome']
        propietario = data['propietario']
        rua = data['rua']

        
        Cidades.create(
            nome_cidade = nome,
            cinema_nome = cinema,
            propietario = propietario,
            rua = rua
        )


        response = {
            "message": "Dados JSON recebidos e processados com sucesso"
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


@cidades_bp.route('/update/<string:cinema>', methods=['PUT']) # criar
def updateCidades(cinema):
    try:
        data = request.get_json()

        query = Cidades.update(**data).where(Cidades.cinema_nome == cinema)

        query.execute()


        response = {
            "message": "Dados JSON recebidos e processados com sucesso"
        }


        return jsonify(response), 200

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400



@cidades_bp.route('/all', methods=['GET'])
def getCidades_v2():
    try:
        cidades = (
            Cidades
            .select(Cidades.nome_cidade)
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


@cidades_bp.route('/delete/<string:nome>', methods=['DELETE'])
def deleteCidade(nome):
    try:
        user_delete = Cidades.get(Cidades.cinema_nome == nome)

        user_delete.delete_instance()

        response = {
            "message": f"Deletado com sucesso."
        }

        return jsonify(response), 200

    except Usuarios.DoesNotExist:
        error_message = {"error": f"Usuário com ID: {id} não encontrado."}
        return jsonify(error_message), 404

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400


@cidades_bp.route('/admin/<string:n>', methods=['GET'])
def getCidadesAdmin(n):
    try:

        cinemas = Cidades().select().where(Cidades.propietario == n)

        cinemas_dict = [model_to_dict(cinema) for cinema in cinemas]

        return jsonify(cinemas_dict), 200

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400
