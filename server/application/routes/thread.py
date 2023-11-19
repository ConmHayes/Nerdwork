# Imports
from flask import Blueprint, request, jsonify
from application import db
from application.models import Thread

# Blueprint 

thread_bp = Blueprint("thread_bp", __name__, url_prefix='/thread')

# Formatting function

def format_thread(thread): 
    return {
        "thread_id": thread.thread_id,
        "community_id": thread.community_id,
        "title": thread.title,
        "description": thread.description,
        "user_id": thread.user_id
    }

# ? User Story: Selects community tab > Displays all communities > Selects a single community > Displays all threads > Selects a single thread 

@thread_bp.route("/<thread_id>", methods=['GET'])
def thread_id(thread_id):

    # ? Retrieve one row 

    thread = Thread.query.filter_by(thread_id=thread_id).first()

    # ? Return data for the specified id

    return jsonify(
        thread_id=thread.thread_id,
        community_id=thread.community_id, 
        title=thread.title,
        description=thread.description,
        user_id=thread.user_id
    )

# ? User Story: Selects community tab > Displays all communities > Selects a single community > Displays all threads > Create a custom thread

@thread_bp.route("/", methods=['POST'])
def create_thread():
    
    # ? Obtain the data sent by the user 
    data = request.get_json()

    # ? Check if data is present from retrieval
    if data:

        # ? Deconstruct data
        community_id, title, description, user_id = data["community_id"], data["title"], data["description"], data["user_id"]

        if community_id and title and user_id:
            try:
                thread_to_add = Thread(
                    community_id=community_id,
                    title=title,
                    description=description,
                    user_id=user_id
                )
                db.session.add(thread_to_add)
                db.session.commit()
                return jsonify(message='Item Successfully Added To Database'), 201
            except Exception as e:
                return jsonify(message='An error occurred during posting an item', error=str(e)), 400
        else:
            return jsonify(message='Posting item failed, possibly missing mandatory arguments'), 400
    else:
        return jsonify(message='No data passed in'), 400
            


