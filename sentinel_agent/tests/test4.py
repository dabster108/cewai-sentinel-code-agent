import subprocess

def ping_host(host: str) -> None:
    # Use the subprocess module with a list of arguments to prevent command injection attacks
    command = ["ping", "-c", "1", host]
    subprocess.run(command)

def list_files(directory: str) -> None:
    # Use the subprocess module with a list of arguments to prevent command injection attacks
    command = ["ls", directory]
    subprocess.run(command)

# Example usage
if __name__ == "__main__":
    host = "example.com"
    ping_host(host)

    directory = "/path/to/directory"
    list_files(directory)
