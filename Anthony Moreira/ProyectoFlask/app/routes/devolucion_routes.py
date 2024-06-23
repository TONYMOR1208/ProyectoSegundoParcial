from flask import Blueprint, request, jsonify
from app.models import Devolucion
from app import db

devolucion_bp = Blueprint('devolucion', __name__)

@devolucion_bp.route('/devoluciones', methods=['GET'])
def get_devoluciones():
    devoluciones = Devolucion.query.all()
    return jsonify([devolucion.serialize() for devolucion in devoluciones])

@devolucion_bp.route('/devoluciones/<int:id>', methods=['GET'])
def get_devolucion(id):
    devolucion = Devolucion.query.get(id)
    if devolucion is None:
        return jsonify({'error': 'Devolución no encontrada'}), 404
    return jsonify(devolucion.serialize())

@devolucion_bp.route('/devoluciones', methods=['POST'])
def create_devolucion():
    data = request.get_json()
    nueva_devolucion = Devolucion(
        prestamo_id=data['prestamo_id'],
        fecha_devolucion=data['fecha_devolucion']
    )
    db.session.add(nueva_devolucion)
    db.session.commit()
    return jsonify(nueva_devolucion.serialize()), 201

@devolucion_bp.route('/devoluciones/<int:id>', methods=['PUT'])
def update_devolucion(id):
    data = request.get_json()
    devolucion = Devolucion.query.get(id)
    if devolucion is None:
        return jsonify({'error': 'Devolución no encontrada'}), 404
    devolucion.prestamo_id = data.get('prestamo_id', devolucion.prestamo_id)
    devolucion.fecha_devolucion = data.get('fecha_devolucion', devolucion.fecha_devolucion)
    db.session.commit()
    return jsonify(devolucion.serialize())

@devolucion_bp.route('/devoluciones/<int:id>', methods=['DELETE'])
def delete_devolucion(id):
    devolucion = Devolucion.query.get(id)
    if devolucion is None:
        return jsonify({'error': 'Devolución no encontrada'}), 404
    db.session.delete(devolucion)
    db.session.commit()
    return jsonify({'message': 'Devolución eliminada correctamente'})
