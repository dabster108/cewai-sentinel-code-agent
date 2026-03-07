import json

def load_data(filename):
    # Use a safer deserialization format such as JSON
    try:
        with open(filename, 'r') as f:
            data = json.load(f)
            return data
    except FileNotFoundError:
        print(f"File {filename} not found")
        return None
    except json.JSONDecodeError:
        print(f"Failed to deserialize {filename}")
        return None

# Example usage:
filename = "data.json"
data = load_data(filename)
print(data)
