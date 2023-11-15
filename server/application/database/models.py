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
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    token = db.Column(db.String(255), nullable=False)

    #Foreign Keys
    user = db.relationship('User', foreign_keys=[user_id])

    def __init__(self, user_id, token):
        self.user_id = user_id
        self.token = token

#Friends Table  
class Friend(db.Model):
    friend_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    friend_user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    #Foreign Keys
    user = db.relationship('User', foreign_keys=[user_id])
    friend_user = db.relationship('User', foreign_keys=[friend_user_id])

    def __init__(self, user_id, friend_user_id):
        self.user_id = user_id
        self.friend_user_id = friend_user_id

#Item Table
class Item(db.Model):
    item_id = db.Column(db.Integer, primary_key=True)
    product_type = db.Column(db.String(20), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category = db.Column(db.String(255), nullable=False)
    platform = db.Column(db.String(255))

    #Foreign Keys
    user = db.relationship('User', foreign_keys=[user_id])

    def __init__(self, product_type, name, user_id, category, platform):
        self.product_type = product_type
        self.name = name
        self.user_id = user_id
        self.category = category
        self.platform = platform

#Swap Table
class Swap(db.Model):
    swap_id = db.Column(db.Integer, primary_key=True)
    user_id_gives = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user_id_taker = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)

    #Foreign Keys
    user_giver = db.relationship('User', foreign_keys=[user_id_gives])
    user_taker = db.relationship('User', foreign_keys=[user_id_taker])

    def __init__(self, user_id_gives, user_id_taker, date, item_id):
        self.user_id_gives = user_id_gives
        self.user_id_taker = user_id_taker
        self.date = date
        self.item_id = item_id


    