import os
import sqlite3

# Store database password securely using environment variable
DB_PASSWORD = os.environ.get('DB_PASSWORD')

# Establish a connection to the database
conn = sqlite3.connect('database.db')
cursor = conn.cursor()

def get_user(username):
    # Use parameterized query to prevent SQL injection
    query = "SELECT * FROM users WHERE username = ?"
    cursor.execute(query, (username,))
    return cursor.fetchone()

def delete_user(user_id):
    # Use parameterized query to prevent SQL injection
    sql = "DELETE FROM users WHERE id = ?"
    cursor.execute(sql, (user_id,))
    conn.commit()

# Example usage:
username = "admin"
user_id = 1
get_user(username)
delete_user(user_id)

# Close the database connection
conn.close()
