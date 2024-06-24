from functools import wraps
from flask import Blueprint, jsonify, request, abort
from app.controllers.prestamo_controller import get_all_prestamos, get_prestamo_by_id, create_prestamo, update_prestamo, delete_prestamo
from app.tokens import verify_auth_token

prestamo_bp = Blueprint('prestamo_bp', __name__, url_prefix='/prestamos')

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

@prestamo_bp.route('/', methods=['GET'])
@token_required
def get_prestamos(current_user_id):
    return jsonify(get_all_prestamos())

@prestamo_bp.route('/<int:id>', methods=['GET'])
@token_required
def get_prestamo(current_user_id, id):
    prestamo = get_prestamo_by_id(id)
    if not prestamo:
        abort(404)
    return jsonify(prestamo)

@prestamo_bp.route('/', methods=['POST'])
@token_required
def create_prestamo_route(current_user_id):
    data = request.get_json()
    return jsonify(create_prestamo(data)), 201

@prestamo_bp.route('/<int:id>', methods=['PUT'])
@token_required
def update_prestamo_route(current_user_id, id):
    data = request.get_json()
    prestamo = update_prestamo(id, data)
    if not prestamo:
        abort(404)
    return jsonify(prestamo)

@prestamo_bp.route('/<int:id>', methods=['DELETE'])
@token_required
def delete_prestamo_route(current_user_id, id):
    if not delete_prestamo(id):
        abort(404)
    return '', 204
