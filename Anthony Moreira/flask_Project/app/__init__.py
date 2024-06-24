from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('config.py')

    db.init_app(app)
    migrate.init_app(app, db)

    from app.routes.prestamo_routes import prestamo_bp
    from app.routes.devolucion_routes import devolucion_bp
    from app.routes.reserva_routes import reserva_bp
    from app.routes.auth_routes import auth_bp

    app.register_blueprint(prestamo_bp)
    app.register_blueprint(devolucion_bp)
    app.register_blueprint(reserva_bp)
    app.register_blueprint(auth_bp)

    @app.route('/')
    def index():
        return '¡Bienvenido a mi aplicación Flask con SQLAlchemy y Flask-Migrate!'

    return app
