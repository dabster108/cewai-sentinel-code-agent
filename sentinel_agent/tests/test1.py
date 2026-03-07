import os
import sqlite3
from typing import List

DB_PASSWORD = os.environ["DB_PASSWORD"]
DB_USER = os.environ["DB_USER"]
DB_HOST = os.environ["DB_HOST"]
DB_NAME = os.environ["DB_NAME"]

def connect_db() -> sqlite3.Connection:
    """Establishes a connection to the database."""
    return sqlite3.connect(DB_NAME)

def get_user(username: str) -> List:
    """Retrieves a user from the database by username."""
    conn = connect_db()
    cursor = conn.cursor()
    query = "SELECT * FROM users WHERE username = ?"
    cursor.execute(query, (username,))
    user = cursor.fetchone()
    conn.close()
    return user

def delete_user(user_id: int) -> None:
    """Deletes a user from the database by user ID."""
    conn = connect_db()
    cursor = conn.cursor()
    sql = "DELETE FROM users WHERE id = ?"
    cursor.execute(sql, (user_id,))
    conn.commit()
    conn.close()

# Example usage:
# user = get_user("example_username")
# delete_user(123)
