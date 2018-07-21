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
from tasks import send_notification
import db_conn
from db_conn import db, app
from models import *

class BubbleAdmin(sqla.ModelView):
    column_display_pk = True

admin = Admin(app, name='bubble')
admin.add_view(BubbleAdmin(Client, db.session))
admin.add_view(BubbleAdmin(Transaction, db.session))
admin.add_view(BubbleAdmin(AdminUser, db.session))
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
    return flask.render_template(
        'index.html',
        client_name=session['client_name']
        )


@app.route('/login',methods=['GET','POST'])
@nocache
def user_login():
    if session:
        return redirect('/')
    return flask.render_template('login.html')


@app.route('/user/authenticate',methods=['GET','POST'])
def authenticate_user():
    data = flask.request.form.to_dict()
    client = Client.query.filter_by(client_no=data['client_no']).first()
    if not client or client == None:
        return jsonify(status='failed', error='Invalid client ID.')
    user = AdminUser.query.filter_by(email=data['user_email'],password=data['user_password']).first()
    if not user or user == None:
        return jsonify(status='failed', error='Invalid email or password.')
    if user.client_no != client.client_no:
        return jsonify(status='failed', error='Not authorized.')
    session['user_name'] = user.name
    session['user_id'] = user.id
    session['client_no'] = client.client_no
    session['client_name'] = client.name
    return jsonify(status='success', error=''),200


@app.route('/db/rebuild',methods=['GET','POST'])
def rebuild_database():
    db.drop_all()
    db.create_all()

    client = Client(
        client_no='bubble',
        name='Wash & Rinse',
        app_id='EGXMuB5eEgCMLTKxExieqkCGeGeGuBon',
        app_secret='f3e1ab30e23ea7a58105f058318785ae236378d1d9ebac58fe8b42e1e239e1c3',
        passphrase='24BUubukMQ',
        shortcode='21588479',
        created_at=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S:%f')
        )

    user = AdminUser(
        client_no='bubble',
        email='jasper@pisara.tech',
        password='ratmaxi8',
        name='Jasper Barcelona',
        role='Administrator',
        join_date=datetime.datetime.now().strftime('%B %d, %Y'),
        created_at=datetime.datetime.now().strftime('%Y-%m`-%d %H:%M:%S:%f')
        )

    transaction = Transaction(
        client_no='bubble',
        date=datetime.datetime.now().strftime('%B %d, %Y'),
        time=time.strftime("%I:%M%p"),
        cashier_id=1,
        transaction_type='Top Up',
        cashier_name='Jasper Barcelona',
        customer_id_no='2011334281',
        customer_name='',
        customer_msisdn='09176214704',
        total='4000.00',
        created_at=datetime.datetime.now().strftime('%Y-%m`-%d %H:%M:%S:%f')
        )

    db.session.add(client)
    db.session.add(user)
    db.session.add(transaction)
    db.session.commit()

    return jsonify(
        status='success',
        message='Database rebuilt successfully'
        ),201


if __name__ == '__main__':
    app.run(port=5000,debug=True,host='0.0.0.0')
    # port=int(os.environ['PORT']), host='0.0.0.0'