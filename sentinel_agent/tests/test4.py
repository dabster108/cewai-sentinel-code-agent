import subprocess
import os

def run_backup(folder):
    # Validate the folder parameter
    if not os.path.exists(folder):
        raise ValueError("Invalid folder")
    cmd = ["tar", "-czf", "backup.tar.gz", folder]
    subprocess.run(cmd)

def check_disk():
    # Use the subprocess module to execute the command
    cmd = ["df", "-h"]
    subprocess.run(cmd)

def list_processes():
    # Use the subprocess module to execute the command
    cmd = ["ps", "aux"]
    subprocess.run(cmd)
