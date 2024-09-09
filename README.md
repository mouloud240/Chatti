# Chatti

Chatti is a simple chat application built using **Node.js**, **Express**, **MongoDB**, and **Socket.io**. This project is intended for **educational purposes only** and is not meant to be a production-ready application. The primary goal of Chatti is to help developers understand the basics of building real-time chat applications with authentication.

---

## Features
- User Authentication (JWT-based)
- Real-time messaging using Socket.io
- Basic input validation using express-validator
- Password hashing using bcrypt
- MongoDB for storing user data

---

## Disclaimer
This project is **NOT** intended to be a fully functional or production-ready chat application. The purpose of Chatti is to demonstrate how real-time communication and authentication can be implemented in a simple web application.

**DO NOT** use this project as-is for any production or public-facing use cases. There are several areas, including security and scalability, that are not sufficiently handled in this project for it to be deployed for practical use.

---

## Prerequisites

Before cloning and setting up this project, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (Local or MongoDB Atlas)
- **npm** (comes with Node.js)

---

## Getting Started

### 1. Clone the Repository

To clone the project, run the following command in your terminal:

```bash
git clone https://github.com/mouloud240/chatti.git
cd chatti/backend
npm install
cd chatti/frontend
npm install
```
2. Set Up Environment Variables
 ```
MONGO_URI=<your_mongo_uri>
```
3. Run MongoDB
If you're running MongoDB locally, make sure your MongoDB server is running. For MongoDB Atlas, ensure you've set up a cluster and use the proper MongoDB URI in your .env file.
4. Run the Application
 ```
cd backend
npm start
cd ../frontend
npm run dev
```
and acces the the website on the adress prompted on nextjs terminal usin browser eg :localhost:<port>
