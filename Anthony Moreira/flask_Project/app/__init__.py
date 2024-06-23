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


from app.routes.prestamo_routes import prestamo_bp
from app.routes.devolucion_routes import devolucion_bp
from app.routes.reserva_routes import reserva_bp




app.register_blueprint(prestamo_bp)
app.register_blueprint(devolucion_bp)
app.register_blueprint(reserva_bp)


