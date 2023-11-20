# Imports
import os

from flask import Flask
from flask_cors import CORS
from .database.models import db
from dotenv import load_dotenv
load_dotenv()

# from application import routes
from application.routes import auth, user, item, find_data


app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
app.config['GOOGLE_API_KEY'] = os.getenv("GOOGLE_API_KEY")

db_url = os.environ.get("DB_URL")

app.config["SQLALCHEMY_DATABASE_URI"] = db_url

# Create DB instance
db.init_app(app)

# from application import routes
app.register_blueprint(auth.auth_bp)
app.register_blueprint(user.user_bp)
app.register_blueprint(item.item_bp)
app.register_blueprint(find_data.google_bp)