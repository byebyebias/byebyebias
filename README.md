# Bye Bye Bias

**Created by:** Leilia Ho, Michelle Huang, Akshata Kulkarni, Chloe Lee, Dhairya Thakkar, Helen Zhao

Thank you to the University of Toronto's Focus in Technology Leadership teaching assistants and professors!


##  🏃 Running Our Project
First, run `pip install -r requirements.txt`.

#### Backend
`cd backend`  
`python manage.py runserver` or `python3 manage.py runserver`

#### Frontend
`cd frontend`  
`npm run dev`  

Frontend is hosted on https://main.d1wqrmdy4z9wpu.amplifyapp.com/

#### Testing
Backend
`cd backend`
`pip install -r requirements.txt` to install required dependencies 
`pytest` would run all the tests with test files following the naming conventions of test_*.py or *_test.py

Frontend
install jest libraries:
`npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event`
`npm install --save-dev @types/jest ts-jest`

run frontend tests with the command 
`cd frontend`
`npm run test`

##  🌎 Our Mission   
Bye Bye Bias strives to spot and recommend fixes to reduce bias in AI fraud detection, building trust in financial services for everyone. We believe everyone deserves fair access to financial tools, especially underserved communities. 

## ⭐️ Our Approach 
With the click of a button, ML engineers can input financial datasets onto our platform!

We then
- Detect and provide visualizations to better understand discrepancies 
- Assign data a grade from A to F

## 🖥 Tech Stack  
- **Backend:** Django 
- **Frontend:** React, nivo
- **Testing:** Jest
- **Hosting:** AWS Beanstalk, AWS Amplify

## 📄 License 
This project is licensed under the MIT License. 
