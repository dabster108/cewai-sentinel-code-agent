import subprocess

def ping_host(host: str) -> None:
    """Pings a host to check its availability."""
    subprocess.run(["ping", "-c", "1", host])

def list_files(directory: str) -> None:
    """Lists the files in a directory."""
    subprocess.run(["ls", directory])

# Example usage:
# ping_host("example_host")
# list_files("/var/data")
