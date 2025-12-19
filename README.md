Job Application Portal – Backend API
A RESTful backend API built using Node.js and Express.js that allows candidates to register, log in, upload resumes, apply for jobs, and view their submitted applications.

Objective:

Develop a simple RESTful API using Node.js that allows candidates to:

Register and log in securely

Upload resumes

Apply for job listings (with sample jobs)

View their submitted job applications

Technology Stack :

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Authentication: JWT (JSON Web Tokens)

File Uploads: Multer

Deployment: Render



✨ Core Features
🔐 User Authentication

User registration with password hashing (bcrypt)

Secure login with JWT-based authentication

Protected routes using authentication middleware

📄 Resume Upload

Resume upload using Multer

File type validation (PDF, DOC, DOCX)

Unique filenames to avoid conflicts

💼 Job Applications

Fetch available job listings

Apply to a job with resume upload

View logged-in user’s job applications

Populated job details in application response

📂 Project Structure

job-application-portal-backend/
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   │   └── resumes/
│
├── server.js
├── package.json
├── README.md
├── .env.example
└── .gitignore

⚙️ Setup & Installation (Local)

1️⃣ Clone the repository

git clone https://github.com/your-username/job-application-portal-backend.git
cd job-application-portal-backend

2️⃣ Install dependencies
npm install

3️⃣ Configure environment variables
Create a .env file using .env.example:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4️⃣ Start the server
node server.js


Server will run at:

http://localhost:5000

🔗 API Endpoints Documentation
🔐 Authentication
Register User

POST /api/auth/register

Request Body:

{
  "name": "Test User",
  "email": "test@gmail.com",
  "password": "password123"
}


Response:

{
  "message": "User registered successfully",
  "user": {
    "id": "userId",
    "name": "Test User",
    "email": "test@gmail.com"
  }
}

Login User

POST /api/auth/login

Request Body:

{
  "email": "test@gmail.com",
  "password": "password123"
}

Response:

{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}

💼 Jobs
Get All Jobs
GET /api/jobs
Response:

{
  "count": 2,
  "jobs": [
    {
      "title": "Backend Developer",
      "company": "Tech Corp",
      "location": "Remote"
    }
  ]
}



📄 Job Applications
Apply to Job (Protected)

POST /api/applications/apply/:jobId

Headers:
Authorization: Bearer <JWT_TOKEN>


Body (form-data):
Key	      Type	Value 		
resume    File  PDF/DOC

Response:

{
  "message": "Job applied successfully"
}

View My Applications (Protected)

GET /api/applications/my-application

Headers:

Authorization: Bearer <JWT_TOKEN>


Response:

{
  "count": 1,
  "applications": [
    {
      "job": {
        "title": "Backend Developer",
        "company": "Tech Corp",
        "location": "Remote"
      }
    }
  ]
}


📮 Postman Collection

A Postman collection is included to test all API endpoints:

Authentication
Job listing
Job application
View applications

You can import the collection and test the APIs easily.

🚀 Deployment
The application is deployed on Render.

🌐 Live API URL
https://job-portal-bfz5.onrender.com


⚠️ Important Notes
Uploaded resume files are stored locally for demonstration purposes.
In a production environment, cloud storage services like AWS S3 or Cloudinary should be used.
Render provides a temporary filesystem; uploaded files may reset on redeploy.

🧪 Testing
All endpoints were tested using Postman
Authentication, protected routes, file uploads, and database operations were verified

👤 Author
Bhavya Asari
Backend Developer | Node.js | Express | MongoDB