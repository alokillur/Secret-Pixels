
# Secret Pixels - Text Encryption in Visuals & AI services

Our application improves digital security and communication privacy by utilizing AI services and steganography. The tool secretly and securely embeds sensitive data into digital photographs by using the Least Significant Bit (LSB) technique to encrypt and decode text within images. For people and organizations who need to send sensitive information without arousing suspicion, this capability is perfect.

To better shield users from online dangers, the app also offers strong AI services:

### Image Toxicity Analysis: 
This function promotes a safer online environment by using AI to evaluate picture content for offensive or hazardous content.

### Phishing URL Detection: 
To protect users from harmful assaults, the program analyzes URLs that are inserted into emails or pictures in order to identify any phishing efforts.

### AI Chatbot for Scam Detection: 
With the ability to assess the probability of a message being a scam, our chatbot is sophisticated enough to identify and warn consumers about fraudulent schemes by assigning a scam level score.

## Target Audience
### Private Individuals: 
People who prioritize privacy and need secure methods to communicate sensitive information.
### Businesses and Corporations: 
Companies that handle confidential data and require robust methods to protect against data breaches and cyber threats.
### Security Professionals:
Experts in cybersecurity who need advanced tools to detect and prevent phishing and scams.
### Content Moderators:
Organizations and platforms aiming to ensure that the visual content shared on their platforms is free from toxic or inappropriate material.

## Setup Instructions

### 1. Generate an OpenAI API Key
1. **Log in to OpenAI Platform:**
   - Go to [OpenAI](https://platform.openai.com) and sign in with your account.

2. **Create a New API Key:**
   - Navigate to the "API Keys" section.
   - Click on "Create new secret key".
   - Copy the generated API key immediately as it will not be shown again.

### 2. Download Word2Vec Embedding
1. **Download the Embedding File:**
   - Visit [this Google Drive link](https://drive.google.com/file/d/0B7XkCwpI5KDYNlNUTTlSS21pQmM/edit?resourcekey=0-wjGZdNAUop6WykTtMip30g).
   - Click on the download button to save the file to your local machine.

2. **Move the File to Your Project Directory:**
   - Place the downloaded embedding file in a suitable directory within your project (e.g., `data` or `embeddings`).

### 3. Update `CONSTANTS.py`
1. **Open `CONSTANTS.py`:**
   - Open the `CONSTANTS.py` file in your preferred code editor.

2. **Add the API Key and Embedding Path:**
   - Update the file with the API key and the path to the downloaded embedding file. For example:

```python
CONSTANTS.py

# OpenAI API Key
api_key = "YOUR_GENERATED_API_KEY_HERE"

# Path to Word2Vec Embedding
word2vec = "path/to/your/downloaded/embedding/file.bin"
```

# How to Use Our Application?
## Web Application
 **Navigate to the Application Directory**
   ```sh
   cd myapp/app
   npm install
   npm run dev
   ```
## Flask Application
 **Run the Flask Application**
```sh
   python app.py
```
## Streamlit Application
 **Run Streamlit Application**
 ```sh
    streamlit run chatbot.py
```


