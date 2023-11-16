from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
#db.metadata.drop_all(db.engine, checkfirst=True)

#User Table
class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    address = db.Column(db.String(255))
    password = db.Column(db.String(255), nullable=False)
    dateofbirth = db.Column(db.DateTime) ####
    
    def __init__(self, username, email, address, password, dateofbirth):
        self.username = username
        self.email = email
        self.address = address
        self.password = password
        self.dateofbirth = dateofbirth

# #Token Table  
# class Token(db.Model):
#     token_id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
#     token = db.Column(db.String(255), nullable=False)

#     #Foreign Keys
#     user = db.relationship('User', foreign_keys=[user_id])

#     def __init__(self, user_id, token):
#         self.user_id = user_id
#         self.token = token

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
    img = db.Column(db.String(255))
    rating = db.Column(db.Integer, nullable=False)
    #Foreign Keys
    user = db.relationship('User', foreign_keys=[user_id])
    def __init__(self, genre, title, user_id, category, author, issue_num, img, rating):
        self.category = category
        self.title = title
        self.user_id = user_id
        self.username = username
        self.genre = genre
        self.author = author
        self.issue_num = issue_num
        self.img = img
        self.rating = rating
        
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


    