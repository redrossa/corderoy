import argparse
import json

from api import api
from models import db
from flask import Flask
from flask_migrate import Migrate


app = Flask(__name__)
app.register_blueprint(api)


@app.route('/')
def get_home():
    return 'Home'


@app.route('/wardrobe')
def get_wardrobe():
    return 'Wardrobe'


@app.route('/share')
def get_share():
    return 'Share'


def build_db_url(user, pwd, host, port, dbname):
    return f'postgresql://{user}:{pwd}@{host}:{port}/{dbname}'


settings = json.load(open('server-settings.json', 'r'))
app.config['SQLALCHEMY_DATABASE_URI'] = build_db_url(
    settings['user'],
    settings['pass'],
    settings['host'],
    settings['port'],
    settings['dbname'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)


if __name__ == '__main__':
    app.config['DEBUG'] = True
    app.run(debug=True)
