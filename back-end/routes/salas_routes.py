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

        sala = Salas(
            nome_sala = nome,
            img_sala = img_sala,
            tipo = tipo,
            quantidade_de_lugares = lugares,
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
    

@sala_bp.route('/', methods=['GET'])  # usando para pegar as salas e se possui lugares
def getSlas():
    try:
        
        salas = Salas.select()

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


    