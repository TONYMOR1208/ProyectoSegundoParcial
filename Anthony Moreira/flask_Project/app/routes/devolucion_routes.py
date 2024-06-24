from functools import wraps
from flask import Blueprint, jsonify, request, abort
from app.controllers.devolucion_controller import get_all_devoluciones, get_devolucion_by_id, create_devolucion, update_devolucion, delete_devolucion
from app.tokens import verify_auth_token

devolucion_bp = Blueprint('devolucion_bp', __name__, url_prefix='/devoluciones')

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

@devolucion_bp.route('/', methods=['GET'])
@token_required
def get_devoluciones(current_user_id):
    return jsonify(get_all_devoluciones())

@devolucion_bp.route('/<int:id>', methods=['GET'])
@token_required
def get_devolucion(current_user_id, id):
    devolucion = get_devolucion_by_id(id)
    if not devolucion:
        abort(404)
    return jsonify(devolucion)

@devolucion_bp.route('/', methods=['POST'])
@token_required
def create_devolucion_route(current_user_id):
    data = request.get_json()
    return jsonify(create_devolucion(data)), 201

@devolucion_bp.route('/<int:id>', methods=['PUT'])
@token_required
def update_devolucion_route(current_user_id, id):
    data = request.get_json()
    devolucion = update_devolucion(id, data)
    if not devolucion:
        abort(404)
    return jsonify(devolucion)

@devolucion_bp.route('/<int:id>', methods=['DELETE'])
@token_required
def delete_devolucion_route(current_user_id, id):
    if not delete_devolucion(id):
        abort(404)
    return '', 204
