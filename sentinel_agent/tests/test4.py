import os
import subprocess

def ping_host(host):
    command = "ping -c 1 " + host
    os.system(command)


def list_files(directory):
    subprocess.run("ls " + directory, shell=True)


if __name__ == "__main__":
    target = input("Enter host: ")
    ping_host(target)