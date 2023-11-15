# Imports
import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from .database.models import db

#from routes import item
from application.routes import user


# Loading dotenv
load_dotenv()

# Creating the flask app 
app = Flask(__name__)
CORS(app)

db_url = os.environ.get("DB_URL")

if not db_url:
    raise ValueError("DB_URL env variable is not set")

app.config["SQLALCHEMY_DATABASE_URI"] = db_url

# Create DB instance
db.init_app(app)


#Register Blueprints
#app.register_blueprint(item)
app.register_blueprint(user.user_bp)