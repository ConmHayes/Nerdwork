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

@community_bp.route("/", methods=['GET', 'POST'])
def get_all():
    if request.method == 'GET':
        communities = Community.query.all()
        community_list = []
        for community in communities:
            community_list.append(format_community(community))
        return {"Communities": community_list}
    
    if request.method == "POST":
        data = request.get_json()
        if data:
            community_name, description = data["community_name"], data["description"]

            if community_name and description:
                try:
                    community_to_add = Community(
                        community_name = community_name,
                        description=description
                    )
                    db.session.add(community_to_add)
                    db.session.commit()
                    return jsonify(message='Item Successfully Added To Database'), 201
                except Exception as e:
                        return jsonify(message='An error occurred during posting an item', error=str(e)), 400
            else:
                return jsonify(message='Posting item failed, possibly missing mandatory arguments'), 400
        else:
            return jsonify(message='No data passed in'), 400
        
@community_bp.route("/", methods=['GET', 'POST'])

            

    
# ? USER STORY > User selects a single community

# @community_bp.route("/<community_id>", methods=['GET'])
