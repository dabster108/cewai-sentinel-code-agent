import sqlite3
import os

# Use environment variable for API key
API_KEY = os.environ.get('API_KEY')

# Connect to the database
def connect_to_db():
    conn = sqlite3.connect(os.environ.get('DB_PATH'))
    return conn

# Get user from database using parameterized query
def get_user(username):
    conn = connect_to_db()
    cursor = conn.cursor()
    query = "SELECT * FROM users WHERE username = ?"
    cursor.execute(query, (username,))
    user = cursor.fetchone()
    conn.close()
    return user

# Authenticate user using parameterized query
def authenticate(username, password):
    conn = connect_to_db()
    cursor = conn.cursor()
    query = "SELECT * FROM users WHERE username = ? AND password = ?"
    cursor.execute(query, (username, password))
    user = cursor.fetchone()
    conn.close()
    return user
