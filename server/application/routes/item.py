"""
 All routes related to items, get book, post, get by category 
"""
# create, update, delete
# Search in search bar:
#     get product by name 

# Filter search by category/genre:
#     get product by category 

# Add item to their portfolio:
# @app.route("/product/", methods=["get", "POST", "delete", "patch"])
# def create():
#     if method == "post":
#         ## do something
    
from flask import Blueprint, request, jsonify
from application import db
from database import Item

item_bp = Blueprint("item", __name__, url_prefix='/item') 

# Formatting the items 

def format_item(item): 
    return {
        "product_type": item.product_type,
        "name": item.name,
        "user_id": item.user_id,
        "category": item.category,
        "platform": item.platform
    }

# Display all books or games or comics
@item_bp.route("/", methods=["GET"])
def get_category():
    if request.method == "GET":
        # Assuming that data comes in the form e.g. {category: "books"}
        data = request.json

        # Querying the Item table by category
        items = Item.query.filter_by(category=data)

        item_list = []

        for item in items:
            item_list.append(format_item(item))

        # Returning the data for the specified category

        return {"items": item_list
                }
