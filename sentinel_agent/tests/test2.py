import os

# Define the base directory
BASE_DIR = os.environ.get("BASE_DIR")

def read_file(filename):
    # Validate the filename parameter
    if not filename.startswith("allowed_directory/"):
        raise ValueError("Invalid filename")
    path = os.path.join(BASE_DIR, filename)
    with open(path, "r") as f:
        return f.read()

def delete_file(filename):
    # Validate the filename parameter
    if not filename.startswith("allowed_directory/"):
        raise ValueError("Invalid filename")
    path = os.path.join(BASE_DIR, filename)
    os.remove(path)
