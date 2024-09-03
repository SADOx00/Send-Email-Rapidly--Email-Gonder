from flask import Flask, request, jsonify
from flask_cors import CORS  
import  main
app = Flask(__name__)
CORS(app)
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('username')
    password = data.get('password')
    target_email = data.get('target_email')
    baslik = data.get('baslik')
    icerik = data.get('icerik')
    c = main.send(email,password, target_email,baslik,icerik)
    if  c:
        return jsonify({'status': 'success'})
    return jsonify({'status': 'error {}'.format(c)})

if __name__ == '__main__':
    app.run(debug=True)
