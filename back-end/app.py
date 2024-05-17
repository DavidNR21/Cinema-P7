from flask import *
from flask_cors import CORS
from models.esquema import *
from routes.users_routes import add_bp
from routes.filmes_routes import filme_bp
from routes.salas_routes import sala_bp
from routes.cidades_routes import cidades_bp
from routes.reservas_routes import reservas_bp
import time


app = Flask(__name__)
#CORS(app, resources={r"/user/*": {"origins": "*", "supports_credentials": True}})
#CORS(app, resources={r"/filme/*": {"origins": "*", "supports_credentials": True}})
#CORS(app, resources={r"/sala/*": {"origins": "*", "supports_credentials": True}})
#CORS(app, resources={r"/cidades/*": {"origins": "*", "supports_credentials": True}})
#CORS(app, supports_credentials=True)

CORS(app, origins='*')


app.config['JSON_SORT_KEYS'] = False
app.register_blueprint(add_bp, url_prefix="/user")
app.register_blueprint(filme_bp, url_prefix="/filme")
app.register_blueprint(sala_bp, url_prefix="/sala")
app.register_blueprint(cidades_bp, url_prefix="/cidades")
app.register_blueprint(reservas_bp, url_prefix="/reservas")


# rotas usuarios iniciadas
# rotas filmes iniciadas
# rotas salas iniciadas
# rotas cidades/cinemas iniciadas


#########################################################################################################



@app.route('/')
def index():

    cidade_data = {
        "cinema_nome": "Cine-Guedes",
        "nome_cidade": "Patos-PB"
    }

    cidade_data2 = {
        "cinema_nome": "Multicines",
        "nome_cidade": "Patos-PB"
    }

    cidade_data3 = {
        "cinema_nome": "ManairaShopping",
        "nome_cidade": "Joao Pessoa-PB"
    }

    cidade_data4 = {
        "cinema_nome": "PartagemShopping",
        "nome_cidade": "Campina Grande-PB"
    }

    Cidades.create(**cidade_data)

    Cidades.create(**cidade_data2)

    Cidades.create(**cidade_data3)

    Cidades.create(**cidade_data4)

    time.sleep(1)

    sala_data = {
        "cinema_nome": "Cine-Guedes",
        "img_sala": "https://veja.abril.com.br/wp-content/uploads/2016/10/cinema1.jpg?quality=90&strip=info&w=720&h=440&crop=1",
        "nome_sala": "Sala 1",
        "quantidade_de_lugares": 40,
        "tipo": "2D"
    }

    sala_data2 = {
        "cinema_nome": "Cine-Guedes",
        "img_sala": "https://veja.abril.com.br/wp-content/uploads/2016/10/cinema1.jpg?quality=90&strip=info&w=720&h=440&crop=1",
        "nome_sala": "Sala 2",
        "quantidade_de_lugares": 48,
        "tipo": "3D"
    }

    sala_data3 = {
        "cinema_nome": "ManairaShopping",
        "img_sala": "https://veja.abril.com.br/wp-content/uploads/2016/10/cinema1.jpg?quality=90&strip=info&w=720&h=440&crop=1",
        "nome_sala": "Sala 3",
        "quantidade_de_lugares": 56,
        "tipo": "3D"
    }

    sala_data4 = {
        "cinema_nome": "Multicines",
        "img_sala": "https://veja.abril.com.br/wp-content/uploads/2016/10/cinema1.jpg?quality=90&strip=info&w=720&h=440&crop=1",
        "nome_sala": "Sala 4",
        "quantidade_de_lugares": 56,
        "tipo": "IMAX"
    }

    sala_data5 = {
        "cinema_nome": "ManairaShopping",
        "img_sala": "https://veja.abril.com.br/wp-content/uploads/2016/10/cinema1.jpg?quality=90&strip=info&w=720&h=440&crop=1",
        "nome_sala": "Sala 5",
        "quantidade_de_lugares": 40,
        "tipo": "2D"
    }

    Salas.create(**sala_data)

    Salas.create(**sala_data2)

    Salas.create(**sala_data3)

    Salas.create(**sala_data4)

    Salas.create(**sala_data5)

    time.sleep(1)

    data1 = {
        "dub_leg": "DUB",
        "duracao": "2h 18m",
        "horarios": "19:00",
        "imagem": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT1wJblWO1WGI4xTI7s5rzmTqgA4tNCMz5WMw1jvxl0JpA-JN8I",
        "nome_filme": "Vingadores",
        "preco_ingresso": 15.0,
        "cinema" : "Multicines"
    }

    data2 = {
        "dub_leg": "DUB",
        "duracao": "2h 21m",
        "horarios": "17:00",
        "imagem": "https://pbs.twimg.com/media/E0J45tcWYAYs1bv.jpg:large",
        "nome_filme": "A Origem",
        "preco_ingresso": 17.5,
        "cinema" : "Cine-Guedes"
    }

    data3 = {
        "dub_leg": "DUB",
        "duracao": "2h 21m",
        "horarios": "17:00",
        "imagem": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-1t6PkPosP80FBAsRzIM_SuZGdcY6svaMfWP8X9BdiqNUvyQ8",
        "nome_filme": "A Origem",
        "preco_ingresso": 17.5,
        "cinema" : "Cine-Guedes"
    }

    data4 = {
        "dub_leg": "DUB",
        "duracao": "2h 18m",
        "horarios": "19:00",
        "imagem": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT1wJblWO1WGI4xTI7s5rzmTqgA4tNCMz5WMw1jvxl0JpA-JN8I",
        "nome_filme": "O Preço do Amanhã",
        "preco_ingresso": 15.0,
        "cinema" : "Cine-Guedes"
    }

    Filmes.create(**data1)

    Filmes.create(**data2)

    Filmes.create(**data3)

    Filmes.create(**data4)

    

    return 'Hello, World!'



if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
