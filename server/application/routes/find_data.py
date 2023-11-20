from flask import Blueprint, request, jsonify
import json
import urllib.parse
import urllib.request
from application.database.models import Item, db

google_bp = Blueprint("google_bp", __name__, url_prefix='/google')

# Function that takes a name of a book and returns an object of the book
@google_bp.route('/', methods=['GET', 'PATCH'])
# set default book
def get_book_info(title="Harry Potter and the Prisoner of Azkaban"):
    if request.method == 'PATCH':

        user_email = request.json.get('email')
        title = request.json.get('title', title)

        # Fetch book information from the Google Books API
        api_key = 'AIzaSyB8Hw22PIQimUW3au9yCa2qgCf9sxTmUfI'
        payload = {
            'q': f'intitle:{title}',
            'key': api_key,
        }
        query = urllib.parse.urlencode(payload)
        url = f'https://www.googleapis.com/books/v1/volumes?{query}'

        try:
            response = urllib.request.urlopen(url)
            text = response.read()
            data = json.loads(text)

            # Extract image URL from the API response
            if 'items' in data and len(data['items']) > 0:
                first_book = data['items'][0]
                image_url = first_book['volumeInfo'].get('imageLinks', {}).get('thumbnail', '')

                if user_email:
                    user_email = str(user_email)
                    item_to_patch = Item.query.filter(Item.email == user_email).first()
                    item_to_patch.img = image_url
                    db.session.commit()


                return jsonify({'message': 'User image URL updated successfully'})

            else:
                return jsonify({'error': 'No results found for the given title'})

        except urllib.error.URLError as e:
            return jsonify({'error': str(e)})

    elif request.method == 'GET':
        # Handle GET request to fetch book information
        title = request.json.get('title', title)
        api_key = 'AIzaSyB8Hw22PIQimUW3au9yCa2qgCf9sxTmUfI'

        payload = {
            'q': f'intitle:{title}',
            'key': api_key,
        }

        query = urllib.parse.urlencode(payload)
        url = f'https://www.googleapis.com/books/v1/volumes?{query}'

        try:
            response = urllib.request.urlopen(url)
            text = response.read()
            data = json.loads(text)

            # return only the first result
            if 'items' in data and len(data['items']) > 0:
                first_book = data['items'][0]
                return jsonify(first_book)
            # this should never be reached as I have default book set
            else:
                return jsonify({'error': 'No results found for the given title'})

        except urllib.error.URLError as e:
            return jsonify({'error': str(e)})