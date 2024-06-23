
from app.models import Devolucion
from app import db

def get_all_devoluciones():
    return [devolucion.serialize() for devolucion in Devolucion.query.all()]

def get_devolucion_by_id(id):
    devolucion = Devolucion.query.get(id)
    return devolucion.serialize() if devolucion else None

def create_devolucion(data):
    nueva_devolucion = Devolucion(
        prestamo_id=data['prestamo_id'],
        fecha_devolucion=data['fecha_devolucion'],
        estado_libro=data['estado_libro']
    )
    db.session.add(nueva_devolucion)
    db.session.commit()
    return nueva_devolucion.serialize()

def update_devolucion(id, data):
    devolucion = Devolucion.query.get(id)
    if devolucion:
        devolucion.prestamo_id = data['prestamo_id']
        devolucion.fecha_devolucion = data['fecha_devolucion']
        devolucion.estado_libro = data['estado_libro']
        db.session.commit()
        return devolucion.serialize()
    return None

def delete_devolucion(id):
    devolucion = Devolucion.query.get(id)
    if devolucion:
        db.session.delete(devolucion)
        db.session.commit()
        return True
    return False
