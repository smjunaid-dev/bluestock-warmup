🚀 Bluestock Warm-Up Backend Assignment

A backend project implementing authentication, PostgreSQL CRUD operations and secure API access.

📌 Features

✔ User registration
✔ Login with JWT authentication
✔ Protected routes
✔ Save or update company profile
✔ Fetch company profile
✔ Environment-based config

🏗 Tech Stack

Node.js

Express.js

PostgreSQL

JWT

bcrypt

dotenv

Thunder Client / Postman

📂 Folder Structure
backend/
 ├── src/
 │   ├── config/
 │   ├── controllers/
 │   ├── middleware/
 │   ├── routes/
 │   └── server.js
 ├── README.md
 └── .gitignore

⚙️ Setup Instructions
1️⃣ Install Dependencies
npm install

2️⃣ Create .env File
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=JUNAID@1209
DB_NAME=company_db
JWT_SECRET=mysecretkey


📌 Do not commit .env.

3️⃣ Start Server
npm run dev


Runs on:
👉 http://localhost:5000

🔐 API Routes Summary
✳ Register

POST /api/auth/register

✳ Login

POST /api/auth/login
✔ Returns JWT token

✳ Save/Update Company Profile

POST /api/company/save

Header:

Authorization: Bearer <token>

✳ Get Company Profile

GET /api/company/me

Header:

Authorization: Bearer <token>

📸 Testing Proof

You can add screenshots in:

/screenshots/


Example:

![Register API](./screenshots/register.png)
![Login API](./screenshots/login.png)

🙌 Submitted For

Bluestock Fintech SWE Warm-Up Assignment
Developed by Junaid
