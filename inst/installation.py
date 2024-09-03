import subprocess

def run_command(command):
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()
    try:
        stdout = stdout.decode('utf-8')
    except UnicodeDecodeError:
        stdout = stdout.decode('latin1')  # veya başka bir kodlama
    try:
        stderr = stderr.decode('utf-8')
    except UnicodeDecodeError:
        stderr = stderr.decode('latin1')  # veya başka bir kodlama
    print("Output:\n", stdout)
    


def run_commands(com):
    command = com
    run_command(command)




def app():
    directory = r'.\client side' 
    command = f"cd {directory} && npm install"

    directory2 = r'.\server side' 
    command2 = f"cd {directory2} && pip install -r requirements.txt"
    run_commands(command)
    run_commands(command2)

