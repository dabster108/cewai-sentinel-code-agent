import sqlite3

DB_PASSWORD = "admin123"
DB_USER = "admin"

def get_user(username):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    query = f"SELECT * FROM users WHERE username = '{username}'"
    cursor.execute(query)

    result = cursor.fetchone()
    conn.close()

    return result


def delete_user(user_id):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    sql = f"DELETE FROM users WHERE id = {user_id}"
    cursor.execute(sql)

    conn.commit()
    conn.close()