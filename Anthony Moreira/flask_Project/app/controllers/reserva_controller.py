from app.models import Reserva
from app import db

def get_all_reservas():
    return [reserva.serialize() for reserva in Reserva.query.all()]

def get_reserva_by_id(id):
    reserva = Reserva.query.get(id)
    return reserva.serialize() if reserva else None

def create_reserva(data):
    nueva_reserva = Reserva(
        libro_id=data['libro_id'],
        usuario_id=data['usuario_id'],
        fecha_reserva=data['fecha_reserva'],
        fecha_expiracion=data['fecha_expiracion']
    )
    db.session.add(nueva_reserva)
    db.session.commit()
    return nueva_reserva.serialize()

def update_reserva(id, data):
    reserva = Reserva.query.get(id)
    if reserva:
        reserva.libro_id = data['libro_id']
        reserva.usuario_id = data['usuario_id']
        reserva.fecha_reserva = data['fecha_reserva']
        reserva.fecha_expiracion = data['fecha_expiracion']
        db.session.commit()
        return reserva.serialize()
    return None

def delete_reserva(id):
    reserva = Reserva.query.get(id)
    if reserva:
        db.session.delete(reserva)
        db.session.commit()
        return True
    return False
