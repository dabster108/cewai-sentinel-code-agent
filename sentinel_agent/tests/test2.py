import os

def read_file(filename: str) -> str:
    # Validate and sanitize the filename parameter to prevent path traversal attacks
    base_dir = "/path/to/base/directory"
    path = os.path.join(base_dir, os.path.basename(filename))
    if not path.startswith(base_dir):
        raise ValueError("Invalid file path")
    
    try:
        with open(path, "r") as f:
            data = f.read()
            return data
    except FileNotFoundError:
        return None

# Example usage
if __name__ == "__main__":
    filename = "example_file.txt"
    data = read_file(filename)
    print(data)
