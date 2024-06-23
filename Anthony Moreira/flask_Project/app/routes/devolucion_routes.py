from flask import Blueprint, jsonify, request, abort
from app.controllers.devolucion_controller import get_all_devoluciones, get_devolucion_by_id, create_devolucion, update_devolucion, delete_devolucion

devolucion_bp = Blueprint('devolucion_bp', __name__, url_prefix='/devoluciones')

@devolucion_bp.route('/', methods=['GET'])
def get_devoluciones():
    return jsonify(get_all_devoluciones())

@devolucion_bp.route('/<int:id>', methods=['GET'])
def get_devolucion(id):
    devolucion = get_devolucion_by_id(id)
    if not devolucion:
        abort(404)
    return jsonify(devolucion)

@devolucion_bp.route('/', methods=['POST'])
def create_devolucion_route():
    data = request.get_json()
    return jsonify(create_devolucion(data)), 201

@devolucion_bp.route('/<int:id>', methods=['PUT'])
def update_devolucion_route(id):
    data = request.get_json()
    devolucion = update_devolucion(id, data)
    if not devolucion:
        abort(404)
    return jsonify(devolucion)

@devolucion_bp.route('/<int:id>', methods=['DELETE'])
def delete_devolucion_route(id):
    if not delete_devolucion(id):
        abort(404)
    return '', 204
