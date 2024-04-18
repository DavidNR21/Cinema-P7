from flask import *
from flask_cors import CORS
from models.esquema import *
from routes.users_routes import add_bp
from routes.filmes_routes import filme_bp
from routes.salas_routes import sala_bp

app = Flask(__name__)
CORS(app)


app.config['JSON_SORT_KEYS'] = False
app.register_blueprint(add_bp, url_prefix="/user")
app.register_blueprint(filme_bp, url_prefix="/filme")
app.register_blueprint(sala_bp, url_prefix="/sala")


# rotas usuarios iniciadas
# rotas filmes iniciadas
# rotas salas iniciadas

#########################################################################################################


@app.route('/')
def index():
    return 'Hello, World!'



if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
