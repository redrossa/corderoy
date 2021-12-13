import uuid

from sqlalchemy.dialects.postgresql import JSONB, UUID, ARRAY
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Outfit(db.Model):
    __tablename__ = 'outfits'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = db.Column(db.UnicodeText)
    desc = db.Column(db.UnicodeText)
    date = db.Column(db.Date)
    likes = db.Column(db.Integer)
    price = db.Column(db.Numeric)
    themes = db.Column(ARRAY(db.UnicodeText))
    designers = db.Column(ARRAY(db.UnicodeText))
    collections = db.Column(ARRAY(db.UnicodeText))
    parts = db.Column(ARRAY(db.UnicodeText))
    products = db.Column(JSONB)
    comments = db.Column(JSONB)

    def __init__(self, id, title, desc, date, likes, price, themes, designers, collections, parts, products, comments):
        self.id = id
        self.title = title
        self.desc = desc
        self.date = date
        self.likes = likes
        self.price = price
        self.themes = themes
        self.designers = designers
        self.collections = collections
        self.parts = parts
        self.products = products
        self.comments = comments

    def __repr__(self):
        return f'<Outfit {self.id}>'
