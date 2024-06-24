from datetime import datetime
from app.models import Reserva
from app import db

def get_all_reservas():
    return [reserva.serialize() for reserva in Reserva.query.all()]

def get_reserva_by_id(id):
    reserva = Reserva.query.get(id)
    return reserva.serialize() if reserva else None

def create_reserva(data):
    # Validar datos ingresados
    if 'libro_id' not in data or 'usuario_id' not in data or 'fecha_reserva' not in data or 'fecha_expiracion' not in data:
        raise ValueError('Los campos libro_id, usuario_id, fecha_reserva y fecha_expiracion son obligatorios.')

    try:
        libro_id = int(data['libro_id'])
    except ValueError:
        raise ValueError('El ID de libro debe ser un número entero.')

    try:
        usuario_id = int(data['usuario_id'])
    except ValueError:
        raise ValueError('El ID de usuario debe ser un número entero.')

    try:
        fecha_reserva = datetime.strptime(data['fecha_reserva'], '%Y-%m-%d').date()
    except ValueError:
        raise ValueError('La fecha de reserva debe tener el formato YYYY-MM-DD.')

    try:
        fecha_expiracion = datetime.strptime(data['fecha_expiracion'], '%Y-%m-%d').date()
    except ValueError:
        raise ValueError('La fecha de expiración debe tener el formato YYYY-MM-DD.')

    nueva_reserva = Reserva(
        libro_id=libro_id,
        usuario_id=usuario_id,
        fecha_reserva=fecha_reserva,
        fecha_expiracion=fecha_expiracion
    )
    
    db.session.add(nueva_reserva)
    db.session.commit()
    return nueva_reserva.serialize()

def update_reserva(id, data):
    reserva = Reserva.query.get(id)
    if not reserva:
        return None
    
    # Validar datos ingresados
    if 'libro_id' in data:
        try:
            reserva.libro_id = int(data['libro_id'])
        except ValueError:
            raise ValueError('El ID de libro debe ser un número entero.')

    if 'usuario_id' in data:
        try:
            reserva.usuario_id = int(data['usuario_id'])
        except ValueError:
            raise ValueError('El ID de usuario debe ser un número entero.')

    if 'fecha_reserva' in data:
        try:
            reserva.fecha_reserva = datetime.strptime(data['fecha_reserva'], '%Y-%m-%d').date()
        except ValueError:
            raise ValueError('La fecha de reserva debe tener el formato YYYY-MM-DD.')

    if 'fecha_expiracion' in data:
        try:
            reserva.fecha_expiracion = datetime.strptime(data['fecha_expiracion'], '%Y-%m-%d').date()
        except ValueError:
            raise ValueError('La fecha de expiración debe tener el formato YYYY-MM-DD.')

    db.session.commit()
    return reserva.serialize()

def delete_reserva(id):
    reserva = Reserva.query.get(id)
    if reserva:
        db.session.delete(reserva)
        db.session.commit()
        return True
    return False
