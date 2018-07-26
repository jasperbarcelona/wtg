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

IPP_URL = 'https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/%s/requests'

class BubbleAdmin(sqla.ModelView):
    column_display_pk = True

admin = Admin(app, name='bubble')
admin.add_view(BubbleAdmin(Client, db.session))
admin.add_view(BubbleAdmin(AdminUser, db.session))
admin.add_view(BubbleAdmin(Transaction, db.session))
admin.add_view(BubbleAdmin(TransactionItem, db.session))
admin.add_view(BubbleAdmin(Service, db.session))
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

    user = AdminUser.query.filter_by(client_no=session['client_no'],id=session['user_id']).first()

    if user.active_sort == 'Alphabetical':
        transactions = Transaction.query.filter(Transaction.client_no==session['client_no'], Transaction.status!='Finished').order_by(Transaction.customer_name).all()
    else:
        transactions = Transaction.query.filter(Transaction.client_no==session['client_no'], Transaction.status!='Finished').order_by(Transaction.created_at.desc()).all()
    total_entries = Transaction.query.filter(Transaction.client_no==session['client_no'], Transaction.status!='Finished').count()

    services = Service.query.filter_by(client_no=session['client_no']).order_by(Service.name).all()

    return flask.render_template(
        'index.html',
        client_name=session['client_name'],
        transactions=transactions,
        total_entries=total_entries,
        services=services,
        user=user
        )


@app.route('/transactions',methods=['GET','POST'])
def transactions():
    user = AdminUser.query.filter_by(client_no=session['client_no'],id=session['user_id']).first()

    if user.active_sort == 'Alphabetical':
        transactions = Transaction.query.filter(Transaction.client_no==session['client_no'], Transaction.status!='Finished').order_by(Transaction.customer_name).all()
    else:
        transactions = Transaction.query.filter(Transaction.client_no==session['client_no'], Transaction.status!='Finished').order_by(Transaction.created_at.desc()).all()            
    total_entries = Transaction.query.filter(Transaction.client_no==session['client_no'], Transaction.status!='Finished').count()

    return jsonify(
        template = flask.render_template(
            'transactions.html',
            transactions = transactions,
            total_entries=total_entries,
            user=user
            )
        )


@app.route('/transaction',methods=['GET','POST'])
def open_transaction():
    transaction_id = flask.request.form.get('transaction_id')
    transaction = Transaction.query.filter_by(client_no=session['client_no'],id=transaction_id).first()
    transaction_items = TransactionItem.query.filter_by(transaction_id=transaction.id).all()

    return jsonify(
        body_template=flask.render_template(
            'transaction_info.html',
            transaction=transaction,
            transaction_items=transaction_items
            ),
        total=transaction.total
        )


@app.route('/transaction/process',methods=['GET','POST'])
def process_transaction():
    transaction_id = flask.request.form.get('transaction_id')
    transaction = Transaction.query.filter_by(client_no=session['client_no'],id=transaction_id).first()
    client = Client.query.filter_by(client_no=session['client_no']).first()

    message = 'Hi, %s! Your laundry is now being processed. You will receive another message when it\'s ready for pickup/delivery. Thank you.' % transaction.customer_name

    message_options = {
        'app_id': client.app_id,
        'app_secret': client.app_secret,
        'message': message,
        'address': transaction.customer_msisdn,
        'passphrase': client.passphrase,
    }

    try:
        r = requests.post(IPP_URL%client.shortcode,message_options)           
        if r.status_code == 201:
            transaction.status = 'Processing'
            transaction.process_date = datetime.datetime.now().strftime('%B %d, %Y')
            transaction.process_time = time.strftime("%I:%M%p")
            db.session.commit()
            return jsonify(
                status = 'success',
                template = flask.render_template('action_btn.html',entry=transaction)
                )
        else:
            return jsonify(
                status = 'failed',
                message = 'There was an error. Please try again.'
                )

    except requests.exceptions.ConnectionError as e:
        return jsonify(
            status = 'failed',
            message = 'There was an error. Please try again.'
            )


@app.route('/transaction/done',methods=['GET','POST'])
def done_transaction():
    transaction_id = flask.request.form.get('transaction_id')
    transaction = Transaction.query.filter_by(client_no=session['client_no'],id=transaction_id).first()
    client = Client.query.filter_by(client_no=session['client_no']).first()
    
    message = 'Hi, %s! Your laundry is now ready for pick up/delivery. Thank you.' % transaction.customer_name

    message_options = {
        'app_id': client.app_id,
        'app_secret': client.app_secret,
        'message': message,
        'address': transaction.customer_msisdn,
        'passphrase': client.passphrase,
    }

    try:
        r = requests.post(IPP_URL%client.shortcode,message_options)           
        if r.status_code == 201:
            transaction.status = 'Done'
            transaction.done_date = datetime.datetime.now().strftime('%B %d, %Y')
            transaction.done_time = time.strftime("%I:%M%p")
            db.session.commit()
            return jsonify(
                status = 'success',
                template = flask.render_template('action_btn.html',entry=transaction)
                )
        else:
            return jsonify(
                status = 'failed',
                message = 'There was an error. Please try again.'
                )

    except requests.exceptions.ConnectionError as e:
        return jsonify(
            status = 'failed',
            message = 'There was an error. Please try again.'
            )

    return jsonify(
        status = 'success',
        template = flask.render_template('action_btn.html',entry=transaction)
        )


@app.route('/transaction/pickup',methods=['GET','POST'])
def pickup_transaction():
    transaction_id = flask.request.form.get('transaction_id')
    transaction = Transaction.query.filter_by(client_no=session['client_no'],id=transaction_id).first()
    client = Client.query.filter_by(client_no=session['client_no']).first()

    message = 'Hi, %s! Your laundry has already been picked up/delivered. Thank you.' % transaction.customer_name

    message_options = {
        'app_id': client.app_id,
        'app_secret': client.app_secret,
        'message': message,
        'address': transaction.customer_msisdn,
        'passphrase': client.passphrase,
    }

    try:
        r = requests.post(IPP_URL%client.shortcode,message_options)           
        if r.status_code == 201:
            transaction.status = 'Finished'
            transaction.pickup_date = datetime.datetime.now().strftime('%B %d, %Y')
            transaction.pickup_time = time.strftime("%I:%M%p")
            db.session.commit()
            return jsonify(
                status = 'success'
                )
        else:
            return jsonify(
                status = 'failed',
                message = 'There was an error. Please try again.'
                )

    except requests.exceptions.ConnectionError as e:
        return jsonify(
            status = 'failed',
            message = 'There was an error. Please try again.'
            )

    return jsonify(
        status = 'success'
        )


@app.route('/transaction/save',methods=['GET','POST'])
def save_transaction():
    data = flask.request.form.to_dict()

    transaction = Transaction(
        client_no=session['client_no'],
        date=datetime.datetime.now().strftime('%B %d, %Y'),
        time=time.strftime("%I:%M%p"),
        status='Pending',
        cashier_id=session['user_id'],
        cashier_name=session['user_name'].title(),
        customer_name=data['customer_name'].title(),
        customer_msisdn=data['customer_msisdn'],
        total=data['total'],
        notes=data['notes'],
        created_at=datetime.datetime.now().strftime('%Y-%m`-%d %H:%M:%S:%f')
        )

    db.session.add(transaction)
    db.session.commit()

    services = Service.query.filter_by(client_no=session['client_no']).all()
    for service in services:
        quantity = data[str(service.id)]
        if quantity != '0' and quantity != '0.0':
            price = float(quantity) * float(service.price)
            transaction_item = TransactionItem(
                client_no=session['client_no'],
                transaction_id=transaction.id,
                service_id=service.id,
                service_name=service.name,
                quantity=str(quantity),
                price=service.price,
                total='{0:.2f}'.format(price)
                )
            db.session.add(transaction_item)
            db.session.commit()

    user = AdminUser.query.filter_by(client_no=session['client_no'],id=session['user_id']).first()

    if user.active_sort == 'Alphabetical':
        transactions = Transaction.query.filter(Transaction.client_no==session['client_no'], Transaction.status!='Finished').order_by(Transaction.customer_name).all()
    else:
        transactions = Transaction.query.filter(Transaction.client_no==session['client_no'], Transaction.status!='Finished').order_by(Transaction.created_at.desc()).all()            
    total_entries = Transaction.query.filter(Transaction.client_no==session['client_no'], Transaction.status!='Finished').count()

    return jsonify(
        template = flask.render_template(
            'transactions.html',
            transactions = transactions,
            total_entries=total_entries,
            user=user
            )
        )


@app.route('/history',methods=['GET','POST'])
def history():
    transactions = Transaction.query.filter(Transaction.client_no==session['client_no'], Transaction.status=='Finished').order_by(Transaction.created_at.desc()).all()
    total_entries = Transaction.query.filter(Transaction.client_no==session['client_no'], Transaction.status=='Finished').count()

    total = '{0:.2f}'.format(sum(float(transaction.total) for transaction in transactions))

    return jsonify(
        template = flask.render_template(
            'history.html',
            transactions = transactions,
            total_entries = total_entries,
            total = total
            )
        )


@app.route('/login',methods=['GET','POST'])
@nocache
def user_login():
    if session:
        return redirect('/')
    return flask.render_template('login.html')


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.clear()
    return redirect('/login')


@app.route('/states',methods=['GET','POST'])
def states():
    transactions = Transaction.query.all()
    customers = []
    for entry in transactions:
        customers.append(entry.customer_name)
    return jsonify(
        customers = customers
        )


@app.route('/user/authenticate',methods=['GET','POST'])
def authenticate_user():
    data = flask.request.form.to_dict()
    user = AdminUser.query.filter_by(email=data['user_email'],password=data['user_password']).first()
    if not user or user == None:
        return jsonify(status='failed', error='Invalid email or password.')
    client = Client.query.filter_by(client_no=user.client_no).first()
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
        name='Wash App',
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
        active_sort='Alphabetical',
        join_date=datetime.datetime.now().strftime('%B %d, %Y'),
        created_at=datetime.datetime.now().strftime('%Y-%m`-%d %H:%M:%S:%f')
        )

    transaction = Transaction(
        client_no='bubble',
        date=datetime.datetime.now().strftime('%B %d, %Y'),
        time=time.strftime("%I:%M%p"),
        status='Pending',
        cashier_id=1,
        cashier_name='Jasper Barcelona',
        customer_name='Vhing Barcelona',
        customer_msisdn='09176214704',
        total='4000.00',
        notes='Sample notes.',
        created_at=datetime.datetime.now().strftime('%Y-%m`-%d %H:%M:%S:%f')
        )

    transaction1 = Transaction(
        client_no='bubble',
        date=datetime.datetime.now().strftime('%B %d, %Y'),
        time=time.strftime("%I:%M%p"),
        status='Processing',
        cashier_id=1,
        cashier_name='Jasper Barcelona',
        customer_name='Leanza Etorma',
        customer_msisdn='09176214704',
        total='4000.00',
        created_at=datetime.datetime.now().strftime('%Y-%m`-%d %H:%M:%S:%f')
        )
    transaction2 = Transaction(
        client_no='bubble',
        date=datetime.datetime.now().strftime('%B %d, %Y'),
        time=time.strftime("%I:%M%p"),
        status='Processing',
        cashier_id=1,
        cashier_name='Jasper Barcelona',
        customer_name='Tobie Delos Reyes',
        customer_msisdn='09176214704',
        total='4000.00',
        created_at=datetime.datetime.now().strftime('%Y-%m`-%d %H:%M:%S:%f')
        )
    transaction3 = Transaction(
        client_no='bubble',
        date=datetime.datetime.now().strftime('%B %d, %Y'),
        time=time.strftime("%I:%M%p"),
        status='Pending',
        cashier_id=1,
        cashier_name='Jasper Barcelona',
        customer_name='Janno Armamento',
        customer_msisdn='09176214704',
        total='4000.00',
        created_at=datetime.datetime.now().strftime('%Y-%m`-%d %H:%M:%S:%f')
        )

    service = Service(
        client_no='bubble',
        name='Wash & Dry',
        price='100.00'
        )

    service1 = Service(
        client_no='bubble',
        name='Fabric Conditioner',
        price='15.00'
        )

    service2 = Service(
        client_no='bubble',
        name='Fold',
        price='20.00'
        )

    transaction_item = TransactionItem(
        client_no='bubble',
        transaction_id=1,
        service_id=1,
        service_name='Wash & Dry',
        quantity='1',
        price='100',
        total='100'
        )

    db.session.add(client)
    db.session.add(user)
    db.session.add(transaction)
    db.session.add(transaction1)
    db.session.add(transaction2)
    db.session.add(transaction3)
    db.session.add(service)
    db.session.add(service1)
    db.session.add(service2)
    db.session.add(transaction_item)
    db.session.commit()

    return jsonify(
        status='success',
        message='Database rebuilt successfully'
        ),201


if __name__ == '__main__':
    app.run(port=5000,debug=True,host='0.0.0.0')
    # port=int(os.environ['PORT']), host='0.0.0.0'