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
