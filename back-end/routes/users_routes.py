from flask import Blueprint, request, jsonify, redirect, url_for
from models.esquema import *
import bcrypt
import json


add_bp = Blueprint('users',__name__)


@add_bp.route('/add', methods=['POST'])  # criar
def addUser():
    try:
        data = request.get_json()

        nome = data['nome']
        email = data['email']
        senha = data['senha']
        cpf = data['cpf']
        sexo = data['sexo']
        telefone = data['celular']
        nascimento = data['nascimento']
        #local = data['cidade']

        senha_criptografada = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt())

        cpf_formatado = '{}.{}.{}-{}'.format(cpf[:3], cpf[3:6], cpf[6:9], cpf[9:])

        Usuarios.create(
            nome = nome,
            email = email,
            cpf = cpf_formatado,
            senha = senha_criptografada,
            celular = telefone,
            sexo = sexo,
            nascimento = nascimento,
            isAdmin = False,
            localidade = '-x-'
        )

        response = {
            "message": "Dados JSON recebidos e processados com sucesso",
            "Data": data,
            "success" : 200
        }


        return jsonify(response), 201

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400
    


@add_bp.route('/<string:id>', methods=['GET'])  # pegar informações
def readUser(id):
    try:
        user = Usuarios.get_by_id(id)

        if user:
            user_array = [user.to_json()]

            response = {
                "message": f"usuario com id: {id} foi encontrado.",
                "User": user_array
            }

            return jsonify(response), 200


    except Usuarios.DoesNotExist:
        response_404 = {
            "message": "Usuário não encontrado com o ID fornecido"
        }
        return jsonify(response_404), 404

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400



@add_bp.route('/update/<string:id>', methods=['PUT'])
def updateUser(id):
    try:
        data = request.get_json()

        input = data['metodo']

        if data['state'] == 'login':
            id = Usuarios.select().where(Usuarios.email == data['email']).get()
            print(id)
            del data['state']
            del data['email']
        else:
            del data['state']
            del data['email']

        print(data)

        if input == 'senha':

            del data['metodo']

            senha_up = data['senha']

            senha_criptografada = bcrypt.hashpw(senha_up.encode('utf-8'), bcrypt.gensalt())

            data['senha'] = senha_criptografada

            query = Usuarios.update(**data).where(Usuarios.id == id)

            query.execute()

            user = Usuarios.get_by_id(id)

        else:
            print('outro metodo')


        response = {
            "message": f"Usuário com ID: {id} foi atualizado com sucesso.",
            "data": user.to_json()
        }

        return jsonify(response), 200

    except Usuarios.DoesNotExist:
        error_message = {"error": f"Usuário com ID: {id} não encontrado."}
        return jsonify(error_message), 404

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400



@add_bp.route('/delete/<string:id>', methods=['DELETE']) # deletar pelo id
def deleteUser(id):
    try:
        user_delete = Usuarios.get(Usuarios.id == id)

        user_delete.delete_instance()

        response = {
            "message": f"Usuário com ID: {id} foi deletado com sucesso.",
            "data": "Deletado com sucesso"
        }

        return jsonify(response), 200

    except Usuarios.DoesNotExist:
        error_message = {"error": f"Usuário com ID: {id} não encontrado."}
        return jsonify(error_message), 404

    except Exception as e:
        error_message = {"error": str(e)}
        print("Erro:", e)
        return jsonify(error_message), 400


@add_bp.route('/login', methods=['POST']) # fazer login
def login(): 
    try:
        data = request.get_json()

        email = data['email']
        senha = data['senha']

        if not email or not senha:
            raise ValueError("Credenciais incompletas")
            
        
        query = Usuarios.select().where(Usuarios.email == email)
        user = query.first()
        
        user_json = json.loads(user.to_json())

        senha_obtida = user_json['senha']

        if bcrypt.checkpw(senha.encode('utf-8'), senha_obtida.encode('utf-8')):

            user_json['senha'] = senha
            user_json['id'] = user.id

            response = {
                "message": f"Login feito com sucesso.",
                "data": user_json,
                "success" : True
            }

            return jsonify(response), 200
        
        else:
            return jsonify("Credenciais invalidas"), 500


    except Exception as e:
        error_message = {"error": str(e)}
        return jsonify(error_message), 500
    