import json
import re
import uuid
import requests
from flask import Blueprint, request, jsonify
from app import db
from models import Outfit, Theme, Part, Collection , Designer
from sqlalchemy.sql import text




api = Blueprint('api', __name__)
settings = json.load(open('data-settings.json', 'r'))

shopbopSession = requests.Session()
shopbopSession.headers.update({
    'Accept': 'application/json',
    'Client-Id': 'Shopbop-UW-Team2',
    'Client-Version': '1.0.0'
})




@api.route('/api/settings')
def get_api_settings():
    return jsonify(settings)


@api.route('/api/parts')
def get_api_parts():
    return jsonify([k for k in settings['tree'].keys()])


@api.route('/api/collections')
def get_api_collections():
    part = request.args.get('part')
    parts = [part] if part else settings['tree'].keys()
    return jsonify([k for p in parts for k in settings['tree'][p].keys()])


@api.route('/api/products')
def get_api_products():
    collection = request.args.get('collection')
    sort = request.args.get('sort', default='ratings')
    min_price = request.args.get('minPrice')
    max_price = request.args.get('maxPrice')
    limit = request.args.get('limit', default=40)
    query = request.args.get('q')

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

    return jsonify(products)


@api.route('/api/outfit', methods=['POST'])
def post_api_outfit():
    data = json.loads(request.data)
    data['themes'] = parse_themes(data['desc'])
    data['comments'] = []
    data['likes'] = 0
    data['id'] = str(uuid.uuid4())
    print(f'Posting outfit: {data}')
    db.session.add(Outfit(id=data['id'], title=data['title'], desc=data['desc'], likes=data['likes'], 
                    price=data['price'], date=data['date'], name=data['name'],
                    products=data['products'], comments=data['comments']))
    db.session.add(Theme(name=data['theme'], outfitid=data['id']))
    db.session.add(Part(name=data['theme'], outfitid=data['id']))
    db.session.add(Collection(name=data['theme'], outfitid=data['id']))
    db.session.add(Designer(name=data['theme'], outfitid=data['id']))
    db.session.commit()
    
    return f"Done!!"


@api.route('/api/outfits')
def get_api_outfits():
    """
    Fetch all outfits containing a particular...
        - theme*
        - product
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
    theme = request.args.get('theme')
    sort = request.args.get('sort', default='likes')  # likes | price | date
    min_price = request.args.get('minPrice')
    max_price = request.args.get('maxPrice')
    limit = request.args.get('limit', default=40)
    query = request.args.get('q')

    q = db.session.query(Outfit, Theme, Part, Collection, Designer).filter(Outfit.id == Theme.outfitid,
                          Outfit.id == Part.outfitid, 
                          Outfit.id == Collection.outfitid, 
                          Outfit.id == Designer.outfitid).filter(Outfit.price >= min_price, 
                          Outfit.price <= max_price).filter(Theme.name == theme).order_by(text(sort))
    
    counter = 0;
    outfits_list = []
    for o, _, _ , _, _ in q:
        outfits_list.append(o)
        counter += 1
        if counter >= int(limit):
            break
    return outfits_list[:int(limit)]





    

    
    


def build_products_url(cat_id, **kwargs):
    url = f'{settings["baseUrl"]}/public/categories/{cat_id}/products'
    params = [f'{k}={v}' for k, v in kwargs.items() if v]
    if len(params) > 0:
        url += '?' + '&'.join(params)
    return url


def parse_themes(desc):
    return re.findall(r'[#@][\w]+', desc)
