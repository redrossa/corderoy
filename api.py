import datetime
import http
import json
import uuid
import requests
from flask import Blueprint, request, jsonify

from models import db, Outfit

api = Blueprint('api', __name__)

shopbopSession = requests.Session()
shopbopSession.headers.update({
    'Accept': 'application/json',
    'Client-Id': 'Shopbop-UW-Team2',
    'Client-Version': '1.0.0'
})


def load_settings():
    return json.load(open('data-settings.json', 'r'))


def load_mock_db():
    return json.load(open('mock-db.json', 'r'))


@api.route('/api/settings')
def get_api_settings():
    settings = load_settings()
    return jsonify(settings)


@api.route('/api/parts')
def get_api_parts():
    settings = load_settings()
    return jsonify([k for k in settings['tree'].keys()])


@api.route('/api/collections')
def get_api_collections():
    settings = load_settings()
    part = request.args.get('part')
    parts = [part] if part else settings['tree'].keys()
    return jsonify([k for p in parts for k in settings['tree'][p].keys()])


def build_products_url(cat_id, **kwargs):
    settings = load_settings()
    url = f'{settings["baseUrl"]}/public/categories/{cat_id}/products'
    params = [f'{k}={v}' for k, v in kwargs.items() if v]
    if len(params) > 0:
        url += '?' + '&'.join(params)
    return url


@api.route('/api/products')
def get_api_products():
    collection = request.args.get('collection')
    sort = request.args.get('sort', default='ratings')
    min_price = request.args.get('minPrice')
    max_price = request.args.get('maxPrice')
    limit = request.args.get('limit', default=40)
    query = request.args.get('q')

    settings = load_settings()

    # get the part and uris of the input collection from settings
    part = None
    uris = None
    for p, part_items in settings['tree'].items():
        for coll, uri_items in part_items.items():
            if coll == collection:
                part = p
                uris = uri_items
                break

    # get the source data of the categories of this collection to retrieve the id
    all_categories = shopbopSession.get(f'{settings["baseUrl"]}/public/folders').json()[settings['root']]
    select_categories = []
    for uri in uris:
        keys = uri.split('/')
        visitor = all_categories
        for i, key in enumerate(keys):
            for cat in visitor:
                if cat['name'] == key:
                    visitor = cat['children'] if key != keys[-1] else cat
        select_categories.append(visitor)

    src_urls = [build_products_url(c['id'],
                                   sort=sort,
                                   min_price=min_price,
                                   max_price=max_price,
                                   limit=limit,
                                   query=query) for c in select_categories]

    products = [shopbopSession.get(url).json()['products'] for url in src_urls]
    products = [p for sublist in products for p in sublist]
    for p in products:
        p['part'] = part
        p['collection'] = collection
        p['color'] = 0

    return jsonify(products)


@api.route('/api/outfit', methods=['POST'])
def post_api_outfit():
    """
    Posts input outfit data into database
    :return: id of the added outfit
    """
    outfit_id = uuid.uuid4()
    data = json.loads(request.data)
    outfit = Outfit(outfit_id,
                    data['title'],
                    data['desc'],
                    data['date'],
                    data['likes'],
                    data['price'],
                    data['themes'],
                    data['designers'],
                    data['collections'],
                    data['parts'],
                    data['products'],
                    data['comments'])
    db.session.add(outfit)
    db.session.commit()
    print(f'{repr(outfit)} has been added successfully')
    
    return str(outfit_id)


def parse_query(query):
    """
    Extract from a string query a list of themes, product parts,
    product collections, and product designers

    :param query: a string text without any particular format,
        except for '#' to specify the start of a theme
    :return: an dictionary with the following key-value pairs:
        'themes': [list of themes ..]
        'parts': [list of product parts ...]
        'collections': [list of product collections ...]
        'designers': [list of product designers ...]
    """
    selectors = {
        'themes': [],
        'parts': [],
        'collections': [],
        'designers': []
    }

    # TODO parse query

    return selectors


@api.route('/api/outfits')
def get_api_outfits():
    """
    Fetch all outfits containing a particular...
        - theme*
        - product designer*
        - product collection*
        - product part*
        - price range
        - keyword
    Then sort result by...
        - likes
        - date
        - price
        
    :return: sorted list of queried outfits
    """
    query = request.args.get('q')
    sort = request.args.get('sort', default='likes')  # likes | price | date
    limit = request.args.get('limit', default=40)

    print(query)
    print(sort)

    selectors = parse_query(query)
    # TODO implement fetch outfits

    return jsonify(load_mock_db()['trending'])
  

@api.route('/api/trending')
def get_api_trending():
    """
    Fetch most liked outfits within an input time period
    then sort result by likes
    
    :return: sorted list of queried outfits
    """
    days = request.args.get('days', default=30)
    limit = request.args.get('limit', default=40)

    rel_time = datetime.datetime.utcnow() - datetime.timedelta(days=days)
    outfits = Outfit.query.filter(Outfit.date >= rel_time).limit(limit).all()
    results = [{
        'id': outfit.id,
        'title': outfit.title,
        'desc': outfit.desc,
        'date': outfit.date,
        'likes': outfit.likes,
        'price': outfit.price,
        'themes': outfit.themes,
        'designers': outfit.designers,
        'collections': outfit.collections,
        'parts': outfit.parts,
        'products': outfit.products,
        'comments': outfit.comments,
    } for outfit in outfits]

    return jsonify(results)


@api.route('/api/like', methods=['POST'])
def post_api_like():
    outfit_id = request.args.get('outfit-id')

    outfit = db.session.query(Outfit).filter(Outfit.id == outfit_id).one()
    outfit.likes += 1
    db.session.commit()
    print(f'{repr(outfit)} likes incremented')

    return '', http.HTTPStatus.NO_CONTENT  # return empty response, so client doesn't redirect


@api.route('/api/unlike', methods=['POST'])
def post_api_unlike():
    outfit_id = request.args.get('outfit-id')

    outfit = db.session.query(Outfit).filter(Outfit.id == outfit_id).one()
    outfit.likes = max(outfit.likes - 1, 0)
    db.session.commit()
    print(f'{repr(outfit)} likes decremented')

    return '', http.HTTPStatus.NO_CONTENT  # return empty response, so client doesn't redirect
