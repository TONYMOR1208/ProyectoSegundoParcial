from itsdangerous import URLSafeSerializer, BadSignature
from flask import current_app

def generate_auth_token(user_id):
    s = URLSafeSerializer(current_app.config['SECRET_KEY'])
    return s.dumps({'id': user_id})

def verify_auth_token(token):
    s = URLSafeSerializer(current_app.config['SECRET_KEY'])
    try:
        data = s.loads(token)
        return data['id']
    except BadSignature:
        return None  # Token inválido
