# Imports

from flask import Blueprint, request, jsonify
from application.database.models import Community, db

# Blueprint 

community_bp = Blueprint("item_bp", __name__, url_prefix='/community') 

