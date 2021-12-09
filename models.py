from sqlalchemy import create_engine, Column, Integer
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from flask_migrate import Migrate
from sqlalchemy.dialects.postgresql import JSON
from flask_sqlalchemy import SQLAlchemy




# define your models classes hereafter


db = SQLAlchemy()

class Outfit(db.Model):
    __tablename__ = 'outfit'

    id = db.Column(db.String, primary_key=True)
    title = db.Column(db.String)
    desc = db.Column(db.String)
    likes = db.Column(db.Integer)
    price = db.Column(db.Float)
    date = db.Column(db.Date)
    products = db.Column(JSON)
    comments = db.Column(JSON)
    theme_children = relationship("Theme", back_populates="parent")
    product_children = relationship("Product", back_populates="parent")
    

    def __init__(self, id, title, desc, likes, date, price, products, comments):
        self.id = id
        self.title = title
        self.likes = likes
        self.desc = desc
        self.price = price
        self.date = date
        self.products = products
        self.comments = comments


    def __repr__(self):
        return f"<Outfit {self.name}>"


class Theme(db.Model):
    __tablename__ = 'theme'
    name = db.Column(db.String, primary_key=True)
    outfitid = db.Column(db.String, db.ForeignKey('outfit.id'), primary_key=True)
    parent = relationship("Outfit", back_populates="theme_children")

    def __init__(self, name, outfitid):
        self.name =name
        self.outfitid = outfitid
    
    def __repr__(self):
        return f"<Theme {self.name}>"

class Product(db.Model):
    __tablename__ = 'product'
    part = db.Column(db.String)
    collection = db.Column(db.String)
    designer = db.Column(db.String)
    outfitid = db.Column(db.String, db.ForeignKey('outfit.id'), primary_key=True)
    productid = db.Column(db.String, primary_key=True)
    parent = relationship("Outfit", back_populates="product_children")

    def __init__(self, part, designer, collection, outfitid, productid):
        self.part = part 
        self.designer = designer
        self.collection = collection
        self.outfitid = outfitid
        self.productid = productid
    
    def __repr__(self):
        return f"<Product {self.name}>"




