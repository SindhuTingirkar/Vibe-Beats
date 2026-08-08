from api_worker.celery_app import app
import requests

@app.task
def send_email(data):
    print("Sending email:", data)
    return True
