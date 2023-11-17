from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
#db.metadata.drop_all(db.engine, checkfirst=True)

#User Table
class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255))
    password = db.Column(db.String(255), nullable=False)
    
    def __init__(self, username, email, address, password):
        self.username = username
        self.email = email
        self.address = address
        self.password = password

#Token Table  
class Token(db.Model):
    token_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    token = db.Column(db.String(255), nullable=False)

    #Foreign Keys
    user = db.relationship('User', foreign_keys=[user_id])

    def __init__(self, user_id, token):
        self.user_id = user_id
        self.token = token

#Friends Table  
class Friend(db.Model):
    friend_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    friend_user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)

    #Foreign Keys
    user = db.relationship('User', foreign_keys=[user_id])
    friend_user = db.relationship('User', foreign_keys=[friend_user_id])

    def __init__(self, user_id, friend_user_id):
        self.user_id = user_id
        self.friend_user_id = friend_user_id

#Item Table
class Item(db.Model):
    item_id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(20), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(255), nullable=False)
    issue_num = db.Column(db.Integer)
    img = db.Column(db.String(255), nullable=True)
    rating = db.Column(db.Integer, nullable=False)

    #Foreign Keys
    user = db.relationship('User', foreign_keys=[user_id])

    def __init__(self, genre, title, user_id, category, author, issue_num, rating, img=None):
        self.category = category
        self.title = title
        self.user_id = user_id
        self.genre = genre
        self.author = author
        self.issue_num = issue_num
        self.rating = rating
        self.img = img

#Swap Table
class Swap(db.Model):
    swap_id = db.Column(db.Integer, primary_key=True)
    user_id_gives = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    user_id_taker = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey('item.item_id'), nullable=False)

    #Foreign Keys
    user_giver = db.relationship('User', foreign_keys=[user_id_gives])
    user_taker = db.relationship('User', foreign_keys=[user_id_taker])

    def __init__(self, user_id_gives, user_id_taker, date, item_id):
        self.user_id_gives = user_id_gives
        self.user_id_taker = user_id_taker
        self.date = date
        self.item_id = item_id

# Community Table 
class Community(db.Model):
    community_id = db.Column(db.Integer, primary_key=True)
    community_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=True)

    # Initialization
    def __init__(self, community_name, description):
        self.community_name = community_name
        self.description = description

# Thread table
class Thread(db.Model):
    thread_id = db.Column(db.Integer, primary_key=True)
    community_id = db.Column(db.Integer, db.ForeignKey('community.community_id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)

    # Foreign Key Constraints
    community_id_FK = db.relationship('Community', foreign_keys=[community_id])
    user_id_FK = db.relationship('User', foreign_keys=[user_id])

    # Initialization
    def __init__(self, community_id, title, description, user_id):
        self.community_id = community_id
        self.title = title
        self.description = description
        self.user_id = user_id

# Post table 
class Post(db.Model):
    post_id = db.Column(db.Integer, primary_key=True)
    post_title = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    thread_id = db.Column(db.Integer, db.ForeignKey('thread.thread_id'),nullable=False)
    body = db.Column(db.String(255), nullable=False)
    votes = db.Column(db.Integer, nullable=True, default=0)

    # Foreign Key Constraints
    user_id_FK = db.relationship('User', foreign_keys=[user_id])
    thread_id_FK = db.relationship('Thread', foreign_keys=[thread_id])

    # Initialization 
    def __init__(self, post_title, user_id, thread_id, body, votes=0):
        self.post_title = post_title
        self.user_id = user_id
        self.thread_id = thread_id
        self.body = body
        self.votes = votes

    