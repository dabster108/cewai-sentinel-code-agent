#### test1.py

```python
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
```

#### test2.py

```python
import os
import requests

def get_weather(city: str) -> dict:
    """
    Retrieves the weather data for the provided city.

    Args:
    city (str): The city to retrieve weather data for.

    Returns:
    dict: A dictionary containing the weather data for the provided city.
    """
    try:
        # Retrieve the API key from the environment variables
        API_KEY = os.environ.get("API_KEY")

        # Construct the API request URL
        url = f"https://api.example.com/weather?q={city}&appid={API_KEY}"

        # Enable SSL/TLS certificate verification for the API request
        response = requests.get(url, verify=True)

        # Raise an exception for bad status codes
        response.raise_for_status()

        # Return the JSON response
        return response.json()

    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

# Example usage:
city = "New York"
weather_data = get_weather(city)
print(weather_data)
```
