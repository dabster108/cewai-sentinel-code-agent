import os
import sqlite3

# Store sensitive credentials securely using environment variables
DB_PASSWORD = os.environ.get('DB_PASSWORD')
DB_USER = os.environ.get('DB_USER')

def get_user(username: str) -> tuple:
    # Use parameterized queries to prevent SQL injection
    query = "SELECT * FROM users WHERE username = ?"
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute(query, (username,))
    user = cursor.fetchone()
    conn.close()
    return user

def delete_user(user_id: int) -> None:
    # Use parameterized queries to prevent SQL injection
    sql = "DELETE FROM users WHERE id = ?"
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute(sql, (user_id,))
    conn.commit()
    conn.close()

# Example usage
if __name__ == "__main__":
    username = "example_user"
    user = get_user(username)
    print(user)

    user_id = 1
    delete_user(user_id)
