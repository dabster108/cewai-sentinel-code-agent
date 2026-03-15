import subprocess
import shutil

def run_backup(folder):
    """ creates a backup of the given folder
    :param folder: the path to the folder
    :return: True if successful, False otherwise
    """
    # Use a more secure way to execute shell commands
    try:
        cmd = ["tar", "-czf", "backup.tar.gz", folder]
        subprocess.run(cmd, check=True)
        return True
    except subprocess.CalledProcessError as e:
        print(e)
        return False

def check_disk():
    """ checks the disk usage
    :return: True if successful, False otherwise
    """
    # Use a more secure way to execute system commands
    try:
        cmd = ["df", "-h"]
        subprocess.run(cmd, check=True)
        return True
    except subprocess.CalledProcessError as e:
        print(e)
        return False

def list_processes():
    """ lists the running processes
    :return: True if successful, False otherwise
    """
    # Use a more secure way to execute system commands
    try:
        cmd = ["ps", "aux"]
        subprocess.run(cmd, check=True)
        return True
    except subprocess.CalledProcessError as e:
        print(e)
        return False

# Example usage:
if __name__ == '__main__':
    print("Running backup:")
    backup = run_backup("/path/to/folder")
    print(backup)
    print("Checking disk usage:")
    disk = check_disk()
    print(disk)
    print("Listing processes:")
    processes = list_processes()
    print(processes)
