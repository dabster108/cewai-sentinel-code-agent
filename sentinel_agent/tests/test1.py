import re
import sqlite3

def get_user_data(user_input: str) -> list:
    """
    Retrieves user data from the database based on the provided user input.

    Args:
    user_input (str): The user input to search for in the database.

    Returns:
    list: A list of user data matching the provided user input.
    """
    try:
        # Validate and sanitize the user input
        if not re.match("^[a-zA-Z ]+$", user_input):
            raise ValueError("Invalid input")

        # Establish a connection to the database
        conn = sqlite3.connect("database.db")
        cursor = conn.cursor()

        # Specify exact columns to fetch instead of using *
        query = "SELECT id, name, email FROM users WHERE name = ?"
        cursor.execute(query, (user_input,))

        # Fetch the query results
        results = cursor.fetchall()

        # Return the query results
        return results

    except sqlite3.Error as e:
        print(f"Error: {e}")
    finally:
        # Close the database connection
        if 'conn' in locals():
            conn.close()

# Example usage:
user_input = "John Doe"
user_data = get_user_data(user_input)
print(user_data)
