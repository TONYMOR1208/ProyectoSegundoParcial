from datetime import datetime
from app.models import Devolucion
from app import db

def get_all_devoluciones():
    return [devolucion.serialize() for devolucion in Devolucion.query.all()]

def get_devolucion_by_id(id):
    devolucion = Devolucion.query.get(id)
    return devolucion.serialize() if devolucion else None

def create_devolucion(data):
    # Validar datos ingresados
    if 'prestamo_id' not in data or 'fecha_devolucion' not in data or 'estado_libro' not in data:
        raise ValueError('Los campos prestamo_id, fecha_devolucion y estado_libro son obligatorios.')

    try:
        prestamo_id = int(data['prestamo_id'])
    except ValueError:
        raise ValueError('El ID de préstamo debe ser un número entero.')

    try:
        fecha_devolucion = datetime.strptime(data['fecha_devolucion'], '%Y-%m-%d').date()
    except ValueError:
        raise ValueError('La fecha de devolución debe tener el formato YYYY-MM-DD.')

    estado_libro = data['estado_libro']
    if len(estado_libro) > 50:
        raise ValueError('El estado del libro no debe exceder los 50 caracteres.')

    nueva_devolucion = Devolucion(
        prestamo_id=prestamo_id,
        fecha_devolucion=fecha_devolucion,
        estado_libro=estado_libro
    )
    
    db.session.add(nueva_devolucion)
    db.session.commit()
    return nueva_devolucion.serialize()

def update_devolucion(id, data):
    devolucion = Devolucion.query.get(id)
    if not devolucion:
        return None
    
    # Validar datos ingresados
    if 'prestamo_id' in data:
        try:
            devolucion.prestamo_id = int(data['prestamo_id'])
        except ValueError:
            raise ValueError('El ID de préstamo debe ser un número entero.')

    if 'fecha_devolucion' in data:
        try:
            devolucion.fecha_devolucion = datetime.strptime(data['fecha_devolucion'], '%Y-%m-%d').date()
        except ValueError:
            raise ValueError('La fecha de devolución debe tener el formato YYYY-MM-DD.')

    if 'estado_libro' in data:
        estado_libro = data['estado_libro']
        if len(estado_libro) > 50:
            raise ValueError('El estado del libro no debe exceder los 50 caracteres.')
        devolucion.estado_libro = estado_libro

    db.session.commit()
    return devolucion.serialize()

def delete_devolucion(id):
    devolucion = Devolucion.query.get(id)
    if devolucion:
        db.session.delete(devolucion)
        db.session.commit()
        return True
    return False
