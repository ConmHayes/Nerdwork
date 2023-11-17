from flask import Blueprint, request, jsonify
from application.database.models import Post, db

# Blueprint 
post_bp = Blueprint("post_bp", __name__, url_prefix='/post') 

# Format Item Functions

def format_post(post): 
    return {
        "post_id": post.post_id,
        "user_id": post.user_id,
        "thread_id": post.thread_id,
        "post_title": post.post_title,
        "body": post.body,
        "votes": post.votes
    }

# ? USER STORY > User clicks on the post tab and can view all the communities

@post_bp.route("/", methods=['GET', 'POST'])
def get_all():
    if request.method == 'GET':
        posts = Post.query.all()
        post_list = []
        for post in posts:
            post_list.append(format_post(post))
        return {"Posts": post_list}
    
    if request.method == "POST":
        data = request.get_json()
        if data:
            user_id, thread_id, post_title, body, votes = data["user_id"], data["thread_id"], data["post_title"], data["body"], data["votes"]

            if user_id and thread_id and post_title and body:
                try:
                    post_to_add = Post(
                        user_id = user_id,
                        thread_id = thread_id,
                        post_title = post_title,
                        body = body,
                        votes = votes
                    )
                    db.session.add(post_to_add)
                    db.session.commit()
                    return jsonify(message='Item Successfully Added To Database'), 201
                except Exception as e:
                        return jsonify(message='An error occurred during posting an item', error=str(e)), 400
            else:
                return jsonify(message='Posting item failed, possibly missing mandatory arguments'), 400
        else:
            return jsonify(message='No data passed in'), 400

# @post_bp.route("/<post_id>", methods=['PATCH'])
# def update_post_by_id(id):
