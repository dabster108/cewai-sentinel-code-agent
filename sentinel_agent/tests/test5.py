import json
import os

# Store sensitive keys and secrets securely using environment variables
API_SECRET = os.environ.get("API_SECRET")

def load_transactions(filename):
    # Validate the JSON data before deserializing it
    with open(filename, "r") as f:
        data = json.load(f)
        if not isinstance(data, list):
            raise ValueError("Invalid JSON data")
        return data

class PaymentProcessor:
    def __init__(self):
        self.balance = 0

    def process_payment(self, user_id, amount, card_number):
        # Extract the payment processing logic into a separate function
        self.charge_card(user_id, amount, card_number)
        # Extract the data storage logic into a separate function
        self.store_transaction(user_id, amount)

    def charge_card(self, user_id, amount, card_number):
        # Charge the card using the API secret
        # This function should be implemented securely using a payment gateway
        pass

    def store_transaction(self, user_id, amount):
        # Store the transaction data securely
        # This function should be implemented using a secure data storage approach
        pass
