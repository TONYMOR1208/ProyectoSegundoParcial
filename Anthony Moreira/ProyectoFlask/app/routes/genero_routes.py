from flask import Blueprint, request, jsonify
from app.models import Genero
from app import db

genero_bp = Blueprint('genero', __name__)

@genero_bp.route('/generos', methods=['GET'])
def get_generos():
    generos = Genero.query.all()
    return jsonify([genero.serialize() for genero in generos])

@genero_bp.route('/generos/<int:id>', methods=['GET'])
def get_genero(id):
    genero = Genero.query.get(id)
    if genero is None:
        return jsonify({'error': 'Género no encontrado'}), 404
    return jsonify(genero.serialize())

@genero_bp.route('/generos', methods=['POST'])
def create_genero():
    data = request.get_json()
    nuevo_genero = Genero(nombre=data['nombre'])
    db.session.add(nuevo_genero)
    db.session.commit()
    return jsonify(nuevo_genero.serialize()), 201

@genero_bp.route('/generos/<int:id>', methods=['PUT'])
def update_genero(id):
    data = request.get_json()
    genero = Genero.query.get(id)
    if genero is None:
        return jsonify({'error': 'Género no encontrado'}), 404
    genero.nombre = data.get('nombre', genero.nombre)
    db.session.commit()
    return jsonify(genero.serialize())

@genero_bp.route('/generos/<int:id>', methods=['DELETE'])
def delete_genero(id):
    genero = Genero.query.get(id)
    if genero is None:
        return jsonify({'error': 'Género no encontrado'}), 404
    db.session.delete(genero)
    db.session.commit()
    return jsonify({'message': 'Género eliminado correctamente'})
