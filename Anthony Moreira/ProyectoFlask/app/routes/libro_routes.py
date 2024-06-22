from flask import Blueprint, request, jsonify
from app.models import Libro
from app import db

libro_bp = Blueprint('libro', __name__)

@libro_bp.route('/libros', methods=['GET'])
def get_libros():
    libros = Libro.query.all()
    return jsonify([libro.serialize() for libro in libros])

@libro_bp.route('/libros/<int:id>', methods=['GET'])
def get_libro(id):
    libro = Libro.query.get(id)
    if libro is None:
        return jsonify({'error': 'Libro no encontrado'}), 404
    return jsonify(libro.serialize())

@libro_bp.route('/libros', methods=['POST'])
def create_libro():
    data = request.get_json()
    nuevo_libro = Libro(
        titulo=data['titulo'],
        autor=data['autor'],
        genero=data['genero'],
        año_publicacion=data['año_publicacion'],
        numero_ejemplares=data['numero_ejemplares']
    )
    db.session.add(nuevo_libro)
    db.session.commit()
    return jsonify(nuevo_libro.serialize()), 201

@libro_bp.route('/libros/<int:id>', methods=['PUT'])
def update_libro(id):
    data = request.get_json()
    libro = Libro.query.get(id)
    if libro is None:
        return jsonify({'error': 'Libro no encontrado'}), 404
    libro.titulo = data.get('titulo', libro.titulo)
    libro.autor = data.get('autor', libro.autor)
    libro.genero = data.get('genero', libro.genero)
    libro.año_publicacion = data.get('año_publicacion', libro.año_publicacion)
    libro.numero_ejemplares = data.get('numero_ejemplares', libro.numero_ejemplares)
    db.session.commit()
    return jsonify(libro.serialize())

@libro_bp.route('/libros/<int:id>', methods=['DELETE'])
def delete_libro(id):
    libro = Libro.query.get(id)
    if libro is None:
        return jsonify({'error': 'Libro no encontrado'}), 404
    db.session.delete(libro)
    db.session.commit()
    return jsonify({'message': 'Libro eliminado correctamente'})
