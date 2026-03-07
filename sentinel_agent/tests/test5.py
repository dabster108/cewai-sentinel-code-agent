import json

def load_data(file_path: str) -> dict:
    """Loads data from a file using JSON."""
    with open(file_path, "r") as f:
        data = json.load(f)
    return data

# Example usage:
# data = load_data("example_file.json")
