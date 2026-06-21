# 🧑‍💼 Candidate Management Portal

A full-stack MERN web application for managing job candidates — JWT-secured admin login, full CRUD, real-time dashboard stats, route guards, and persistent session recovery.

> **Stack:** React 19 (Create React App) · Node.js · Express 5 · MongoDB · Mongoose · JWT · Tailwind CSS
>
> Co-built collaboratively. See [My Contributions](#-my-contributions) for the parts I personally designed and implemented.

---

## 🔑 Demo Credentials

| Field | Value |
|---|---|
| Email | `admin@hyreai.com` |
| Password | `Admin123` |

> ⚠️ **Current auth status:** This demo login is currently a single hardcoded credential pair checked directly in the backend route — it is **not** yet hashed with bcrypt or backed by a database user record. This is a known, deliberate scope decision (see [Future Improvements](#-possible-future-improvements)) made to prioritize the candidate pipeline and route-guarding logic first. `bcryptjs` is present in `node_modules` as a transitive dependency of other packages but is not currently invoked by the application's own auth code.

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
| MongoDB | Atlas / local | Database (candidate records only — admin credentials are not yet DB-backed) |
| Mongoose | ^9.6.3 | ODM & schema validation |
| jsonwebtoken | ^9.0.3 | JWT sign & verify (8h expiry) |
| dotenv | ^17.4.2 | Environment config |
| cors | ^2.8.6 | Cross-origin requests |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | ^19.2.7 | UI framework |
| Create React App (react-scripts) | 5.0.1 | Build tooling — **note:** this project uses CRA, not Vite |
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
│   │   ├── auth.js            # POST /api/auth/login — hardcoded credential check, see note above
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
| `POST` | `/api/auth/login` | ❌ | Admin login — returns JWT (8h). Checks credentials against a hardcoded pair in source. |
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

- [ ] Implement bcrypt password hashing for admin credentials, backed by a real `Admin`/`User` collection instead of a hardcoded pair in source
- [ ] Resume / CV file upload per candidate
- [ ] Pagination for large candidate lists
- [ ] Export candidates to CSV / Excel
- [ ] Email notification on status change
- [ ] Role-based access (HR, Manager, Admin)

---

## 👩‍💻 My Contributions

This project was built collaboratively. Here's what I ([@dhanadevunoori](https://github.com/dhanadevunoori)) specifically designed and implemented:

- **JWT Authentication Flow** — Login logic, 8-hour token issuance, `AuthContext` persistence, and Axios request/response interceptors
- **Route Guarding** — `PrivateRoute` and `PublicRoute` components with automatic redirect on 401
- **Candidate CRUD** — Backend routes and Mongoose schema for the candidate pipeline (Applied → Shortlisted → Rejected)
- **Search & Filter UI** — Dashboard search-by-name/email and status filtering
- **Modal Components** — `CandidateModal` (add/edit with validation), `ViewModal`, and `DeleteModal`
- **Toast Notifications** — Integrated `react-hot-toast` for real-time CRUD feedback

> Collaborated with a co-developer on initial project scaffolding and shared backend setup.

---

## 👩‍💻 Author

**Dhanalaxmi Devunoori**
📧 dhanadevunoori@gmail.com · 📍 Hyderabad · Hybrid / Remote

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/dhanadevunoori-b295a9293)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/dhanadevunoori)
