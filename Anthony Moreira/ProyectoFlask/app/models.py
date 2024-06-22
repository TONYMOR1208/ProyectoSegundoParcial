
from . import db

class Libro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100))
    autor = db.Column(db.String(100))
    genero = db.Column(db.String(50))
    año_publicacion = db.Column(db.Integer)
    numero_ejemplares = db.Column(db.Integer)

    def serialize(self):
        return {
            'id': self.id,
            'titulo': self.titulo,
            'autor': self.autor,
            'genero': self.genero,
            'año_publicacion': self.año_publicacion,
            'numero_ejemplares': self.numero_ejemplares
        }

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    direccion = db.Column(db.String(200))
    telefono = db.Column(db.String(20))
    correo_electronico = db.Column(db.String(100))

    def serialize(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'direccion': self.direccion,
            'telefono': self.telefono,
            'correo_electronico': self.correo_electronico
        }
class Prestamo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    libro_id = db.Column(db.Integer, db.ForeignKey('libro.id'), nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    fecha_prestamo = db.Column(db.Date)
    fecha_vencimiento = db.Column(db.Date)

    libro = db.relationship('Libro', backref='prestamos')
    usuario = db.relationship('Usuario', backref='prestamos')

    def serialize(self):
        return {
            'id': self.id,
            'libro_id': self.libro_id,
            'usuario_id': self.usuario_id,
            'fecha_prestamo': self.fecha_prestamo,
            'fecha_vencimiento': self.fecha_vencimiento
        }

class Devolucion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    prestamo_id = db.Column(db.Integer, db.ForeignKey('prestamo.id'), nullable=False)
    fecha_devolucion = db.Column(db.Date)

    prestamo = db.relationship('Prestamo', backref='devolucion', uselist=False)

    def serialize(self):
        return {
            'id': self.id,
            'prestamo_id': self.prestamo_id,
            'fecha_devolucion': self.fecha_devolucion
        }

class Genero(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))

    def serialize(self):
        return {
            'id': self.id,
            'nombre': self.nombre
        }

class Editorial(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))

    def serialize(self):
        return {
            'id': self.id,
            'nombre': self.nombre
        }
