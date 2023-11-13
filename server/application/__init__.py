# Imports
import os
from dotenv import load_dotenv
import os

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# Loading dotenv
load_dotenv()

# Creating the flask app 

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DB_URL")

# Create DB instance
db = SQLAlchemy(app)

# from application import routes