from application import db
from application.database.models import User, Token, Friend, Item, Swap
db.create_all()