import subprocess

# Run backup using parameterized command
def run_backup(folder):
    cmd = ["tar", "-czf", "backup.tar.gz", folder]
    subprocess.run(cmd)

# Check disk usage using parameterized command
def check_disk():
    cmd = ["df", "-h"]
    subprocess.run(cmd)

# List processes using parameterized command
def list_processes():
    cmd = ["ps", "aux"]
    subprocess.run(cmd)
