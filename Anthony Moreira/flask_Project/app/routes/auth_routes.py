from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from app import db
from app.models import User
from app.tokens import generate_auth_token

auth_bp = Blueprint('auth_bp', __name__, url_prefix='/auth')

@auth_bp.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')


    if not username or not password:
        return jsonify({'message': 'Falta nombre de usuario o contraseña'}), 400


    if len(username) < 3 or len(username) > 50:
        return jsonify({'message': 'El nombre de usuario debe tener entre 3 y 50 caracteres'}), 400
    

    if not username.isalnum() and '_' not in username:
        return jsonify({'message': 'El nombre de usuario solo puede contener letras, números y _'}), 400

 
    if len(password) < 8:
        return jsonify({'message': 'La contraseña debe tener al menos 8 caracteres'}), 400
    if not any(char.isdigit() for char in password):
        return jsonify({'message': 'La contraseña debe contener al menos un número'}), 400
    if password.isalnum():
        return jsonify({'message': 'La contraseña debe contener al menos un carácter especial'}), 400

    # Verificar si el nombre de usuario ya está en uso
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'El nombre de usuario ya está en uso'}), 409

    # Crear hash de la contraseña
    password_hash = generate_password_hash(password)

    # Crear nuevo usuario
    new_user = User(username=username, password_hash=password_hash)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Usuario registrado exitosamente'}), 201

@auth_bp.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

 
    if not username or not password:
        return jsonify({'message': 'Falta nombre de usuario o contraseña'}), 400

    # Buscar usuario en la base de datos
    user = User.query.filter_by(username=username).first()

    # Verificar existencia de usuario y validar contraseña
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'message': 'Credenciales inválidas'}), 401

    # Generar token de autenticación
    token = generate_auth_token(user.id)

    return jsonify({'token': token}), 200
