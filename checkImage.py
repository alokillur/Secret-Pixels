import CONSTANTS
import openai
import numpy as np
from collections import defaultdict
from gensim.models import KeyedVectors
from decrypt import lbs_decrypter

HEADER_SIZE = 54  
DELIMITER = "$"

def checkImageContent(image_file):
    openai.api_key = CONSTANTS.api_key
    decrypted_message = lbs_decrypter(image_file)
    if decrypted_message == 'No Content!':
        return "No Content!"
            
    response = openai.Completion.create(
        engine="gpt-3.5-turbo-instruct",
        prompt=f"**Threat Score: [Enter Threat Score Here]**\n\nDescription: \"{decrypted_message}\"\n\nPlease check if the given description is harmful or safe to download, with a brief explanation.\n\n",
        max_tokens=200
    )
    response_text = response.choices[0].text.strip()
            
    word2cev_model_path = CONSTANTS.word2vec
    word2vec_model = KeyedVectors.load_word2vec_format(word2cev_model_path, binary=True, limit=200000)
            
    def categorize_text(response, word2vec_model):
        categories = ['Harmful Content', 'Safe Content']
        harmful_keywords = ['delete', 'files', 'os.remove', 'send', 'data', 'requests.post', 'malicious-server']
        category_scores = defaultdict(float)
        response_tokens = response.split()
        input_vector = np.mean([word2vec_model[word] for word in response_tokens if word in word2vec_model], axis=0)
        for category in categories:
            category_vector = np.mean([word2vec_model[word] for word in category.split() if word in word2vec_model], axis=0)
            similarity = np.dot(input_vector, category_vector) / (np.linalg.norm(input_vector) * np.linalg.norm(category_vector))
            category_scores[category] = similarity
        if any(keyword in response_tokens for keyword in harmful_keywords):
            category_scores['Harmful Content'] += 1
        return max(category_scores, key=category_scores.get)
            
    category = categorize_text(response_text, word2vec_model)
    return str(f'The content is categorized as: **{category}** \n Explanation: {response_text}')
