from functools import wraps
from flask import Blueprint, jsonify, request, abort
from app.controllers.reserva_controller import get_all_reservas, get_reserva_by_id, create_reserva, update_reserva, delete_reserva
from app.tokens import verify_auth_token

reserva_bp = Blueprint('reserva_bp', __name__, url_prefix='/reservas')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]

        if not token:
            return jsonify({'message': 'Token es requerido'}), 401

        try:
            current_user_id = verify_auth_token(token)
            if current_user_id is None:
                return jsonify({'message': 'Token inválido'}), 401
        except:
            return jsonify({'message': 'Token inválido'}), 401

        return f(current_user_id, *args, **kwargs)
    return decorated

@reserva_bp.route('/', methods=['GET'])
@token_required
def get_reservas(current_user_id):
    return jsonify(get_all_reservas())

@reserva_bp.route('/<int:id>', methods=['GET'])
@token_required
def get_reserva(current_user_id, id):
    reserva = get_reserva_by_id(id)
    if not reserva:
        abort(404)
    return jsonify(reserva)

@reserva_bp.route('/', methods=['POST'])
@token_required
def create_reserva_route(current_user_id):
    data = request.get_json()
    return jsonify(create_reserva(data)), 201

@reserva_bp.route('/<int:id>', methods=['PUT'])
@token_required
def update_reserva_route(current_user_id, id):
    data = request.get_json()
    reserva = update_reserva(id, data)
    if not reserva:
        abort(404)
    return jsonify(reserva)

@reserva_bp.route('/<int:id>', methods=['DELETE'])
@token_required
def delete_reserva_route(current_user_id, id):
    if not delete_reserva(id):
        abort(404)
    return '', 204
