import json
import re
import uuid

import requests
import boto3
from flask import Blueprint, request, jsonify

api = Blueprint('api', __name__)
settings = json.load(open('data-settings.json', 'r'))

shopbopSession = requests.Session()
shopbopSession.headers.update({
    'Accept': 'application/json',
    'Client-Id': 'Shopbop-UW-Team2',
    'Client-Version': '1.0.0'
})

db_url = 'http://localhost:8000'
dynamodb = boto3.resource('dynamodb', endpoint_url=db_url)
table = dynamodb.Table('Outfits')
print(f'Connected to DynamoDB table: {table.name}')


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
    table.put_item(Item=data)
    return '/'


def build_products_url(cat_id, **kwargs):
    url = f'{settings["baseUrl"]}/public/categories/{cat_id}/products'
    params = [f'{k}={v}' for k, v in kwargs.items() if v]
    if len(params) > 0:
        url += '?' + '&'.join(params)
    return url


def parse_themes(desc):
    return re.findall(r'[#@][\w]+', desc)
