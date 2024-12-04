# Bye Bye Bias

[Deployed Link](https://byebyebias.netlify.app/)

##  Table of Contents  
- [Our Mission](#our-mission)
- [Our Approach](#our-mission)
- [Setup Local Environment](#our-mission)
  - [Setup](#setup)
  - [Testing](#testing)
- [Running Our Project](#running-our-project)
- [Tech Stack](#tech-stack)
- [Authors and Contributors](#authors-and-contributors)
- [License](#license)


![UI](https://github.com/user-attachments/assets/91d3b6d5-fa1a-4718-9da4-9805b9b51b53)

##  Our Mission   
Bye Bye Bias is an application that identifies and visualizes biases within peer-to-peer transactions datasets, in order to tackle the issue of bias in AI fraud detection models. We believe in CashApp's mission to provide fair and equal access to financial services, especially underrepresented communities, and this application aims to identify biases in datasets and convey them in a clear and informative manner that enables a cycle of efficient dataset cleaning. 

## Our Approach 
ML engineers can upload their peer-to-peer transaction datasets onto our platform, via local file upload or S3 bucket link, then select which protected attributes they wish to analyze.

The application then:
- Detects and displays visualizations to better understand biases according to the protected attribute(s)
- Assigns a grade from A to F based the results of the four fairness metrics

## Setup Local Environment
#### Setup
1. Clone this repository using `git clone https://github.com/byebyebias/byebyebias.git`
2. Run `pip install -r requirements.txt` to install necessary 'backend' packages
3. Enter the frontend folder
4. Download necessary frontend tools through `npm install`
5. Set up a .env file at the root of the project to contain the secret `VITE_API_URL=http://127.0.0.1:8000`

#### Testing
- Backend: From root, run `DJANGO_SETTINGS_MODULE=backend.setup.settings pytest --cov=backend --cov-report=html`
- Frontend: Enter frontend folder and run `npm run test`

##  Running Our Project (Locally)
1. At the root of the project, `python manage.py runserver`
2. Enter frontend folder and run `npm run dev`
3. Website will now be up and running on your local host.

## Tech Stack  
- **Backend:** Django, Python
- **Frontend:** React, TypeScript, Nivo, Material UI
- **Testing:** Jest, pytest
- **Hosting:** Heroku, Netlify

## Authors and Contributors
**Created by:** [Leilia Ho](https://github.com/aerymist), [Michelle Huang](https://github.com/1michhu1), [Akshata Kulkarni](https://github.com/aakshataa), [Chloe Lee](https://github.com/chloehylee), [Dhairya Thakkar](https://github.com/dhairya-t), [Helen Zhao](https://github.com/1zhaohel)

Thank you to the University of Toronto's Focus in Technology Leadership teaching assistants and professors, as well as CashApp for making this all possible!

## License 
This project uses AI Fairness 360 [(AIF360)](https://github.com/Trusted-AI/AIF360), an open-source library developed by IBM for detecting and mitigating bias in machine learning models. AIF360 is distributed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

