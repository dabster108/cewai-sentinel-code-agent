import subprocess

def ping_host(host):
    # Use subprocess module to prevent command injection
    subprocess.run(["ping", "-c", "1", host])

def list_files(directory):
    # Use subprocess module to prevent command injection
    subprocess.run(["ls", directory])

# Example usage:
host = "example.com"
directory = "/var/data"
ping_host(host)
list_files(directory)
