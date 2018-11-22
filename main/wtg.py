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
APP_ID='EGXMuB5eEgCMLTKxExieqkCGeGeGuBon'
APP_SECRET='f3e1ab30e23ea7a58105f058318785ae236378d1d9ebac58fe8b42e1e239e1c3'
PASSPHRASE='24BUubukMQ'
SHORTCODE='21588479'

UPLOAD_FOLDER = 'static/receipts'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

class BubbleAdmin(sqla.ModelView):
    column_display_pk = True

admin = Admin(app, name='App Name')
admin.add_view(BubbleAdmin(User, db.session))
admin.add_view(BubbleAdmin(SVC, db.session))
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

def generate_svc():
    unique = False
    while unique == False:
        new_token = str(uuid.uuid4().fields[-1])[:6]
        existing = SVC.query.filter_by(token=new_token).first()
        if not existing or existing == None:
            unique = True
    return new_token


@app.route('/',methods=['GET','POST'])
@nocache
def index():
    if not session or 'user_id' not in session:
        return redirect('/login')
    user = User.query.filter_by(id=session['user_id']).first()
    destinations = Destination.query.order_by(Destination.name)
    return flask.render_template(
        'index.html',
        user=user,
        destinations=destinations
        )


@app.route('/login',methods=['GET','POST'])
@nocache
def user_login():
    if session and 'user_id' in session:
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


@app.route('/user/signup', methods=['GET', 'POST'])
def signup():
    data = flask.request.form.to_dict()
    new_user = User(
        name=data['name'].title(),
        email=data['email'],
        msisdn=data['msisdn'],
        password=generate_password_hash(data['password'])
        )
    db.session.add(new_user)
    db.session.commit()

    svc = SVC(
        user_id=new_user.id,
        token=generate_svc(),
        created_at=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S:%f')
        )
    db.session.add(svc)
    db.session.commit()

    session['svc_verification_email'] = data['email']

    message_options = {
        'app_id': APP_ID,
        'app_secret': APP_SECRET,
        'message': 'Verification number: %s' % svc.token,
        'address': new_user.msisdn,
        'passphrase': PASSPHRASE,
    }

    r = requests.post(IPP_URL%SHORTCODE,message_options)           
    
    return flask.render_template('svc.html',msisdn=data['msisdn'])


@app.route('/svc/verify', methods=['GET', 'POST'])
def verify_svc():
    token = flask.request.form.get('svc')
    user = User.query.filter_by(email=session['svc_verification_email']).first()
    existing = SVC.query.filter_by(token=token, user_id=user.id).first()

    if not existing or existing == None:
        return jsonify(status='failed')

    user.status = 'active'
    db.session.delete(existing)
    db.session.commit()

    session['user_name'] = user.name
    session['user_id'] = user.id

    return jsonify(status='success')


@app.route('/user/authenticate',methods=['GET','POST'])
def authenticate_user():
    data = flask.request.form.to_dict()
    user = User.query.filter_by(email=data['user_email']).first()
    if not user or user == None:
        return jsonify(status='failed', error='Invalid username.')
    if check_password_hash(user.password, data['user_password']) == False:
        return jsonify(status='failed', error='Invalid password.')

    session['user_name'] = user.name
    session['user_id'] = user.id
    return jsonify(status='success', error=''),200


@app.route('/db/rebuild',methods=['GET','POST'])
def rebuild_database():
    db.drop_all()
    db.create_all()

    user = User(
        name='Jasper Barcelona',
        email='jasper@pisara.tech',
        msisdn='09176214704',
        password=generate_password_hash('ratmaxi8'),
        status='active',
        img='../static/images/users/default.png',
        active_sort='top',
        )

    destination = Destination(
        name='Kuwebang Lampas',
        description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        address='This is a sample address.',
        city='Pagbilao',
        map_link='Sample map link',
        rating_avg='4.0',
        rating_count=100,
        review_count=32,
        added_by_id=1,
        added_by_name='Super Admin',
        img='../static/images/destinations/kuwebang_lampas.jpg',
        created_at=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S:%f')
        )

    destination1 = Destination(
        name='Kamay ni Hesus',
        description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        address='This is a sample address.',
        city='Lucban',
        map_link='Sample map link',
        rating_avg='4.2',
        rating_count=140,
        review_count=194,
        added_by_id=1,
        added_by_name='Super Admin',
        img='../static/images/destinations/kamay_ni_hesus.jpg',
        created_at=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S:%f')
        )

    destination2 = Destination(
        name='Puting Buhangin',
        description='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        address='This is a sample address.',
        city='Pagbilao',
        map_link='Sample map link',
        rating_avg='3.5',
        rating_count=130,
        review_count=42,
        added_by_id=1,
        added_by_name='Super Admin',
        img='../static/images/destinations/puting_buhangin.jpg',
        created_at=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S:%f')
        )

    db.session.add(user)
    db.session.add(destination)
    db.session.add(destination1)
    db.session.add(destination2)
    db.session.commit()

    return jsonify(
        status='success',
        message='Database rebuilt successfully'
        ),201


if __name__ == '__main__':
    app.run(port=5000,debug=True,host='0.0.0.0')
    # port=int(os.environ['PORT']), host='0.0.0.0'