# 🧑‍💼 Candidate Management Portal

A full-stack MERN web application for managing job candidates — JWT-secured admin login, full CRUD, real-time dashboard stats, route guards, and persistent session recovery.

> **Stack:** React 19 · Node.js · Express 5 · MongoDB · Mongoose · JWT · Tailwind CSS

---

## 🔑 Demo Credentials

| Field | Value |
|---|---|
| Email | `admin@hyreai.com` |
| Password | `Admin123` |

---

## ✨ Features

- 🔐 **JWT Authentication** — Admin login issues an 8-hour token stored in `localStorage`; session survives page refresh via `AuthContext`
- 🛡️ **Route guards** — `PrivateRoute` blocks unauthenticated access to `/dashboard`; `PublicRoute` redirects logged-in users away from `/login`
- 🔄 **Auto 401 redirect** — Axios response interceptor globally catches expired/invalid tokens and redirects to `/login`
- 📊 **Live dashboard stats** — Real-time counters for Total, Applied, Shortlisted, and Rejected candidates
- 🔍 **Search & filter** — Search by name or email; filter by status (All / Applied / Shortlisted / Rejected)
- ➕ **Add candidate** — Modal form with client-side validation (name, email regex, skills, experience ≥ 0)
- ✏️ **Edit candidate** — Pre-filled modal for updating existing records
- 👁️ **View candidate** — Read-only detail modal with avatar initial, status badge, and all fields
- 🗑️ **Delete candidate** — Confirmation modal before permanent deletion
- 🔔 **Toast notifications** — Real-time success/error feedback via `react-hot-toast`
- 🎨 **Status badges** — Color-coded: Applied (yellow), Shortlisted (green), Rejected (red)
- ⏳ **Async loading state** — Spinner shown while live API fetch is in-flight

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express.js | ^5.2.1 | REST API server |
| MongoDB | Atlas / local | Database |
| Mongoose | ^9.6.3 | ODM & schema validation |
| jsonwebtoken | ^9.0.3 | JWT sign & verify (8h expiry) |
| dotenv | ^17.4.2 | Environment config |
| cors | ^2.8.6 | Cross-origin requests |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | ^19.2.7 | UI framework |
| React Router DOM | ^7.16.0 | Client-side routing + route guards |
| Axios | ^1.16.1 | HTTP client with request & response interceptors |
| Tailwind CSS | ^3.4.1 | Utility-first styling (devDependency) |
| Lucide React | ^1.17.0 | Icon library |
| react-hot-toast | ^2.6.0 | Toast notifications |

---

## 🏗️ Project Structure

```
Candidate-Management-Portal/
├── backend/
│   ├── middleware/
│   │   └── auth.js            # JWT Bearer token verify — protects all candidate routes
│   ├── models/
│   │   └── Candidate.js       # Mongoose schema with timestamps
│   ├── routes/
│   │   ├── auth.js            # POST /api/auth/login
│   │   └── candidates.js      # GET, POST, PUT, DELETE /api/candidates
│   └── server.js              # Express app + MongoDB connection
│
└── frontend/
    └── src/
        ├── api/
        │   └── axios.js            # Base URL, JWT request interceptor, 401 response interceptor
        ├── context/
        │   └── AuthContext.js      # login/logout + localStorage persistence
        ├── components/
        │   ├── CandidateTable.js   # Table with status badges + View/Edit/Delete icons
        │   ├── CandidateModal.js   # Add/Edit form with client-side validation
        │   ├── ViewModal.js        # Read-only candidate detail modal
        │   └── DeleteModal.js      # Confirmation dialog before deletion
        └── pages/
            ├── Login.js       # Email + password with show/hide toggle
            └── Dashboard.js   # Stats cards + search + filter + candidate table
```

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | ❌ | Admin login — returns JWT (8h) |
| `GET` | `/api/candidates` | ✅ | All candidates, sorted newest first |
| `GET` | `/api/candidates/:id` | ✅ | Single candidate by ID |
| `POST` | `/api/candidates` | ✅ | Add candidate (checks duplicate email) |
| `PUT` | `/api/candidates/:id` | ✅ | Update candidate |
| `DELETE` | `/api/candidates/:id` | ✅ | Delete candidate |

---

## 📦 Data Model

```js
{
  fullName:   String,   // required
  email:      String,   // required, unique, lowercase
  skills:     [String], // required — array or comma-separated string
  experience: Number,   // required, min: 0 (years)
  status:     String,   // "Applied" | "Shortlisted" | "Rejected" (default: "Applied")
  phone:      String,   // optional
  notes:      String,   // optional
  createdAt:  Date,     // auto (timestamps: true)
  updatedAt:  Date      // auto (timestamps: true)
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (Atlas URI or local)

### 1. Clone
```bash
git clone https://github.com/dhanadevunoori/Candidate-Management-Portal.git
cd Candidate-Management-Portal
```

### 2. Backend setup
```bash
cd backend
npm install
```
Create `backend/.env`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```
```bash
node server.js
```

### 3. Frontend setup
```bash
cd frontend
npm install
```
Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```
```bash
npm start
```
App runs at `http://localhost:3000`

---

## 🔮 Possible Future Improvements

- [ ] Implement bcrypt password hashing for admin credentials
- [ ] Resume / CV file upload per candidate
- [ ] Pagination for large candidate lists
- [ ] Export candidates to CSV / Excel
- [ ] Email notification on status change
- [ ] Role-based access (HR, Manager, Admin)

---

## 👩‍💻 Author

**Dhanalaxmi Devunoori**  
📧 dhanadevunoori@gmail.com · 📍 Hyderabad · Hybrid / Remote

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/dhanadevunoori-b295a9293)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/dhanadevunoori)
