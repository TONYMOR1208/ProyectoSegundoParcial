from flask import Blueprint, jsonify, request, abort
from app.controllers.reserva_controller import get_all_reservas, get_reserva_by_id, create_reserva, update_reserva, delete_reserva

reserva_bp = Blueprint('reserva_bp', __name__, url_prefix='/reservas')

@reserva_bp.route('/', methods=['GET'])
def get_reservas():
    return jsonify(get_all_reservas())

@reserva_bp.route('/<int:id>', methods=['GET'])
def get_reserva(id):
    reserva = get_reserva_by_id(id)
    if not reserva:
        abort(404)
    return jsonify(reserva)

@reserva_bp.route('/', methods=['POST'])
def create_reserva_route():
    data = request.get_json()
    return jsonify(create_reserva(data)), 201

@reserva_bp.route('/<int:id>', methods=['PUT'])
def update_reserva_route(id):
    data = request.get_json()
    reserva = update_reserva(id, data)
    if not reserva:
        abort(404)
    return jsonify(reserva)

@reserva_bp.route('/<int:id>', methods=['DELETE'])
def delete_reserva_route(id):
    if not delete_reserva(id):
        abort(404)
    return '', 204
