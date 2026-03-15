import requests
import os

# Use environment variable for API secret
API_SECRET = os.environ.get('API_SECRET')

# Refund using secure API call
def refund(payload):
    headers = {
        'Authorization': f'Bearer {API_SECRET}',
        'Content-Type': 'application/json'
    }
    r = requests.post("https://api.payment.com/refund", headers=headers, json=payload)
    return r.json()

# Remove unused balance attribute
class PaymentProcessor:
    def __init__(self):
        pass

    def process_payment(self, amount):
        # Process payment logic here
        pass
