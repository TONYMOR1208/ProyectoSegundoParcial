from flask import Blueprint, request, jsonify
from app.models import Editorial
from app import db

editorial_bp = Blueprint('editorial', __name__)

@editorial_bp.route('/editoriales', methods=['GET'])
def get_editoriales():
    editoriales = Editorial.query.all()
    return jsonify([editorial.serialize() for editorial in editoriales])

@editorial_bp.route('/editoriales/<int:id>', methods=['GET'])
def get_editorial(id):
    editorial = Editorial.query.get(id)
    if editorial is None:
        return jsonify({'error': 'Editorial no encontrada'}), 404
    return jsonify(editorial.serialize())

@editorial_bp.route('/editoriales', methods=['POST'])
def create_editorial():
    data = request.get_json()
    nueva_editorial = Editorial(nombre=data['nombre'])
    db.session.add(nueva_editorial)
    db.session.commit()
    return jsonify(nueva_editorial.serialize()), 201

@editorial_bp.route('/editoriales/<int:id>', methods=['PUT'])
def update_editorial(id):
    data = request.get_json()
    editorial = Editorial.query.get(id)
    if editorial is None:
        return jsonify({'error': 'Editorial no encontrada'}), 404
    editorial.nombre = data.get('nombre', editorial.nombre)
    db.session.commit()
    return jsonify(editorial.serialize())

@editorial_bp.route('/editoriales/<int:id>', methods=['DELETE'])
def delete_editorial(id):
    editorial = Editorial.query.get(id)
    if editorial is None:
        return jsonify({'error': 'Editorial no encontrada'}), 404
    db.session.delete(editorial)
    db.session.commit()
    return jsonify({'message': 'Editorial eliminada correctamente'})
