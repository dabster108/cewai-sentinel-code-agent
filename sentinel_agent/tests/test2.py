import os
import shutil

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def read_file(filename):
    """ reads a file from the BASE_DIR
    :param filename: the name of the file
    :return: the content of the file
    """
    # Validate and sanitize the filename parameter to prevent path traversal attacks
    if not filename:
        return None
    if ".." in filename:
        raise ValueError("Invalid filename")
    path = os.path.join(BASE_DIR, filename)
    if not os.path.isfile(path):
        return None
    try:
        with open(path, "r") as f:
            return f.read()
    except FileNotFoundError:
        return None

def delete_file(filename):
    """ deletes a file from the BASE_DIR
    :param filename: the name of the file
    :return: True if successful, False otherwise
    """
    # Validate and sanitize the filename parameter to prevent path traversal attacks
    if not filename:
        return False
    if ".." in filename:
        raise ValueError("Invalid filename")
    path = os.path.join(BASE_DIR, filename)
    if not os.path.isfile(path):
        return False
    try:
        shutil.rmtree(path) if os.path.isdir(path) else os.remove(path)
        return True
    except Exception as e:
        print(e)
        return False

# Example usage:
if __name__ == '__main__':
    print("Reading file:")
    content = read_file("test.txt")
    print(content)
    print("Deleting file:")
    deleted = delete_file("test.txt")
    print(deleted)
