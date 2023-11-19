from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

"""
! Create an instance of the database but don't initialise it
! Defined outside of the function to ensure the db is made available to the entire application 
"""
db = SQLAlchemy()

# ! Creating the application factory
def create_app(env=None):
    
    # ! Initializing app using flask
    app = Flask(__name__)

    # ! Config setup for different environments - different setup for testing 
        # ? You can even add a separate if statement when it goes to function and you can include the product db in there

    if env == 'TEST':
        app.config["TESTING"] = True
        app.config["DEBUG"] = False
        app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite://"
        app.config["SECRET_KEY"] = "test"

    else:
        app.config["TESTING"] = False
        app.config["DEBUG"] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = os.environ["DB_URL"]
        app.config["SECRET_KEY"] = os.environ["SECRET_KEY"]

    # ! Initializing the db and connecting to the app - equivalent of passing the App in the SQlAlchemy class. 
    db.init_app(app)

    # ! Allows us to create our database
    app.app_context().push()

    # ! Setting up CORS
    CORS(app)
    
    # ! Import the routes routes
    from application.routes import auth, user, item, community, thread, post

    # ! from application import route blueprints
    app.register_blueprint(auth.auth_bp)
    app.register_blueprint(user.user_bp)
    app.register_blueprint(item.item_bp)
    app.register_blueprint(community.community_bp)
    app.register_blueprint(thread.thread_bp)
    app.register_blueprint(post.post_bp)

    return app








