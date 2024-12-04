# Bye Bye Bias

[Deployed Link](https://byebyebias.netlify.app/)

##  🌎 Our Mission   
Bye Bye Bias strives to spot and recommend fixes to reduce bias in AI fraud detection models, thus building trust in financial services for everyone. We believe everyone deserves fair access to financial tools, especially underrepresented communities. 

## ⭐️ Our Approach 
With the click of a button, ML engineers can input peer-to-peer transaction datasets onto our platform.

We then
- Detect and provide visualizations to better understand biases 
- Assign a grade from A to F

## 🧱 Setup Local Environment
#### Setup
1. Clone this repository using `git clone https://github.com/byebyebias/byebyebias.git`
2. Run `pip install -r requirements.txt` to install necessary 'backend' packages
3. Enter the frontend folder
4. Download necessary frontend tools through `npm install`
5. Set up a .env file at the root of the project to contain the secret `VITE_API_URL=http://127.0.0.1:8000`

#### Testing
- Backend: Enter backend folder and run `pytest` for test suite and `pytest --cov` for test suite + coverage
- Frontend: Enter frontend folder and run `npm run test`

##  🏃 Running Our Project
1. At the root of the project, `python manage.py runserver`
2. Enter frontend folder and run `npm run dev`
3. Website will now be up and running on your local host.

## 🖥 Tech Stack  
- **Backend:** Django, Python
- **Frontend:** React, TypeScript, nivo
- **Testing:** Jest, pytest
- **Hosting:** Heroku

## 💜 Contributors
**Created by:** [Leilia Ho](https://github.com/aerymist), [Michelle Huang](https://github.com/1michhu1), [Akshata Kulkarni](https://github.com/aakshataa), [Chloe Lee](https://github.com/chloehylee), [Dhairya Thakkar](https://github.com/dhairya-t), [Helen Zhao](https://github.com/1zhaohel)

Thank you to the University of Toronto's Focus in Technology Leadership teaching assistants and professors, as well as CashApp for making this all possible!

## 📄 License 
This project is licensed under the MIT License. 
