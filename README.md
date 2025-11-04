# 🗒️ User Notes App (NoSQL Digital Assignment - VIT Vellore)

### 📚 Subject: NoSQL Databases

### 💻 Name: Siddhant Singh | Reg. No: 22BCE3522

### 🏫 Course Code: BCSE406L

---

## 🚀 Overview

This is a simple **User Notes App** built using **Node.js**, **Express.js**, and **MongoDB (NoSQL)** for the Digital Assignment.  
It demonstrates CRUD operations on a **Document Database**

Each user can sign up, log in, and create personalized notes with customizable colors and color labels.

---

## ✨ Features

✅ User Authentication (Signup & Login)  
✅ Create, Edit, and Delete Notes  
✅ Choose Color from Predefined Palette  
✅ Label Each Color (e.g. “Work”, “Personal”, “Urgent”)  
✅ Search Notes by Content  
✅ Sort Notes (Latest, Oldest, A–Z, Z–A)  
✅ Responsive Card Layout (No Overlapping)  
✅ MongoDB Document Modeling with Mongoose  
✅ Timestamps (createdAt, updatedAt)

---

## 🧩 Tech Stack

| Layer           | Technology                        |
| --------------- | --------------------------------- |
| **Frontend**    | HTML, CSS, JavaScript (Fetch API) |
| **Backend**     | Node.js, Express.js               |
| **Database**    | MongoDB Atlas / Local MongoDB     |
| **ORM**         | Mongoose                          |
| **Environment** | dotenv                            |
| **Deployment**  | Render / Localhost                |

---

## 🌐 API Endpoints

All routes are prefixed with `/api`.

| Method     | Endpoint           | Description                          |
| ---------- | ------------------ | ------------------------------------ |
| **POST**   | `/api/signup`      | Create a new user                    |
| **POST**   | `/api/login`       | Authenticate user                    |
| **GET**    | `/api/notes/:user` | Get all notes for a user             |
| **POST**   | `/api/notes`       | Add a new note                       |
| **PUT**    | `/api/notes/:id`   | Update note content, color, or label |
| **DELETE** | `/api/notes/:id`   | Delete a note                        |

---

## 🪄 How to Run Locally

Follow these steps to set up and run the app locally 👇

---

### 1️⃣ Clone the Repository

git clone https://github.com/<yourusername>/nosql-da.git
cd nosql-da

### 2️⃣ Install Dependencies

npm install

### 3️⃣ Create .env File

inside project root, using Mongodb Atlas, add this

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/notesapp
PORT=5000

### 4️⃣ Start the Server

npm start

# or (if using nodemon)

npm run dev

# or

node server.js

### 5️⃣ Open in Browser

http://localhost:5000/login.html
