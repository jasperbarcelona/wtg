import flask
from flask import request
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy.ext.orderinglist import ordering_list
from sqlalchemy import Boolean
from db_conn import db, app
import json

class Serializer(object):
  __public__ = None

  def to_serializable_dict(self):
    dict = {}
    for public_key in self.__public__:
      value = getattr(self, public_key)
      if value:
        dict[public_key] = value
    return dict

class SWEncoder(json.JSONEncoder):
  def default(self, obj):
    if isinstance(obj, Serializer):
      return obj.to_serializable_dict()
    if isinstance(obj, (datetime)):
      return obj.isoformat()
    return json.JSONEncoder.default(self, obj)

def SWJsonify(*args, **kwargs):
  return app.response_class(json.dumps(dict(*args, **kwargs), cls=SWEncoder, 
         indent=None if request.is_xhr else 2), mimetype='application/json')
        # from https://github.com/mitsuhiko/flask/blob/master/flask/helpers.py

class User(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    msisdn = db.Column(db.String(20))
    password = db.Column(db.Text())
    status = db.Column(db.String(20),default='inactive')
    active_sort = db.Column(db.String(30),default='top_rated')
    img = db.Column(db.Text())

class SVC(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer())
    token = db.Column(db.String(10))
    created_at = db.Column(db.String(50))

class Destination(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.Text())
    address = db.Column(db.Text())
    city = db.Column(db.String(100))
    map_link = db.Column(db.Text())
    rating_avg = db.Column(db.String(10))
    rating_count = db.Column(db.Integer())
    review_count = db.Column(db.Integer())
    added_by_id = db.Column(db.Integer())
    added_by_name = db.Column(db.String(100))
    upcoming_events = db.Column(db.Text(),default='')
    img = db.Column(db.Text())
    created_at = db.Column(db.String(50))

class Rating(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    destination_id = db.Column(db.Integer())
    user_id = db.Column(db.Integer())
    rating = db.Column(db.Integer())
    created_at = db.Column(db.String(50))

class Review(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    destination_id = db.Column(db.Integer())
    user_id = db.Column(db.Integer())
    review = db.Column(db.Text())
    created_at = db.Column(db.String(50))