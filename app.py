from api import api
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://vedaant_tabmi@postgres.cs.wisc.edu/outfits"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy()
db.init_app(app)
migrate = Migrate(app, db)
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


if __name__ == '__main__':
    app.config['DEBUG'] = True
    app.run()
