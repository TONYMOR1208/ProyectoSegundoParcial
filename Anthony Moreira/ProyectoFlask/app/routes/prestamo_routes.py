from flask import Blueprint, request, jsonify
from app.models import Prestamo
from app import db

prestamo_bp = Blueprint('prestamo', __name__)

@prestamo_bp.route('/prestamos', methods=['GET'])
def get_prestamos():
    prestamos = Prestamo.query.all()
    return jsonify([prestamo.serialize() for prestamo in prestamos])

@prestamo_bp.route('/prestamos/<int:id>', methods=['GET'])
def get_prestamo(id):
    prestamo = Prestamo.query.get(id)
    if prestamo is None:
        return jsonify({'error': 'Préstamo no encontrado'}), 404
    return jsonify(prestamo.serialize())

@prestamo_bp.route('/prestamos', methods=['POST'])
def create_prestamo():
    data = request.get_json()
    nuevo_prestamo = Prestamo(
        libro_id=data['libro_id'],
        usuario_id=data['usuario_id'],
        fecha_prestamo=data['fecha_prestamo'],
        fecha_vencimiento=data['fecha_vencimiento']
    )
    db.session.add(nuevo_prestamo)
    db.session.commit()
    return jsonify(nuevo_prestamo.serialize()), 201

@prestamo_bp.route('/prestamos/<int:id>', methods=['PUT'])
def update_prestamo(id):
    data = request.get_json()
    prestamo = Prestamo.query.get(id)
    if prestamo is None:
        return jsonify({'error': 'Préstamo no encontrado'}), 404
    prestamo.libro_id = data.get('libro_id', prestamo.libro_id)
    prestamo.usuario_id = data.get('usuario_id', prestamo.usuario_id)
    prestamo.fecha_prestamo = data.get('fecha_prestamo', prestamo.fecha_prestamo)
    prestamo.fecha_vencimiento = data.get('fecha_vencimiento', prestamo.fecha_vencimiento)
    db.session.commit()
    return jsonify(prestamo.serialize())

@prestamo_bp.route('/prestamos/<int:id>', methods=['DELETE'])
def delete_prestamo(id):
    prestamo = Prestamo.query.get(id)
    if prestamo is None:
        return jsonify({'error': 'Préstamo no encontrado'}), 404
    db.session.delete(prestamo)
    db.session.commit()
    return jsonify({'message': 'Préstamo eliminado correctamente'})
