## This is the team Medicly Backend Repo for StartHack 2021 Microsoft Challenge.

[Frontend Repo Link](https://github.com/AdilRaza02/Medicly-Frontend)

## Technologies:

Express, Node.js, Azure Appservice, Azure Formvalidator

## Requirements:

Node (12.8 +)
Formvalidator API Key

## Local Deployment:

    npm install

    npx nodemon index.js

## Rest Point:

**POST** /analyse

**Supported Media Types:**
multipart/form-data (.jpg)

**Body:**
source : file (.jpg only supported)

**Response**
Supported Media Types : application/json
**Request Response**
200 Response
The request was fulfilled.
Output: JSON

500 Response
Internal Server Error
Output message: Something went wrong

## Tested on images similar to this:

![Sample 1](https://i.imgur.com/s22OXTs.jpg)

## Other sample images links:

1. https://i.imgur.com/FKvHGBt.jpg
2. https://i.imgur.com/XjNXCin.jpg

## Cloud Demo deployment (till Hackathon):

http://medicly-backend.azurewebsites.net/analyse
