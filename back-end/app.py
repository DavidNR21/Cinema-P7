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

CORS(app)


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
        "nome_cidade": "Patos-PB",
        "propietario" : "A",
        "rua" : "Rua pedro firmino 1"
    }

    cidade_data2 = {
        "cinema_nome": "Multicines",
        "nome_cidade": "Patos-PB",
        "propietario" : "B",
        "rua" : "Rua pedro firmino 2"
    }

    cidade_data3 = {
        "cinema_nome": "ManairaShopping",
        "nome_cidade": "Joao Pessoa-PB",
        "propietario" : "C",
        "rua" : "Rua pedro firmino 3"
    }

    cidade_data4 = {
        "cinema_nome": "PartagemShopping",
        "nome_cidade": "Campina Grande-PB",
        "propietario" : "D",
        "rua" : "Rua pedro firmino 4"
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
        "nome_sala": "Sala 2",
        "quantidade_de_lugares": 56,
        "tipo": "3D"
    }

    sala_data4 = {
        "cinema_nome": "Multicines",
        "img_sala": "https://veja.abril.com.br/wp-content/uploads/2016/10/cinema1.jpg?quality=90&strip=info&w=720&h=440&crop=1",
        "nome_sala": "Sala 1",
        "quantidade_de_lugares": 56,
        "tipo": "IMAX"
    }

    sala_data7 = {
        "cinema_nome": "Multicines",
        "img_sala": "https://veja.abril.com.br/wp-content/uploads/2016/10/cinema1.jpg?quality=90&strip=info&w=720&h=440&crop=1",
        "nome_sala": "Sala 2",
        "quantidade_de_lugares": 48,
        "tipo": "3D"
    }

    sala_data5 = {
        "cinema_nome": "ManairaShopping",
        "img_sala": "https://veja.abril.com.br/wp-content/uploads/2016/10/cinema1.jpg?quality=90&strip=info&w=720&h=440&crop=1",
        "nome_sala": "Sala 1",
        "quantidade_de_lugares": 40,
        "tipo": "2D"
    }

    sala_data6 = {
        "cinema_nome": "PartagemShopping",
        "img_sala": "https://veja.abril.com.br/wp-content/uploads/2016/10/cinema1.jpg?quality=90&strip=info&w=720&h=440&crop=1",
        "nome_sala": "Sala 1",
        "quantidade_de_lugares": 48,
        "tipo": "3D"
    }

    sala_data8 = {
        "cinema_nome": "PartagemShopping",
        "img_sala": "https://veja.abril.com.br/wp-content/uploads/2016/10/cinema1.jpg?quality=90&strip=info&w=720&h=440&crop=1",
        "nome_sala": "Sala 2",
        "quantidade_de_lugares": 56,
        "tipo": "IMAX"
    }

    Salas.create(**sala_data)

    Salas.create(**sala_data2)

    Salas.create(**sala_data3)

    Salas.create(**sala_data4)

    Salas.create(**sala_data5)

    Salas.create(**sala_data6)

    Salas.create(**sala_data7)

    Salas.create(**sala_data8)

    time.sleep(1)


    data1 = {
        "dub_leg": "DUB",
        "duracao": "1h 49m",
        "horarios": "19:00",
        "imagem": "https://br.web.img2.acsta.net/medias/nmedia/18/87/36/43/19874732.jpg",
        "nome_filme": "O Preço do Amanhã",
        "preco_ingresso": 12.50,
        "cinema" : "Multicines"
    }

    data2 = {
        "dub_leg": "DUB",
        "duracao": "2h 28m",
        "horarios": "17:00",
        "imagem": "https://br.web.img3.acsta.net/medias/nmedia/18/87/32/31/20028688.jpg",
        "nome_filme": "A Origem",
        "preco_ingresso": 14.5,
        "cinema" : "Cine-Guedes"
    }

    data3 = {
        "dub_leg": "DUB",
        "duracao": "1h 44m",
        "horarios": "19:00",
        "imagem": "https://br.web.img2.acsta.net/c_310_420/pictures/18/01/03/19/24/3938254.jpg",
        "nome_filme": "Os Farofeiros",
        "preco_ingresso": 12.5,
        "cinema" : "Cine-Guedes"
    }

    data4 = {
        "dub_leg": "DUB",
        "duracao": "2h 34m",
        "horarios": "17:00",
        "imagem": "https://br.web.img3.acsta.net/pictures/17/05/09/20/05/120513.jpg",
        "nome_filme": "Transformers: O Último Cavaleiro",
        "preco_ingresso": 15.0,
        "cinema" : "ManairaShopping"
    }

    data5 = {
        "dub_leg": "DUB",
        "duracao": "3h 2m",
        "horarios": "19:15",
        "imagem": "https://br.web.img3.acsta.net/pictures/19/04/26/17/30/2428965.jpg",
        "nome_filme": "Vingadores: Ultimato",
        "preco_ingresso": 17.0,
        "cinema" : "ManairaShopping"
    }

    data6 = {
        "dub_leg": "DUB",
        "duracao": "2h 31m",
        "horarios": "21:00",
        "imagem": "https://br.web.img3.acsta.net/c_310_420/pictures/16/01/18/18/57/082205.jpg",
        "nome_filme": "Perdido em Marte",
        "preco_ingresso": 10.0,
        "cinema" : "PartagemShopping"
    }

    data7= {
        "dub_leg": "DUB",
        "duracao": "1h 44m",
        "horarios": "18:00",
        "imagem": "https://br.web.img2.acsta.net/c_310_420/medias/nmedia/18/87/01/20/19871084.jpg",
        "nome_filme": "O Dia em que a Terra Parou",
        "preco_ingresso": 14.0,
        "cinema" : "PartagemShopping"
    }

    data8 = {
        "dub_leg": "DUB",
        "duracao": "1h 57m",
        "horarios": "21:00",
        "imagem": "https://br.web.img2.acsta.net/pictures/17/02/24/16/32/482058.jpg",
        "nome_filme": "Fragmentado",
        "preco_ingresso": 14.50,
        "cinema" : "Multicines"
    }

    data9 = {
        "dub_leg": "DUB",
        "duracao": "3h",
        "horarios": "15:00",
        "imagem": "https://br.web.img2.acsta.net/pictures/23/05/08/10/29/0695770.jpg",
        "nome_filme": "Oppenheimer",
        "preco_ingresso": 15.5,
        "cinema" : "Cine-Guedes"
    }

    data10 = {
        "dub_leg": "DUB",
        "duracao": "2h 25m",
        "horarios": "15:00",
        "imagem": "https://br.web.img2.acsta.net/pictures/23/11/08/13/46/4065511.png",
        "nome_filme": "Planeta dos Macacos: O Reinado",
        "preco_ingresso": 16.50,
        "cinema" : "Multicines"
    }


    Filmes.create(**data1)

    Filmes.create(**data2)

    Filmes.create(**data3)

    Filmes.create(**data4)

    Filmes.create(**data5)

    Filmes.create(**data6)

    Filmes.create(**data7)

    Filmes.create(**data8)

    Filmes.create(**data9)

    Filmes.create(**data10)

    

    return 'Hello, World!'



if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
