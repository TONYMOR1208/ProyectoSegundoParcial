from . import db

class Autor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))
    bibliografia = db.Column(db.Text)

    def serialize(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'bibliografia': self.bibliografia
        }

class Libro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100))
    autor_id = db.Column(db.Integer, db.ForeignKey('autor.id'))
    genero_id = db.Column(db.Integer, db.ForeignKey('genero.id'))
    editorial = db.Column(db.String(50))
    año_publicacion = db.Column(db.Integer)
    num_ejemplares = db.Column(db.Integer)

    autor = db.relationship('Autor', backref='libros')
    genero = db.relationship('Genero', backref='libros')

    def serialize(self):
        return {
            'id': self.id,
            'titulo': self.titulo,
            'autor_id': self.autor_id,
            'genero_id': self.genero_id,
            'editorial': self.editorial,
            'año_publicacion': self.año_publicacion,
            'num_ejemplares': self.num_ejemplares
        }

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))
    direccion = db.Column(db.String(50))
    telefono = db.Column(db.String(10))
    correo = db.Column(db.String(50))
    fecha_registro = db.Column(db.Date)

    def serialize(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'direccion': self.direccion,
            'telefono': self.telefono,
            'correo': self.correo,
            'fecha_registro': self.fecha_registro
        }

class Prestamo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    libro_id = db.Column(db.Integer, db.ForeignKey('libro.id'))
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    fecha_prestamo = db.Column(db.Date)
    fecha_vencimiento = db.Column(db.Date)
    devuelto = db.Column(db.Boolean)

    libro = db.relationship('Libro', backref='prestamos')
    usuario = db.relationship('Usuario', backref='prestamos')

    def serialize(self):
        return {
            'id': self.id,
            'libro_id': self.libro_id,
            'usuario_id': self.usuario_id,
            'fecha_prestamo': self.fecha_prestamo,
            'fecha_vencimiento': self.fecha_vencimiento,
            'devuelto': self.devuelto
        }

class Devolucion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    prestamo_id = db.Column(db.Integer, db.ForeignKey('prestamo.id'))
    fecha_devolucion = db.Column(db.Date)
    estado_libro = db.Column(db.String(50))

    prestamo = db.relationship('Prestamo', backref='devolucion')

    def serialize(self):
        return {
            'id': self.id,
            'prestamo_id': self.prestamo_id,
            'fecha_devolucion': self.fecha_devolucion,
            'estado_libro': self.estado_libro
        }

class Genero(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))

    def serialize(self):
        return {
            'id': self.id,
            'nombre': self.nombre
        }

class Resena(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    libro_id = db.Column(db.Integer, db.ForeignKey('libro.id'))
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    calificacion = db.Column(db.Integer)
    comentario = db.Column(db.Text)

    libro = db.relationship('Libro', backref='resenas')
    usuario = db.relationship('Usuario', backref='resenas')

    def serialize(self):
        return {
            'id': self.id,
            'libro_id': self.libro_id,
            'usuario_id': self.usuario_id,
            'calificacion': self.calificacion,
            'comentario': self.comentario
        }

class Reserva(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    libro_id = db.Column(db.Integer, db.ForeignKey('libro.id'))
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    fecha_reserva = db.Column(db.Date)
    fecha_expiracion = db.Column(db.Date)

    libro = db.relationship('Libro', backref='reservas')
    usuario = db.relationship('Usuario', backref='reservas')

    def serialize(self):
        return {
            'id': self.id,
            'libro_id': self.libro_id,
            'usuario_id': self.usuario_id,
            'fecha_reserva': self.fecha_reserva,
            'fecha_expiracion': self.fecha_expiracion
        }

class Sancion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    fecha_inicio = db.Column(db.Date)
    fecha_fin = db.Column(db.Date)
    descripcion = db.Column(db.Text)

    usuario = db.relationship('Usuario', backref='sanciones')

    def serialize(self):
        return {
            'id': self.id,
            'usuario_id': self.usuario_id,
            'fecha_inicio': self.fecha_inicio,
            'fecha_fin': self.fecha_fin,
            'descripcion': self.descripcion
        }


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), index=True, unique=True)
    password_hash = db.Column(db.String(100)) 

    def __repr__(self):
        return f'<User {self.username}>'