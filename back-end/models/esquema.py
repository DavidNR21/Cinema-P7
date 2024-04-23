from peewee import *
import json


db = PostgresqlDatabase('Cinema',port=5432,user='postgres',password='123456')

# criei o banco no postgres, coloque o nome, porta, user e senha


class BaseModel(Model):
    class Meta():
        database = db


class Usuarios(BaseModel):
    nome = TextField()
    email = TextField(unique=True, null=False)
    cpf = TextField(unique=True, null=False)
    senha = TextField(null=False)
    celular = TextField()
    sexo = TextField()
    nascimento = DateField()
    isAdmin = BooleanField()
    criadoEm = DateTimeField(constraints=[SQL('DEFAULT CURRENT_TIMESTAMP')])

    def to_json(self):
        data = {
            "id" : self.id,
            "nome" : self.nome,
            "email" : self.email,
            "senha" : self.senha,
            "cpf" : self.cpf,
            "sexo" : self.sexo,
            "celular" : self.celular,
            "nascimento" : self.nascimento.strftime('%Y-%m-%d'),
            "admin" : self.isAdmin,
        }

        return json.dumps(data)


class Salas(BaseModel):
    nome_sala = TextField()
    img_sala = TextField()
    tipo = TextField()
    quantidade_de_lugares = IntegerField()


class Filmes(BaseModel):
    nome_filme = TextField()
    imagem = TextField()
    preco_ingresso = FloatField()
    horarios = TextField()
    dub_leg = TextField()
    duracao = TextField()
    sala = ForeignKeyField(Salas, backref='reservas', on_delete='CASCADE')


class Reservas(BaseModel):
    usuario = ForeignKeyField(Usuarios, backref='reservas', on_delete='CASCADE')
    sala = ForeignKeyField(Salas, backref='reservas', on_delete='CASCADE')
    filme = ForeignKeyField(Filmes, backref='reservas', on_delete='CASCADE')
    ingressos = IntegerField()
    horario = TextField()
    cadeiras = TextField()


db.connect()
db.create_tables([Usuarios, Filmes, Salas, Reservas])


atributos = {
    "dub_leg": "DUB",
    "duracao": "2h 18m",
    "horarios": "19:00",
    "imagem": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT1wJblWO1WGI4xTI7s5rzmTqgA4tNCMz5WMw1jvxl0JpA-JN8I",
    "nome_filme": "O Preço do Amanhã",
    "preco_ingresso": 15.0,
    "sala": 1  # Adicione a sala aqui
}

#f1 = Filmes(**atributos)
#f1.save()

#r1 = Reservas(usuario = 1, sala = 1, filme = 1, ingressos = 1, horario = '19:00', cadeiras = '[18,19,20]')
#r1.save()

db.close()
