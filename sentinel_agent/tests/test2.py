import os
import logging

# Set up logging configuration
logging.basicConfig(filename='log_file.log', level=logging.INFO)

def read_file(filename):
    # Validate and sanitize user-inputted file path
    path = os.path.join("/var/data", filename)
    if not path.startswith("/var/data/"):
        raise ValueError("Invalid file path")
    try:
        with open(path, 'r') as f:
            return f.read()
    except FileNotFoundError:
        logging.info(f"File {filename} not found")
        return None

def write_log(message):
    # Validate and sanitize user-inputted log message
    # For simplicity, this example does not perform any validation
    # but in a real-world application, you should implement proper validation
    logging.info(message)

# Example usage:
filename = "example.txt"
message = "This is a log message"
read_file(filename)
write_log(message)
