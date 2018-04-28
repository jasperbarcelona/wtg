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

class Client(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    client_no = db.Column(db.String(32), unique=True)
    name = db.Column(db.String(50))
    app_id = db.Column(db.Text())
    app_secret = db.Column(db.Text())
    passphrase = db.Column(db.Text())
    shortcode = db.Column(db.String(30))
    created_at = db.Column(db.String(50))

class AdminUser(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    client_no = db.Column(db.String(32))
    email = db.Column(db.String(60))
    password = db.Column(db.String(20))
    branch = db.Column(db.String(100))
    name = db.Column(db.String(100))
    role = db.Column(db.String(30))
    status = db.Column(db.String(8), default='Active')
    added_by_id = db.Column(db.Integer)
    added_by_name = db.Column(db.String(100))
    join_date = db.Column(db.String(50))
    created_at = db.Column(db.String(50))

class Package(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    client_no = db.Column(db.String(32))
    waybill_no = db.Column(db.String(60))
    waybill_type = db.Column(db.String(20))
    origin = db.Column(db.String(100))
    destination = db.Column(db.String(100))
    status = db.Column(db.String(30),default='Pending')
    sender = db.Column(db.String(100))
    sender_address = db.Column(db.Text(),default='--')
    sender_msisdn = db.Column(db.String(20))
    recipient = db.Column(db.String(100))
    recipient_address = db.Column(db.Text())
    recipient_msisdn = db.Column(db.String(20))
    date_received = db.Column(db.String(20))
    time_received = db.Column(db.String(20))
    arrival_date = db.Column(db.String(20),default='')
    arrival_time = db.Column(db.String(20),default='')
    departure_date = db.Column(db.String(20),default='')
    departure_time = db.Column(db.String(20),default='')
    payment_date = db.Column(db.String(20),default='--')
    cargo_no = db.Column(db.String(32),default='')
    truck = db.Column(db.String(60),default='')
    total = db.Column(db.String(50), default='0')
    tendered = db.Column(db.String(50), default='')
    change = db.Column(db.String(50), default='0')
    date_created = db.Column(db.String(20))
    time_created = db.Column(db.String(20))
    created_by_id = db.Column(db.Integer())
    created_by = db.Column(db.String(100))
    received_by_id = db.Column(db.Integer(),default=None)
    received_by = db.Column(db.String(100),default='')
    payment_received_by_id = db.Column(db.Integer(),default=None)
    payment_received_by = db.Column(db.String(100),default='--')
    turned_over_by_id = db.Column(db.Integer(),default=None)
    turned_over_by = db.Column(db.String(100),default='--')
    pickup_name = db.Column(db.String(100))
    pickup_date = db.Column(db.String(20))
    pickup_time = db.Column(db.String(20))
    notes = db.Column(db.Text(),default='')
    created_at = db.Column(db.String(50))

class PackageItem(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    client_no = db.Column(db.String(32))
    waybill_id = db.Column(db.Integer())
    waybill_no = db.Column(db.String(32))
    item = db.Column(db.Text())
    quantity = db.Column(db.Integer())
    unit = db.Column(db.String(60))
    price = db.Column(db.String(60))
    created_at = db.Column(db.String(50))

class Notification(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    client_no = db.Column(db.String(32))
    waybill_no = db.Column(db.String(60))
    notification_type = db.Column(db.String(30))
    msisdn = db.Column(db.String(20))
    status = db.Column(db.String(20),default='Pending')
    timestamp = db.Column(db.String(50))

class ArrivalNotification(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    client_no = db.Column(db.String(32))
    batch_id = db.Column(db.Integer())
    cargo_id = db.Column(db.Integer())
    cargo_no = db.Column(db.String(32))
    waybill_no = db.Column(db.String(60))
    notification_type = db.Column(db.String(30))
    recipient_msisdn = db.Column(db.String(20))
    sender_msisdn = db.Column(db.String(20))
    recipient_notification_status = db.Column(db.String(20),default='Pending')
    sender_notification_status = db.Column(db.String(20),default='Pending')
    overall_status = db.Column(db.String(20),default='Pending')
    timestamp = db.Column(db.String(50))

class Cargo(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    client_no = db.Column(db.String(32))
    cargo_no = db.Column(db.String(60))
    truck = db.Column(db.String(60))
    driver = db.Column(db.String(100))
    crew = db.Column(db.Text())
    origin = db.Column(db.String(100))
    destination = db.Column(db.String(100))
    departure_date = db.Column(db.String(20))
    departure_time = db.Column(db.String(20))
    arrival_date = db.Column(db.String(20), default='')
    arrival_time = db.Column(db.String(20), default='')
    load_size = db.Column(db.Integer())
    date_created = db.Column(db.String(20))
    time_created = db.Column(db.String(20))
    created_by_id = db.Column(db.Integer())
    created_by = db.Column(db.String(100))
    received_by_id = db.Column(db.Integer(),default=None)
    received_by = db.Column(db.String(100),default='')
    notes = db.Column(db.Text(),default='')
    created_at = db.Column(db.String(50))

class CargoItem(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    client_no = db.Column(db.String(32))
    cargo_id = db.Column(db.Integer())
    cargo_no = db.Column(db.String(60))
    waybill_no = db.Column(db.String(60))
    item = db.Column(db.Text())
    quantity = db.Column(db.Integer())
    recipient = db.Column(db.String(100))
    unit = db.Column(db.String(60))
    created_at = db.Column(db.String(50))

class ArrivalBatch(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cargo_id = db.Column(db.Integer())
    client_no = db.Column(db.String(32))
    cargo_no = db.Column(db.String(32))
    batch_size = db.Column(db.Integer())
    done = db.Column(db.Integer(),default=0)
    pending = db.Column(db.Integer(),default=0)
    date = db.Column(db.String(20))
    time = db.Column(db.String(10))
    created_at = db.Column(db.String(50))

class ReminderBatch(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_no = db.Column(db.String(32))
    sender_id = db.Column(db.Integer())
    batch_size = db.Column(db.Integer())
    done = db.Column(db.Integer(),default=0)
    pending = db.Column(db.Integer(),default=0)
    failed = db.Column(db.Integer(),default=0)
    sender_name = db.Column(db.String(100))
    date = db.Column(db.String(20))
    time = db.Column(db.String(10))
    file_name = db.Column(db.Text)
    created_at = db.Column(db.String(50))

class Contact(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    batch_id = db.Column(db.String(30),default='N/A')
    client_no = db.Column(db.String(32))
    contact_type = db.Column(db.String(32))
    name = db.Column(db.String(100))
    msisdn = db.Column(db.String(20))
    added_by = db.Column(db.Integer())
    added_by_name = db.Column(db.String(100))
    join_date = db.Column(db.String(50))
    created_at = db.Column(db.String(50))

class OutboundMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    batch_id = db.Column(db.Integer())
    date = db.Column(db.String(20))
    time = db.Column(db.String(10))
    contact_name = db.Column(db.String(100))
    msisdn = db.Column(db.String(30))
    status = db.Column(db.String(30),default='Pending')
    created_at = db.Column(db.String(50))

class ReminderMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    batch_id = db.Column(db.Integer())
    date = db.Column(db.String(20))
    time = db.Column(db.String(10))
    contact_name = db.Column(db.String(100), default='Unknown')
    content = db.Column(db.Text())
    msisdn = db.Column(db.String(30))
    status = db.Column(db.String(30),default='Pending')
    created_at = db.Column(db.String(50))

class Report(db.Model, Serializer):
    id = db.Column(db.Integer,primary_key=True)
    client_no = db.Column(db.String(32))
    name = db.Column(db.String(60))
    report_type = db.Column(db.String(60))
    from_date = db.Column(db.String(30))
    to_date = db.Column(db.String(30))
    generated_by = db.Column(db.String(60))
    generated_by_id = db.Column(db.Integer())
    date = db.Column(db.String(50))
    time = db.Column(db.String(30))
    status = db.Column(db.String(30),default='Pending')
    created_at = db.Column(db.String(50))