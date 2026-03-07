import os

def read_file(filename: str) -> str:
    """Reads the contents of a file."""
    base_dir = "/var/data"
    path = os.path.join(base_dir, filename)
    if os.path.abspath(path).startswith(base_dir):
        with open(path, "r") as f:
            data = f.read()
        return data
    else:
        raise ValueError("Invalid file path")

# Example usage:
# file_contents = read_file("example_file.txt")
