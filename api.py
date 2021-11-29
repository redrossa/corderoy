import json
import requests
from flask import Blueprint, request, jsonify

api = Blueprint('api', __name__)
settings = json.load(open('data-settings.json', 'r'))


@api.route('/api/settings')
def get_api_settings():
    return jsonify(settings)


@api.route('/api/products')
def get_api_products():
    collection = request.args.get('collection')
    sort = request.args.get('sort', default='ratings')
    min_price = request.args.get('minPrice')
    max_price = request.args.get('maxPrice')
    limit = request.args.get('limit', default=40)
    query = request.args.get('q')

    # get the uris in settings of the input collection
    uris = None
    for part, part_items in settings['tree'].items():
        for coll, uri_items in part_items.items():
            if coll == collection:
                uris = uri_items
                break

    # get the source data of the categories of this collection to retrieve the id
    all_categories = requests.get(f'{settings["baseUrl"]}/public/folders').json()[settings['root']]
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

    products = [requests.get(url).json()['products'] for url in src_urls]
    products = [p for sublist in products for p in sublist]
    for p, uri in zip(products, uris):
        p['customUri'] = uri

    return jsonify(products)


def build_products_url(cat_id, **kwargs):
    url = f'{settings["baseUrl"]}/public/categories/{cat_id}/products'
    params = [f'{k}={v}' for k, v in kwargs.items() if v]
    if len(params) > 0:
        url += '?' + '&'.join(params)
    return url
