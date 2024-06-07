from peewee import *
from flask_login import UserMixin
import uuid
import json


db = PostgresqlDatabase('Cinema',port=5432,user='postgres',password='123456')

# criei o banco no postgres, coloque o nome, porta, user e senha


class BaseModel(Model):
    class Meta():
        database = db


class Usuarios(BaseModel, UserMixin):
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    nome = CharField(max_length=200)
    email = CharField(max_length=200, unique=True)
    cpf = CharField(max_length=25, unique=True)
    senha = CharField(max_length=200)
    celular = CharField(max_length=200)
    sexo = CharField(max_length=200)
    nascimento = DateField()
    isAdmin = BooleanField()
    localidade = TextField()
    criadoEm = DateTimeField(constraints=[SQL('DEFAULT CURRENT_TIMESTAMP')])

    def to_json(self):
        data = {
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
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    nome_sala = CharField(max_length=200)
    img_sala = CharField(max_length=256)
    tipo = CharField(max_length=200)
    quantidade_de_lugares = IntegerField()
    cinema_nome = CharField(max_length=200)


class Cidades(BaseModel):
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    nome_cidade = CharField(max_length=100)
    cinema_nome = CharField(max_length=100)
    propietario = TextField()
    rua = TextField()


class Filmes(BaseModel):
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    nome_filme = CharField(max_length=100)
    imagem = TextField()
    preco_ingresso = FloatField()
    horarios = CharField(max_length=100)
    dub_leg = CharField(max_length=100)
    duracao = CharField(max_length=100)
    cinema = TextField(null=True)


class Reservas(BaseModel):
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    usuario = TextField()
    sala = ForeignKeyField(Salas, backref='reservas', on_delete='CASCADE')
    filme = ForeignKeyField(Filmes, backref='reservas', on_delete='CASCADE')
    cidade = ForeignKeyField(Cidades, backref='reservas', on_delete='CASCADE')
    horario = CharField(max_length=100)
    cadeiras = CharField(max_length=200)
    dia = TextField()



db.connect()
db.create_tables([Usuarios, Filmes, Salas, Reservas, Cidades])
db.close()
