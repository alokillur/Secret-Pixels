import openai
import requests
import CONSTANTS

api_key = CONSTANTS.api_key

def checkSite(website):
   if website == "":
       return "Please Enter the website Name!"
   else :
       openai.api_key = api_key
       response = openai.Completion.create(
           engine = "gpt-3.5-turbo-instruct",
           prompt = f"Is {website} a fake website?, if so, then give the correct url else return it's legit and safe to use",
           max_tokens = 200
       ) 
       return response.choices[0].text.strip()