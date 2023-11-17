from flask import Blueprint, request, jsonify
from application.database.models import Item, db

item_bp = Blueprint("item_bp", __name__, url_prefix='/item') 

# Formatting the items 
def format_item(item): 
    return {
        "item_id": item.item_id,
        "category": item.category,
        "title": item.title, 
        "user_id": item.user_id, 
        "genre": item.genre, 
        "author": item.author, 
        "rating": item.rating,
        "img": item.img,
        "issue_num": item.issue_num
    }

# Display all books or games or comics
@item_bp.route("/", methods=['GET', 'POST'])
def get_all():
    if request.method == 'GET':
        items = Item.query.all()
        item_list = []
        for item in items:
            item_list.append(format_item(item))
        return {"Items": item_list}

    """" Create an Item """
    if request.method == 'POST':
        # {genre: , item: , img: null, }
        data = request.get_json()
        if data:
            genre, title, user_id, category, author, img, rating, issue_num = data['genre'], data['title'], data['user_id'], data['category'], data['author'], data['img'], data['rating'], data["issue_num"]

            if category and title and user_id and author:
                try:
                    item_to_add = Item(
                        genre=genre,
                        title=title,
                        user_id=user_id,
                        category=category, 
                        author=author,
                        img=img,
                        rating=rating,
                        issue_num=issue_num
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

@item_bp.route('/<category>', methods=['GET'])
def get_by_category(category):
    items_by_product = Item.query.filter(Item.category == str(category)).all()
    if not items_by_product:
        return jsonify(message=f'No items found for the following type: {category}'), 404
    else:
        matching_items = [format_item(item) for item in items_by_product]
        return jsonify(items=matching_items)

# we need to check this, as it is possible that an item id exists but it's not a 
# certain product type. is that okay? 
# USER STORY : Search category (book, comic, games) > Select an individual book
@item_bp.route('/<category>/<item_id>', methods=['GET'])
def get_items_by_user(category, item_id):
    item = Item.query.filter_by(category ==str(category), item_id= item_id).first()
    if not item:
        return jsonify(message=f'No items found with the item_id: {item_id} and the type as: {category}'), 404
    else:
        return jsonify(item= item)

# USER STORY : Profile page > User updates a specific item in their collection
@item_bp.route('/<item_id>', methods=['PATCH'])
def update_item(item_id):
    if request.method == 'PATCH':
        new_user_data = request.get_json()
        #find new user id request body 
        new_user_id_str = new_user_data.get('user_id', '')
        try:
            new_user_id = int(new_user_id_str)
        except ValueError:
            return jsonify(error= 'Invalid user_id format. Must be an integer'), 400
        #find which item needs updating
        item_to_update = Item.query.filter_by(item_id=item_id).first()
        #if not found
        if not item_to_update:
            return jsonify(message=f'No items found with the item_id: {item_id}'), 404
        else:
            item_to_update.user_id = new_user_id
            db.session.commit()
            return jsonify(message=f'Item {item_id} updated successfully ')
