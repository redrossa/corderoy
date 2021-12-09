import http
import json
import re
import uuid
import requests
from flask import Blueprint, request, jsonify
from models import Outfit, Theme, Product, db
from sqlalchemy.sql import text
import sys






api = Blueprint('api', __name__)

shopbopSession = requests.Session()
shopbopSession.headers.update({
    'Accept': 'application/json',
    'Client-Id': 'Shopbop-UW-Team2',
    'Client-Version': '1.0.0'
})






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
    data = json.loads(request.data)
    data['themes'] = parse_themes(data['desc'])
    data['comments'] = []
    data['likes'] = 0
    data['id'] = str(uuid.uuid4())
    data['price'] = sum([prod['product']['retailPrice']['usdPrice']
                         for prods in data['products'].values()
                         for prod in prods.values()])
   
    data['product_info'] = [(prod['product']['productCode'], prod['part'], prod['collection'], prod['product']['designerName'])
                         for prods in data['products'].values()
                         for prod in prods.values()]
   
    #print(f'Posting outfit: {data}')
    db.session.add(Outfit(id=data['id'], title=data['title'], desc=data['desc'], likes=data['likes'], 
                    price=data['price'], date=data['date'], products=data['products'], 
                    comments=data['comments']))
    
    
    for productid, part, collection, designer in data['product_info']:    
        db.session.add(Product(part=part, productid=productid, 
        collection=collection, designer=designer, outfitid=data['id']))

    for theme in list(set(data['themes'])):
        db.session.add(Theme(name=theme, outfitid=data['id']))
    
    db.session.commit()
    
    return '/'


@api.route('/api/outfits', methods=['GET'])
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
    
    theme = request.args.get('theme', default="", type=str)
    sort = request.args.get('sort', default='likes', type=str)  # likes | price | date
    min_price = request.args.get('minPrice', default=0, type=float)
    max_price = request.args.get('maxPrice', default=sys.float_info.max, type=float)
    limit = request.args.get('limit', default=40, type=int)
    query = request.args.get('q')
    selectors = parse_query(query)

    q = db.session.query(Outfit, Theme, Product).filter(Outfit.id == Theme.outfitid,
                          Outfit.id == Product.outfitid).filter(Outfit.price >= min_price, 
                          Outfit.price <= max_price)
    
    if theme != '':
        q = q.filter(Theme.name == theme)

    outfit_list = []
    outfit = {'id': None, 'theme': [], 'productid': []}
    for o, t, p in q.order_by(Outfit.id, Theme.name, Product.productid, text(sort)):
        print(outfit['id'], outfit['theme'], outfit['productid'])
        if o.id != outfit['id']: 
            print('inside new outfitid')
            outfit_list.append(outfit.copy())
            print('new outfit appended', [outfit['id'] for outfit in outfit_list])
            outfit['id'] = o.id
            outfit['title'] = o.title
            outfit['likes'] = o.likes
            outfit['desc'] = o.desc
            outfit['price'] = o.price
            outfit['date'] = o.date
            outfit['products'] = [o.products]
            outfit['comments'] = [o.comments]
            outfit['theme'] = [t.name]
            outfit['productid'] = [p.productid]
            outfit['part'] = [p.part]
            outfit['designer'] = [p.designer]
            outfit['collection'] = [p.collection]
        if t.name not in outfit['theme'] and t.name != '':
            print('inside new theme')
            outfit['theme'] += [t.name]
        if p.productid not in outfit['productid']:
            print('inside new productid')
            outfit['productid'] += [p.productid]
            outfit['part'] += [p.part]
            outfit['designer'] += [p.designer]
            outfit['collection'] += [p.collection]
    outfit_list.append(outfit.copy())
    print([outfit['id'] for outfit in outfit_list])
    return jsonify(outfit_list[1:limit+1])
    

@api.route('/api/trending', methods = ['GET'])
def get_api_trending():
    """
    Fetch most liked outfits within an input time period
    then sort result by likes
    
    :return: sorted list of queried outfits
    """
    days = request.args.get('days')
    limit = request.args.get('limit', default=40)

    # TODO fetch trending



   
   
    q = db.session.query(Outfit, Theme, Product).filter(Outfit.id == Theme.outfitid,
                          Outfit.id == Product.outfitid)
    
    outfit_list = []
    outfit = {'id': None, 'theme': [], 'productid': []}
    
    for o, t, p in q.order_by(text('likes'), text('date'), text('price'), 
                            Outfit.id, Theme.name, Product.productid):
        print(outfit['id'], outfit['theme'], outfit['productid'])
        if o.id != outfit['id']: 
            print('inside new outfitid')
            outfit_list.append(outfit.copy())
            print('new outfit appended', [outfit['id'] for outfit in outfit_list])
            outfit['id'] = o.id
            outfit['title'] = o.title
            outfit['likes'] = o.likes
            outfit['desc'] = o.desc
            outfit['price'] = o.price
            outfit['date'] = o.date
            outfit['products'] = [o.products]
            outfit['comments'] = [o.comments]
            outfit['theme'] = [t.name]
            outfit['productid'] = [p.productid]
            outfit['part'] = [p.part]
            outfit['designer'] = [p.designer]
            outfit['collection'] = [p.collection]
        if t.name not in outfit['theme'] and t.name != '':
            print('inside new theme')
            outfit['theme'] += [t.name]
        if p.productid not in outfit['productid']:
            print('inside new productid')
            outfit['productid'] += [p.productid]
            outfit['part'] += [p.part]
            outfit['designer'] += [p.designer]
            outfit['collection'] += [p.collection]
    outfit_list.append(outfit.copy())
    print([outfit['id'] for outfit in outfit_list])
    return jsonify(outfit_list[1:])
    
    
    



@api.route('/api/like', methods=['POST'])
def post_api_like():
    outfit_id = request.args.get('outfit-id')

    # TODO increment likes of input outfit

    return '', http.HTTPStatus.NO_CONTENT  # return empty response, so client doesn't redirect


def load_settings():
    settings = json.load(open('data-settings.json', 'r'))
    return settings


def build_products_url(cat_id, **kwargs):
    settings = load_settings()
    url = f'{settings["baseUrl"]}/public/categories/{cat_id}/products'
    params = [f'{k}={v}' for k, v in kwargs.items() if v]
    if len(params) > 0:
        url += '?' + '&'.join(params)
    return url


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


def parse_themes(desc):
    return list(set(re.findall(r'[#@][\w]+', desc)))
