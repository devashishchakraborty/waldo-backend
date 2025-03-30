# Where's Waldo - Backend

## 📌 About the Project
This is the backend for the **Where's Waldo** game, handling game logic, user interactions, and leaderboard management. The backend is built using **Node.js** and **Express.js**, with a **PostgreSQL** database managed via **Prisma ORM**.

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL with Prisma ORM

## 🚀 Features
- API endpoints for handling game sessions
- Leaderboard system to track player scores
- Database integration using Prisma ORM

## 📂 Project Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/devashishchakraborty/waldo-backend.git
cd waldo-backend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add the following variables:
```
DATABASE_URL=your_postgresql_database_url
```

### 4️⃣ Run Database Migrations
```sh
npx prisma migrate dev --name init
```

### 5️⃣ Start the Server
```sh
npm index.js
```

## 📝 Future Improvements
- Implement real-time game updates using WebSockets
- Enhance security with role-based authentication
- Improve response times with caching (e.g., Redis)

