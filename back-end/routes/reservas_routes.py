from flask import Blueprint, request, jsonify, redirect, url_for
from models.esquema import *
from playhouse.shortcuts import model_to_dict
import json


reservas_bp = Blueprint('reservas',__name__)



@reservas_bp.route('/criar', methods=['POST'])
def createReserva():
    try:
        data = request.get_json()

        usuario = data['nome_usuario']
        sala = data['nome_sala']
        filme = data['nome_filme']
        cinema = data['nome_cidade']
        horario = data['horario']
        cadeiras = data['cadeiras']


        Reservas.create(
            usuario = Usuarios.select().where(Usuarios.nome == usuario).get(),
            sala = Salas.select().where(Salas.nome_sala == sala).get(),
            filme = Filmes.select().where(Filmes.nome_filme == filme).get(),
            cidade = Cidades.select().where(Cidades.cinema_nome == 'Multicines').get(),
            horario = horario,
            cadeiras = cadeiras
        )


        response = {
            "message": "Dados JSON recebidos e processados com sucesso",
            "data": cinema,
            "success" : True
        }


        return jsonify(response), 200

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400
    
    

@reservas_bp.route('/', methods=['get'])
def createReserva2():
    try:
        filmes = Reservas.select()

        
        filmes_dict = [model_to_dict(f) for f in filmes]

        return jsonify(filmes_dict), 200


    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400

