# Imports

from flask import Blueprint, request, jsonify
from application.database.models import Community, db

# Blueprint 

community_bp = Blueprint("community_bp", __name__, url_prefix='/community') 

# Format Item Functions

def format_community(community): 
    return {
        "community_id": community.community_id,
        "name": community.name,
        "description": community.description
    }

# ? USER STORY > User clicks on the community tab and can view all the communities

@community_bp.route("/", methods=['GET'])
def get_all():
    if request.method == 'GET':
        data = request.json
        communities = Community.query.all()
        community_list = []
        for community in communities:
            community_list.append(format_community(community))
        return {"Communities": community_list}
    
# ? USER STORY > User selects a single community

# @community_bp.route("/<community_id>", methods=['GET'])
