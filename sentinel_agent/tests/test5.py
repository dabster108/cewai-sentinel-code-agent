import pickle

def load_data(file_path):
    with open(file_path, "rb") as f:
        data = pickle.load(f)

    return data


if __name__ == "__main__":
    file = input("Enter file path: ")
    data = load_data(file)
    print(data)