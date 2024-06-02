import CONSTANTS
import openai
import numpy as np
from flask import Flask, render_template, request, make_response
from encrypt import lsb_encrypter
from decrypt import lbs_decrypter
from collections import defaultdict
from gensim.models import KeyedVectors

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


@app.route('/checkImage', methods = ['POST','GET'])
def checkImage():
    if request.method == 'POST':
        image_file = request.files['image']
        if image_file:
            openai.api_key = CONSTANTS.api_key
            decrypted_message = lbs_decrypter(image_file)
            response_text = make_response(decrypted_message)
            response = openai.Completion.create(
                engine="gpt-3.5-turbo-instruct",
                prompt=f"**Threat Score: [Enter Threat Score Here]**\n\nDescription: \"{decrypted_message}\"\n\n",
                max_tokens=200
            )
            word2cev_model_path = CONSTANTS.word2vec
            word2vec_model = KeyedVectors.load_word2vec_format(word2cev_model_path, binary=True, limit=200000)
            def categorize_text(description, word2vec_model):
                categories = ['Malware', 'Exploits', 'Phishing', 'Denial of Service (DoS) Attacks', 'Insider Threats', 'Safe']
                category_scores = defaultdict(float)
                words_in_model = [word for word in description.split() if word in word2vec_model]
                if words_in_model:
                    input_vectors = [word2vec_model[word] for word in words_in_model]
                    input_vector = np.mean(input_vectors, axis=0)
                    for category in categories:
                        category_vector = np.mean([word2vec_model[word] for word in category.split() if word in word2vec_model], axis=0)
                        similarity = np.dot(input_vector, category_vector) / (np.linalg.norm(input_vector) * np.linalg.norm(category_vector))
                        category_scores[category] = similarity
                return max(category_scores, key=category_scores.get)
            
            result = categorize_text(decrypted_message, word2vec_model)
            response_text = response.choices[0].text.strip()
            formatted_result = f"**{result}**:\n{response_text}"
            return formatted_result

    return render_template('checkImage.html', message=None)
    

if __name__ == '__main__':
    app.run(debug=True)
