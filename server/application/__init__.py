# Imports
import os

from flask import Flask
from flask_cors import CORS
from .database.models import db
from dotenv import load_dotenv
load_dotenv()

# from application import routes
from application.routes import auth

#from routes import item
from application.routes import user


app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
db_url = os.environ.get("DB_URL")

app.config["SQLALCHEMY_DATABASE_URI"] = db_url

# Create DB instance
db.init_app(app)

# from application import routes
app.register_blueprint(auth.auth_bp)
app.register_blueprint(user.user_bp)