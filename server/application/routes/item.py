from flask import Blueprint, request, jsonify
from application.database.models import Item, db

item_bp = Blueprint("item_bp", __name__, url_prefix='/item') 


# Formatting the items 
def format_item(item, genres_list): 
    return {
        "item_id": item.item_id,
        "category": item.category,
        "title": item.title, 
        "email": item.email, 
        "genre": genres_list, 
        "author": item.author, 
        "rating": item.rating,
        "img": item.img,
        "issue_num": item.issue_num
    }

@item_bp.route("/", methods=['GET', 'POST'])
def get_all():
    if request.method == 'GET':
        items = Item.query.all()
        item_list = []

        for item in items:
            genres_list = [genre.strip() for genre in item.genre.strip('[]').split(',')]
            item_list.append(format_item(item, genres_list))

        return jsonify({"Items": item_list}), 200

    """" Create an Item """
    if request.method == 'POST':
        
        data = request.get_json()
        if data:
            genre, title, email, category, author, img, rating, issue_num = data['genre'], data['title'], data['email'], data['category'], data['author'], data['img'], data['rating'], data["issue_num"]

            if category and title and email and author:
                try:
                    item_to_add = Item(
                        genre=genre,
                        title=title,
                        email=email,
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
    
    matching_items = []
    for item in items_by_product:
        genres_list = []

        try: 
            # Attempt to parse the genre string into a list
            genres_list = [genre.strip() for genre in item.genre.strip('[]').split(',')]
        except Exception as e:
            print("Exception occurred while formatting genres:", str(e))

        # Include the genres_list in the format_item 
        formatted_item_list = format_item(item, genres_list)
        matching_items.append(formatted_item_list)

    return jsonify(items=matching_items)

@item_bp.route('/<category>/<item_id>', methods=['GET'])
def get_items_by_user(category, item_id):
    item = Item.query.filter_by(category ==str(category), item_id= item_id).first()
    if not item:
        return jsonify(message=f'No items found with the item_id: {item_id} and the type as: {category}'), 404
    else:
        return jsonify(item= item)

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
