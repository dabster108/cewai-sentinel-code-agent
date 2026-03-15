import os

# Define base directory
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# Read file using absolute path
def read_file(filename):
    path = os.path.join(BASE_DIR, filename)
    if os.path.exists(path):
        with open(path, 'r') as file:
            return file.read()
    else:
        return None

# Delete file using absolute path
def delete_file(filename):
    path = os.path.join(BASE_DIR, filename)
    if os.path.exists(path):
        os.remove(path)
    else:
        pass
