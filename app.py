import CONSTANTS
import openai
import numpy as np
from flask import Flask, render_template, request, make_response
from encrypt import lsb_encrypter
from decrypt import lbs_decrypter
from checkImage import checkImageContent

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/encrypt', methods=['POST', 'GET'])
def encrypt():
    if request.method == 'POST':
        text_to_hide = request.form['text']
        image_file = request.files['image']
        if image_file:
            image_filename = image_file.filename
            steg_image_file = "hidden_" + image_filename
            steg_image_data = lsb_encrypter(text_to_hide, image_file, steg_image_file)
            
            response = make_response(steg_image_data)
            response.headers.set('Content-Type', 'image/jpeg')
            response.headers.set('Content-Disposition', 'attachment', filename=steg_image_file)
            
            return response
    return render_template('encrypt.html', message=None)

@app.route('/decrypt', methods=['POST', 'GET'])
def decrypt():
    if request.method == 'POST':
        image_file = request.files['image']
        if image_file:
            decrypted_message = lbs_decrypter(image_file)
            response = make_response(decrypted_message)
            return response
    return render_template('decrypt.html', message=None)

@app.route('/checkImage', methods=['POST', 'GET'])
def checkImage():
    if request.method == 'POST':
        image_file = request.files['image']
        if image_file:
            response = checkImageContent(image_file)
        return response
    return render_template('checkImage.html', message=None)

if __name__ == '__main__':
    app.run(debug=True)
