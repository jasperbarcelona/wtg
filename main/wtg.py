from flask import url_for, request, session, redirect, jsonify, Response, make_response, current_app
from jinja2 import environment, FileSystemLoader
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy.ext.orderinglist import ordering_list
from sqlalchemy import Boolean
from sqlalchemy import or_
from flask.ext import admin
from flask.ext.admin.contrib import sqla
from flask.ext.admin.contrib.sqla import ModelView
from flask.ext.admin import Admin, BaseView, expose
from dateutil.parser import parse as parse_date
from flask import render_template, request
from flask import session, redirect
from datetime import timedelta
from datetime import datetime
from functools import wraps, update_wrapper
import threading
from threading import Timer
from multiprocessing.pool import ThreadPool
import calendar
from calendar import Calendar
from time import sleep
import requests
import datetime
from datetime import date
import time
import json
import uuid
import random
import string
import smtplib
from email.mime.text import MIMEText as text
import os
import schedule
from werkzeug.utils import secure_filename
import db_conn
from db_conn import db, app
from werkzeug.security import generate_password_hash, check_password_hash
from models import *

IPP_URL = 'https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/%s/requests'
UPLOAD_FOLDER = 'static/receipts'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

class BubbleAdmin(sqla.ModelView):
    column_display_pk = True

admin = Admin(app, name='Wasg It')
admin.add_view(BubbleAdmin(User, db.session))
admin.add_view(BubbleAdmin(Destination, db.session))
admin.add_view(BubbleAdmin(Rating, db.session))
admin.add_view(BubbleAdmin(Review, db.session))

# admin.add_view(BubbleAdmin(Service, db.session))

def nocache(view):
    @wraps(view)
    def no_cache(*args, **kwargs):
        response = make_response(view(*args, **kwargs))
        response.headers['Last-Modified'] = datetime.datetime.now()
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '-1'
        return response    
    return update_wrapper(no_cache, view)


@app.route('/',methods=['GET','POST'])
@nocache
def index():
    if not session:
        return redirect('/login')

    return flask.render_template('index.html')


@app.route('/login',methods=['GET','POST'])
@nocache
def user_login():
    if session:
        return redirect('/')
    return flask.render_template('login.html')


@app.route('/signup',methods=['GET','POST'])
@nocache
def user_signup_page():
    return flask.render_template('signup.html')


@app.route('/login/template',methods=['GET','POST'])
@nocache
def login_page():
    return flask.render_template('login_template.html')


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.clear()
    return redirect('/login')


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    data = flask.requests.form.to_dict()
    new_user = User(
        name=data['name'],
        email=data['email'],
        msisdn=data['msisdn'],
        password=data['password']
        )
    db.session.add(new_user)
    db.session.commit()
    
    return flask.render_template('svc.html',msisdn=data['msisdn'])


@app.route('/db/rebuild',methods=['GET','POST'])
def rebuild_database():
    db.drop_all()
    db.create_all()

    return jsonify(
        status='success',
        message='Database rebuilt successfully'
        ),201


if __name__ == '__main__':
    app.run(port=5000,debug=True,host='0.0.0.0')
    # port=int(os.environ['PORT']), host='0.0.0.0'