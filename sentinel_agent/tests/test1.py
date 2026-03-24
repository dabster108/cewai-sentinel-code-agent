import os
import sqlite3
from sqlite3 import Error

# Store API keys securely using environment variables
API_KEY = os.environ.get('API_KEY')

def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by the db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)

def get_user(conn, username):
    """ query tasks by priority
    :param conn: the Connection object
    :param username
    :return:
    """
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE username=?", (username,))
    rows = cur.fetchall()
    return rows

def authenticate(conn, username, password):
    """ query tasks by priority
    :param conn: the Connection object
    :param username
    :param password
    :return:
    """
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
    rows = cur.fetchall()
    return rows

# Example usage:
if __name__ == '__main__':
    database = "test.db"
    conn = create_connection(database)
    with conn:
        print("Getting user:")
        user = get_user(conn, "test_user")
        print(user)
        print("Authenticating user:")
        auth = authenticate(conn, "test_user", "test_password")
        print(auth)
