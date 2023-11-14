from flask import Flask, Blueprint, session, make_response, request, current_app
import jwt
from flask import request, jsonify
from datetime import datetime, timedelta
from  werkzeug.security import generate_password_hash, check_password_hash
import application.database.models as models

from application.database.models import db
from auth_middleware import token_required


auth_bp = Blueprint('auth_bp', __name__, url_prefix='/auth')

def validate_email_password(email, password):
    #not sure yet how
    return True


@auth_bp.route('/')
def home(): 
    if not session.get('logged_in'):
        return "Not logged in according to python auth.py"
    else:
        return 'Logged in'
    
@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    data = request.get_json()
    if request.method == 'POST':
        # gets name, email and password from request
        name, email = data['name'], data['email']
        password = data['password']

        #check if user exists -- will need to figure out how
        user = models.User.query.filter_by(email=email).first()

        if not user:
            user = models.User(
                name= name,
                email= email,
                password= generate_password_hash(password)
            )
        # add to db
        db.session.add(user)
        db.session.commit()
        return jsonify(message='Registered'), 201
    else:
        return jsonify(message='already existing user'), 202
        

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify(message='user details not reached the function'), 400
        
        ## validate user:
        is_valid = validate_email_password(data.get('email'), data.get('password'))
        if is_valid:
            session['logged_in'] = True
            try:
                token = jwt.encode({
                'user': data.get('email'), 
                'expiration': str(datetime.utcnow() + timedelta(seconds=14400)) #4 hours 
                }, 
                current_app.config['SECRET_KEY'])
                return jsonify({'token': token.decode('utf-8')})
            except jwt.ExpiredSignatureError:
                return jsonify(error='Token has expired', message=str(e)), 401
            except jwt.InvalidTokenError:
                return jsonify(error='Invalid token', message=str(e)), 401
            except Exception as e:
                return jsonify(error='Something went wrong with tokens', message=str(e)), 500
        else:
            return jsonify(message='User not found, not authorized'), 405
    except Exception as e:
        return jsonify(message='login function failed', error=str(e)), 500

