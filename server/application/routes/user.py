from flask import Blueprint, jsonify
from application.database.models import User
from auth_middleware import token_required

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

# @user_bp.route('/<user_id>', methods=['GET'])
# def get_user(user_id):
#     user = User.query.filter_by(user_id=user_id).first()
#     return jsonify(id=user.user_id, username=user.username, address=user.address, email=user.email, password=user.password)

##this is /user/email
@user_bp.route('/<email>', methods=['GET'])
@token_required
def get_user(email):
    user = User.query.filter_by(email=email).first()
    return jsonify(user_id=user.user_id, username=user.username, address=user.address, email=user.email, password=user.password)
