from api import api
from flask import Flask


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


if __name__ == '__main__':
    app.run()
