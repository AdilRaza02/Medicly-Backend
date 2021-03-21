## This is the team Medicly Backend Repo for StartHack 2021 Microsoft Challenge.

## Technologies:

Express, Node.js, Azure Appservice, Azure Formvalidator

## Requirements:

Node (12.8 +)
Formvalidator API Key

## Local Deployment:

    npm install

    npx nodemon index.js

## Rest Point:

    POST  /analyse

    Headers:
    Content-Type:  "application/json"
    Ocp-Apim-Subscription-Key: SUBSCRIPTION_KEY

    Body:
    {"source" : image_url}

## Cloud Demo deployment (till Hackathon):

http://medicly-backend.azurewebsites.net/analyse
