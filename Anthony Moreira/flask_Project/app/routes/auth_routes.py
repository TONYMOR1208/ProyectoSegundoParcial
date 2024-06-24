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

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'El nombre de usuario ya está en uso'}), 409

    new_user = User(username=username, password_hash=generate_password_hash(password))

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

    user = User.query.filter_by(username=username).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'message': 'Credenciales inválidas'}), 401

    token = generate_auth_token(user.id)

    return jsonify({'token': token}), 200
