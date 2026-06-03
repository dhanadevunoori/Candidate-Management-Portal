# HyreAI - Candidate Management Portal

A full-stack web application to manage candidates built with React, Node.js, Express, and MongoDB.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Auth:** JWT

## Prerequisites

- Node.js >= 16
- MongoDB (local or Atlas)
- Git

## Setup Instructions

### 1. Clone the Repository
git clone <your-repo-url>
cd candidate-portal

### 2. Backend Setup
cd backend
npm install
# Create .env file with:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/candidateportal
# JWT_SECRET=hyreai_super_secret_key_2024
npm start

### 3. Frontend Setup (new terminal)
cd frontend
npm install
npm start

## Login Credentials
- Email: admin@hyreai.com
- Password: Admin123

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | Admin login |
| GET | /api/candidates | Get all candidates |
| GET | /api/candidates/:id | Get candidate by ID |
| POST | /api/candidates | Add candidate |
| PUT | /api/candidates/:id | Update candidate |
| DELETE | /api/candidates/:id | Delete candidate |