# Imports
import os
from dotenv import load_dotenv

from flask import Flask
from flask_cors import CORS
from .database.models import db

# from application import routes
from application.routes import auth

# Loading dotenv
load_dotenv()

# Creating the flask app 

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
db_url = os.environ.get("DB_URL")

if not db_url:
    raise ValueError("DB_URL env variable is not set")

app.config["SQLALCHEMY_DATABASE_URI"] = db_url

# Create DB instance
db.init_app(app)

#this is where the blueprints will live
## auth bp
app.register_blueprint(auth.auth_bp)