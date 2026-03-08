import json

def load_data(file_path: str) -> object:
    # Use a safer deserialization method, such as JSON
    try:
        with open(file_path, "r") as f:
            data = json.load(f)
            return data
    except FileNotFoundError:
        return None

# Example usage
if __name__ == "__main__":
    file_path = "example_data.json"
    data = load_data(file_path)
    print(data)
