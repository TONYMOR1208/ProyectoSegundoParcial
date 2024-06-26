from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('config.py')

    # Inicialización de extensiones
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Configuración CORS permitiendo todos los orígenes
    CORS(app)

    # Importación de blueprints
    from app.routes.prestamo_routes import prestamo_bp
    from app.routes.devolucion_routes import devolucion_bp
    from app.routes.reserva_routes import reserva_bp
    from app.routes.auth_routes import auth_bp

    # Registro de blueprints
    app.register_blueprint(prestamo_bp)
    app.register_blueprint(devolucion_bp)
    app.register_blueprint(reserva_bp)
    app.register_blueprint(auth_bp)

    # Ruta para la página de inicio
    @app.route('/')
    def index():
        return render_template('inicio.html')

    return app
