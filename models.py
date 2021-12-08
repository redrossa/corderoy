from sqlalchemy import create_engine, Column, Integer
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from flask_migrate import Migrate
from sqlalchemy.dialects.postgresql import JSON, JSONB
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
    part_children = relationship("Part", back_populates="parent")
    collection_children = relationship("Collection", back_populates="parent")
    desginer_children = relationship("Designer", back_populates="parent")



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

class Part(db.Model):
    __tablename__ = 'part'
    name = db.Column(db.String, primary_key=True)
    outfitid = db.Column(db.String, db.ForeignKey('outfit.id'), primary_key=True)
    parent = relationship("Outfit", back_populates="part_children")

    def __init__(self, name, outfitid):
        self.name =name
        self.outfitid = outfitid
    
    def __repr__(self):
        return f"<Part {self.name}>"


class Collection(db.Model):
    __tablename__ = 'collection'
    name = db.Column(db.String, primary_key=True)
    outfitid = db.Column(db.String, db.ForeignKey('outfit.id'), primary_key=True)
    parent = relationship("Outfit", back_populates="collection_children")


    def __init__(self, name, outfitid):
        self.name = name
        self.outfitid = outfitid
    
    def __repr__(self):
        return f"<Collection {self.name}>"

class Designer(db.Model):
    __tablename__ = 'designer'
    name = db.Column(db.String, primary_key=True)
    outfitid = db.Column(db.String, db.ForeignKey('outfit.id'), primary_key=True)
    parent = relationship("Outfit", back_populates="desginer_children")

    def __init__(self, name, outfitid):
        self.name = name
        self.outfitid = outfitid
    
    def __repr__(self):
        return f"<Designer {self.name}>"