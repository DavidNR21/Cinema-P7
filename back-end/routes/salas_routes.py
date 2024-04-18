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

        sala = Salas(
            nome_sala = nome,
            quantidade_de_lugares = lugares,
        )
        sala.save()


        response = {
            "message": "Dados JSON recebidos e processados com sucesso",
            "dados enviados": data
        }


        return jsonify(response), 200

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400
    

    