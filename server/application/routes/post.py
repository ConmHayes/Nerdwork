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

# ? USER STORY > User selects community 

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

# ? USER STORY > User votes on a post 

@post_bp.route("/<post_id>", methods=['PATCH', 'DELETE'])
def post_by_id(post_id):
    
    if request.method == "PATCH":
        # ? Retrieving the post that we want to update
        post = Post.query.filter_by(post_id=post_id).first()
        
        # ? Check if the post exists
        if post:
            try:
                # ? Incrementing the posts value 
                post.votes += 1

                # ? Committing the changes to the database
                db.session.commit()

                # ? Return the updated post
                return jsonify(
                    post_id=post.post_id,
                    post_title=post.post_title,
                    user_id=post.user_id,
                    thread_id=post.thread_id,
                    body=post.body,
                    votes=post.votes
                    )
            
            except Exception as e:
                return jsonify(message='An error occurred during updating the post', error=str(e)), 500
        else:
            return jsonify(message=f'No post found with id {post_id}'), 400
    
    else:
        
        # ? Retrieve the entry we want to delete 
        post = Post.query.filter_by(post_id=post_id).first()

        if post: 

            # ? Delete the entry from the database
            db.session.delete(post)

            # ? Commit changes to the database
            db.session.commit()

            return jsonify(message=f"Post with ID {post_id} has been successfully deleted")
        
        else: 
            return jsonify(message=f"No posts were found with the ID {post_id}")




