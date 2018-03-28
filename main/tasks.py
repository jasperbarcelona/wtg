from celery import Celery
import db_conn
from db_conn import db
from models import *
import requests
import uuid
from cStringIO import StringIO
from dateutil.parser import parse as parse_date
import datetime
import time
from time import sleep
from flask import jsonify
import random
import string
import xlrd

app = Celery('tasks', broker='amqp://admin:password@rabbitmq/birdhouse')

IPP_URL = 'https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/%s/requests'

@app.task
def send_notification(client_no,status,waybill_no,msisdn):
    client = Client.query.filter_by(client_no=client_no).first()

    notification = Notification(
        client_no=client_no,
        waybill_no=waybill_no,
        notification_type=status,
        msisdn=msisdn
        )
    db.session.add(notification)
    db.session.commit()

    if status == 'Received':
        message = 'We have received your package, we will notify you once it has been shipped. Your reference number is %s.' % waybill_no

    message_options = {
        'app_id': client.app_id,
        'app_secret': client.app_secret,
        'message': message,
        'address': notification.msisdn,
        'passphrase': client.passphrase,
    }

    try:
        r = requests.post(IPP_URL%client.shortcode,message_options)           
        if r.status_code == 201:
            notification.status = 'success'
            notification.timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S:%f')
        else:
            notification.status = 'failed'
            notification.timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S:%f')

        db.session.commit()

    except requests.exceptions.ConnectionError as e:
        notification.status = 'failed'
        notification.timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S:%f')
        db.session.commit()

    return