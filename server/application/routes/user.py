from flask import Blueprint, jsonify
from application.database.models import User

user_bp = Blueprint('user', __name__, url_prefix='/user')

def format_user(user):
    return {
        'user_id': user.user_id,
        'username': user.username,
        'address': user.address,
        'email': user.email,
        'password': user.password,
    }

@user_bp.route('/', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = []
    for user in users:
        user_list.append(format_user(user))
    return{'User': user_list}

@user_bp.route('/<id>', methods=['GET'])
def get_user(id):
    user = User.query.filter_by(id=id).first()
    return jsonify(id=user.user_id, username=user.username, address=user.address, email=user.email, password=user.password)
