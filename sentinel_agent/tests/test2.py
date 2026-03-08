import os

def read_file(filename):
    base_dir = "/var/data"
    path = os.path.join(base_dir, filename)

    with open(path, "r") as f:
        data = f.read()

    return data


if __name__ == "__main__":
    file = input("Enter file name: ")
    print(read_file(file))