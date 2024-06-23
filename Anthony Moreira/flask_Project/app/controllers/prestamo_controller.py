from app.models import Prestamo
from app import db

def get_all_prestamos():
    return [prestamo.serialize() for prestamo in Prestamo.query.all()]

def get_prestamo_by_id(id):
    prestamo = Prestamo.query.get(id)
    return prestamo.serialize() if prestamo else None

def create_prestamo(data):
    nuevo_prestamo = Prestamo(
        libro_id=data['libro_id'],
        usuario_id=data['usuario_id'],
        fecha_prestamo=data['fecha_prestamo'],
        fecha_vencimiento=data['fecha_vencimiento'],
        devuelto=data.get('devuelto', False)
    )
    db.session.add(nuevo_prestamo)
    db.session.commit()
    return nuevo_prestamo.serialize()

def update_prestamo(id, data):
    prestamo = Prestamo.query.get(id)
    if prestamo:
        prestamo.libro_id = data['libro_id']
        prestamo.usuario_id = data['usuario_id']
        prestamo.fecha_prestamo = data['fecha_prestamo']
        prestamo.fecha_vencimiento = data['fecha_vencimiento']
        prestamo.devuelto = data.get('devuelto', prestamo.devuelto)
        db.session.commit()
        return prestamo.serialize()
    return None

def delete_prestamo(id):
    prestamo = Prestamo.query.get(id)
    if prestamo:
        db.session.delete(prestamo)
        db.session.commit()
        return True
    return False
