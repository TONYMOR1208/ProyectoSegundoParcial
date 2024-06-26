from datetime import datetime
from app.models import Prestamo
from app import db

def get_all_prestamos():
    return [prestamo.serialize() for prestamo in Prestamo.query.all()]

def get_prestamo_by_id(id):
    prestamo = Prestamo.query.get(id)
    return prestamo.serialize() if prestamo else None

def create_prestamo(data):
    # Validar datos ingresados
    if 'libro_id' not in data or 'usuario_id' not in data or 'fecha_prestamo' not in data or 'fecha_vencimiento' not in data:
        raise ValueError('Los campos libro_id, usuario_id, fecha_prestamo y fecha_vencimiento son obligatorios.')

    try:
        libro_id = int(data['libro_id'])
    except ValueError:
        raise ValueError('El ID de libro debe ser un número entero.')

    try:
        usuario_id = int(data['usuario_id'])
    except ValueError:
        raise ValueError('El ID de usuario debe ser un número entero.')

    try:
        fecha_prestamo = datetime.strptime(data['fecha_prestamo'], '%Y-%m-%d').date()
    except ValueError:
        raise ValueError('La fecha de préstamo debe tener el formato YYYY-MM-DD.')

    try:
        fecha_vencimiento = datetime.strptime(data['fecha_vencimiento'], '%Y-%m-%d').date()
    except ValueError:
        raise ValueError('La fecha de vencimiento debe tener el formato YYYY-MM-DD.')

    devuelto = data.get('devuelto', False)

    nuevo_prestamo = Prestamo(
        libro_id=libro_id,
        usuario_id=usuario_id,
        fecha_prestamo=fecha_prestamo,
        fecha_vencimiento=fecha_vencimiento,
        devuelto=devuelto
    )
    
    db.session.add(nuevo_prestamo)
    db.session.commit()
    return nuevo_prestamo.serialize()

def update_prestamo(id, data):
    prestamo = Prestamo.query.get(id)
    if not prestamo:
        return None
    
    # Validar datos ingresados
    if 'libro_id' in data:
        try:
            prestamo.libro_id = int(data['libro_id'])
        except ValueError:
            raise ValueError('El ID de libro debe ser un número entero.')

    if 'usuario_id' in data:
        try:
            prestamo.usuario_id = int(data['usuario_id'])
        except ValueError:
            raise ValueError('El ID de usuario debe ser un número entero.')

    if 'fecha_prestamo' in data:
        try:
            prestamo.fecha_prestamo = datetime.strptime(data['fecha_prestamo'], '%Y-%m-%d').date()
        except ValueError:
            raise ValueError('La fecha de préstamo debe tener el formato YYYY-MM-DD.')

    if 'fecha_vencimiento' in data:
        try:
            prestamo.fecha_vencimiento = datetime.strptime(data['fecha_vencimiento'], '%Y-%m-%d').date()
        except ValueError:
            raise ValueError('La fecha de vencimiento debe tener el formato YYYY-MM-DD.')

    if 'devuelto' in data:
        prestamo.devuelto = data.get('devuelto', prestamo.devuelto)

    db.session.commit()
    return prestamo.serialize()

def delete_prestamo(id):
    prestamo = Prestamo.query.get(id)
    if prestamo:
        db.session.delete(prestamo)
        db.session.commit()
        return True
    return False
