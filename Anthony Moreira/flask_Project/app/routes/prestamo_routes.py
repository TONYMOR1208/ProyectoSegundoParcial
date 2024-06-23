from flask import Blueprint, jsonify, request, abort
from app.controllers.prestamo_controller import get_all_prestamos, get_prestamo_by_id, create_prestamo, update_prestamo, delete_prestamo

prestamo_bp = Blueprint('prestamo_bp', __name__, url_prefix='/prestamos')

@prestamo_bp.route('/', methods=['GET'])
def get_prestamos():
    return jsonify(get_all_prestamos())

@prestamo_bp.route('/<int:id>', methods=['GET'])
def get_prestamo(id):
    prestamo = get_prestamo_by_id(id)
    if not prestamo:
        abort(404)
    return jsonify(prestamo)

@prestamo_bp.route('/', methods=['POST'])
def create_prestamo_route():
    data = request.get_json()
    return jsonify(create_prestamo(data)), 201

@prestamo_bp.route('/<int:id>', methods=['PUT'])
def update_prestamo_route(id):
    data = request.get_json()
    prestamo = update_prestamo(id, data)
    if not prestamo:
        abort(404)
    return jsonify(prestamo)

@prestamo_bp.route('/<int:id>', methods=['DELETE'])
def delete_prestamo_route(id):
    if not delete_prestamo(id):
        abort(404)
    return '', 204



