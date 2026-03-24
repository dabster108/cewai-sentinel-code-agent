import os
import requests
import json

# Store API secrets securely using environment variables
API_SECRET = os.environ.get('API_SECRET')

def process_payment(user_id, amount, card_number):
    """ processes a payment
    :param user_id: the ID of the user
    :param amount: the amount to be paid
    :param card_number: the card number
    :return: True if successful, False otherwise
    """
    # Use a secure way to send API requests
    try:
        payload = {
            "user": user_id,
            "amount": amount,
            "card": card_number
        }
        response = requests.post("https://api.payment.com/charge", json=payload, auth=(os.environ.get('API_KEY'), API_SECRET))
        response.raise_for_status()
        return True
    except requests.RequestException as e:
        print(e)
        return False

def refund(user_id, amount):
    """ refunds a payment
    :param user_id: the ID of the user
    :param amount: the amount to be refunded
    :return: True if successful, False otherwise
    """
    # Validate the refund request and use a secure way to send API requests
    try:
        payload = {
            "user": user_id,
            "amount": amount
        }
        response = requests.post("https://api.payment.com/refund", json=payload, auth=(os.environ.get('API_KEY'), API_SECRET))
        response.raise_for_status()
        return True
    except requests.RequestException as e:
        print(e)
        return False

def load_transactions(filename):
    """ loads transactions from a JSON file
    :param filename: the name of the file
    :return: the transactions
    """
    # Validate the JSON file and use a secure way to load JSON data
    try:
        with open(filename, "r") as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        print(e)
        return None

# Example usage:
if __name__ == '__main__':
    print("Processing payment:")
    payment = process_payment("test_user", 10.0, "1234567890")
    print(payment)
    print("Refunding payment:")
    refund_payment = refund("test_user", 10.0)
    print(refund_payment)
    print("Loading transactions:")
    transactions = load_transactions("transactions.json")
    print(transactions)
