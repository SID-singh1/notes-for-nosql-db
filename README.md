# 🗒️ User Notes App (NoSQL Digital Assignment - VIT Vellore)

### 📚 Subject: NoSQL Databases  
### 💻 Student: [Your Name] | Reg. No: [Your Reg. No]  
### 🏫 Course Code: [If given in syllabus]

---

## 🚀 Overview
This is a simple **User Notes App** built using **Node.js**, **Express.js**, and **MongoDB (NoSQL)** for the Digital Assignment.  
It demonstrates CRUD operations on a **Document Database**, fulfilling the outcomes of **Module 3 & 4**.

---

## ✨ Features
- ➕ Add a new note for any user  
- ✏️ Edit existing notes  
- 🗑️ Delete notes  
- 🔍 View all notes for a specific user  
- 🌐 Fully dynamic per user (user-specific data retrieval)

---

## 🧩 Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas (Document Database)  
- **Frontend:** HTML, JavaScript (Fetch API)  
- **Deployment:** Render  

---

## ⚙️ API Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/add` | Add a new note |
| `GET` | `/notes/:user` | Get all notes for a user |
| `PUT` | `/update/:id` | Edit an existing note |
| `DELETE` | `/delete/:id` | Delete a note |

---

## 🧠 Modules Covered
- Module 3: Document Databases  
- Module 4: Designing Document Databases  
  - CRUD Operations  
  - Data Modeling  
  - Querying and Aggregation  

---

## 🪄 How to Run Locally
```bash
git clone https://github.com/<yourusername>/nosql-da.git
cd nosql-da
npm install
node server.js
