import inst.installation as install
import subprocess

install.app()



def run_command(command, working_directory):
    process = subprocess.Popen(command, shell=True, cwd=working_directory, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    stdout, stderr = process.communicate()
    print(f"Output from {working_directory}:\n", stdout)
    print(f"Error from {working_directory}:\n", stderr)


client_command = "npm start"
server_command = "python send.py"
client_directory = r'.\client side'
server_directory = r'.\server side'


client_process = subprocess.Popen(client_command, shell=True, cwd=client_directory, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
server_process = subprocess.Popen(server_command, shell=True, cwd=server_directory, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)


client_stdout, client_stderr = client_process.communicate()
server_stdout, server_stderr = server_process.communicate()

print(f"Output from {client_directory}:\n", client_stdout)
print(f"Error from {client_directory}:\n", client_stderr)
print(f"Output from {server_directory}:\n", server_stdout)
print(f"Error from {server_directory}:\n", server_stderr)
