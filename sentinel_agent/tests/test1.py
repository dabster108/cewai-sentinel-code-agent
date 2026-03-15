import sqlite3
import os

# Store sensitive keys and secrets securely using environment variables
API_KEY = os.environ.get("API_KEY")

# Extract the database connection and query execution into separate functions
def connect_to_db():
    conn = sqlite3.connect(os.environ.get("DB_PATH"))
    return conn

def execute_query(conn, query, params):
    cursor = conn.cursor()
    cursor.execute(query, params)
    return cursor

def get_user(username):
    conn = connect_to_db()
    query = "SELECT * FROM users WHERE username = ?"
    cursor = execute_query(conn, query, (username,))
    user = cursor.fetchone()
    conn.close()
    return user

def authenticate(username, password):
    conn = connect_to_db()
    query = "SELECT * FROM users WHERE username = ? AND password = ?"
    cursor = execute_query(conn, query, (username, password))
    user = cursor.fetchone()
    conn.close()
    return user
