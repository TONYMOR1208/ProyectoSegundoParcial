from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


app = Flask(__name__)
app.config.from_pyfile('config.py')

@app.route('/')
def index():
    return '¡Bienvenido a mi aplicación Flask con SQLAlchemy y Flask-Migrate!'


db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Importa los modelos para que Alembic pueda detectarlos
from app import models

# Importa y registra las rutas
from app.routes.libro_routes import libro_bp
from app.routes.usuario_routes import usuario_bp
from app.routes.prestamo_routes import prestamo_bp
from app.routes.devolucion_routes import devolucion_bp
from app.routes.genero_routes import genero_bp
from app.routes.editorial_routes import editorial_bp

app.register_blueprint(libro_bp)
app.register_blueprint(usuario_bp)
app.register_blueprint(prestamo_bp)
app.register_blueprint(devolucion_bp)
app.register_blueprint(genero_bp)
app.register_blueprint(editorial_bp)

