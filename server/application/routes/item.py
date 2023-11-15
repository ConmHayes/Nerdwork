from flask import Blueprint, request, jsonify
from application.database.models import Item, db

item_bp = Blueprint("item_bp", __name__, url_prefix='/item') 

# Formatting the items 
def format_item(item): 
    return {
        "item_id": item.item_id,
        "product_type": item.product_type,
        "name": item.name,
        "user_id": item.user_id,
        "category": item.category,
        "platform": item.platform
    }

# Display all books or games or comics
@item_bp.route("/", methods=['GET', 'POST'])
def get_all():
    """"Return All Items """
    if request.method == 'GET':
        # Assuming that data comes in the form e.g. {category: "books"}
        data = request.json
        # Querying the Item table by category
        #this route was going to return all items according to trello 
        # items = Item.query.filter_by(category=data)

        items = Item.query.all()
        item_list = []
        for item in items:
            item_list.append(format_item(item))
        # Returning the data for the specified category
        return {"Items": item_list}
    
    """" Create an Item """
    if request.method == 'POST':
        data = request.get_json()
        if data:
            product_type, name, user_id, category, platform = data['product_type'], data['name'], data['user_id'], data['category'], data['platform']
            # check for not nullable ones present
            if product_type and name and user_id and  category:
                #add to db
                try:
                    #as it is now, platform missing gives an error becuase of this, but it works
                    item_to_add = Item(
                        product_type=product_type, 
                        name=name,
                        user_id=user_id, 
                        category=category,
                        platform=platform
                    )
                    db.session.add(item_to_add)
                    db.session.commit()
                    return jsonify(message='Item Successfully Added To Database'), 201
                except Exception as e:
                    return jsonify(message='An error occurred during posting an item', error=str(e)), 400
            else:
                return jsonify(message='Posting item failed, possibly missing mandatory arguments'), 400
        else:
            return jsonify(message='No data passed in'), 400

@item_bp.route('/<product_type>', methods=['GET'])
def get_by_category(product_type):
    items_by_product = Item.query.filter(Item.product_type == str(product_type)).all()
    if not items_by_product:
        return jsonify(message=f'No items found for the following type: {product_type}'), 404
    
    else:
        matching_items = [format_item(item) for item in items_by_product]
        return jsonify(items=matching_items)

    

