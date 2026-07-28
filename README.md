# JobIo

A full-stack job portal that connects job seekers with recruiters — built on the MERN stack (MongoDB, Express, React, Node.js) with JWT authentication, role-based dashboards, and Cloudinary-powered file uploads.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Redux](https://img.shields.io/badge/State-Redux_Toolkit-764ABC?logo=redux&logoColor=white)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Data Models](#data-models)
- [Getting Started](#getting-started)
- [Roadmap](#roadmap)
- [Author](#author)

## About

JobIo is a two-sided job portal: **job seekers** can search, filter, and apply to jobs, while **recruiters** get a dedicated dashboard to register companies, post openings, and manage applicants — all from one platform, one codebase, two experiences.

The app is split into two independently deployable pieces:

- **`/Frontend`** — a React 19 + Vite single-page app
- **`/Backend`** — a Node.js/Express REST API with MongoDB via Mongoose

## Features

**Job Seekers (Students)**
- Search jobs by keyword (title/description) and filter by location, role/industry, and salary range
- View detailed job postings with company info
- Apply in one click, with duplicate-application prevention
- Track applied jobs and their live status (`pending` / `accepted` / `rejected`)
- Manage profile — bio, skills, resume, and profile photo

**Recruiters**
- Register and manage one or more companies (with logo upload)
- Post new job listings with requirements, salary, experience level, and openings count
- View every job posted from a dedicated admin dashboard
- Review applicants per job and update their application status
- Recruiter-only routes, protected client-side and enforced server-side

**Platform-wide**
- JWT authentication stored in `httpOnly` cookies (not exposed to client-side JS)
- Role-based access control (`student` vs `recruiter`) gating both routes and views
- Passwords hashed with bcrypt before storage
- File uploads (resumes, profile photos, company logos) streamed through Multer and stored on Cloudinary — no local disk storage
- Global state via Redux Toolkit, persisted across page refreshes with Redux Persist
- Responsive UI with Tailwind CSS + shadcn/ui (Radix primitives), Framer Motion transitions, and toast feedback via Sonner

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, React Router v7 |
| State Management | Redux Toolkit, Redux Persist |
| Styling / UI | Tailwind CSS v4, shadcn/ui (Radix UI), Framer Motion, Lucide Icons |
| HTTP Client | Axios |
| Backend | Node.js, Express 5 |
| Database | MongoDB with Mongoose ODM |
| Authentication | JSON Web Tokens (JWT), bcryptjs, httpOnly cookies |
| File Storage | Multer (memory storage) + Cloudinary |
| Dev Tools | ESLint, Nodemon |

## Project Structure

```
jobportal/
├── Backend/
│   ├── controllers/       # Business logic (user, company, job, application)
│   ├── middlewares/       # JWT auth guard, Multer upload config
│   ├── models/            # Mongoose schemas: User, Company, Job, Application
│   ├── router/            # Express route definitions (REST endpoints)
│   ├── utils/             # DB connection, Cloudinary config, datauri helper
│   └── index.js           # App entry point
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── admin/     # Recruiter dashboard (post jobs, manage companies/applicants)
    │   │   ├── auth/      # Login, Signup
    │   │   ├── shared/    # Navbar, Footer
    │   │   └── ui/        # shadcn/ui primitives
    │   ├── hooks/         # Custom data-fetching hooks (jobs, companies, applications)
    │   ├── redux/         # Redux Toolkit slices + persisted store
    │   └── utils/         # API endpoint constants
    └── vite.config.js
```

## API Reference

All endpoints are prefixed with `/api/v1`. Routes marked **Auth** require a valid JWT (sent automatically via cookie).

| Resource | Method | Endpoint | Description | Auth |
|---|---|---|---|---|
| User | POST | `/user/register` | Register a new user (with profile photo upload) | – |
| User | POST | `/user/login` | Log in and receive a JWT cookie | – |
| User | POST | `/user/profile/update` | Update profile, skills, and resume | ✅ |
| User | GET | `/user/logout` | Clear the auth cookie | – |
| Company | POST | `/company/register` | Register a new company | ✅ |
| Company | GET | `/company/get` | Get all companies owned by the logged-in recruiter | ✅ |
| Company | GET | `/company/get/:id` | Get a single company by ID | ✅ |
| Company | PUT | `/company/update/:id` | Update company details and logo | ✅ |
| Job | POST | `/job/post` | Post a new job | ✅ |
| Job | GET | `/job/get` | Get all jobs (supports `?keyword=` search) | ✅ |
| Job | GET | `/job/getadminjobs` | Get all jobs posted by the logged-in recruiter | ✅ |
| Job | GET | `/job/get/:id` | Get a single job with its applications | ✅ |
| Application | GET | `/application/apply/:id` | Apply to a job | ✅ |
| Application | GET | `/application/get` | Get all jobs the current user applied to | ✅ |
| Application | GET | `/application/:id/applicants` | Get all applicants for a job (recruiter view) | ✅ |
| Application | POST | `/application/status/:id/update` | Update an applicant's status | ✅ |

## Data Models

- **User** — `fullName`, `email` (unique), `phoneNumber`, `password` (hashed), `role` (`student` \| `recruiter`), and an embedded `profile` (bio, skills, resume URL, profile photo, linked company)
- **Company** — `name` (unique), `description`, `website`, `location`, `logo`, linked to the recruiter who created it
- **Job** — `title`, `description`, `requirements`, `salary`, `experienceLevel`, `location`, `jobType`, `position` count, linked company and creator, and an array of applications
- **Application** — links a `Job` and an `applicant` (`User`), with a `status` (`pending` \| `accepted` \| `rejected`)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A [MongoDB](https://www.mongodb.com/) database (local instance or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)
- A free [Cloudinary](https://cloudinary.com/) account (for file uploads)

### 1. Clone the repository

```bash
git clone https://github.com/Vamshi73232/JOBIO.git
cd JOBIO
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/` with the following variables:

```env
MONGO_URL=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
cloud_name=your_cloudinary_cloud_name
api_key=your_cloudinary_api_key
api_secret=your_cloudinary_api_secret
```

Start the API server:

```bash
npm run dev
```

The backend runs on `http://localhost:8080`.

### 3. Frontend setup

In a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and is already configured (via CORS) to talk to the backend above.

## Roadmap

A few directions this project could grow in:

- [ ] Pagination and infinite scroll for job listings
- [ ] Server-side request validation (e.g. Zod or Joi) in addition to schema-level checks
- [ ] Automated tests (Jest/Supertest for the API, React Testing Library for components)
- [ ] Email notifications on application status changes
- [ ] Rate limiting on auth routes

## Author

**G. Vamshi Kumar**
GitHub: [@Vamshi73232](https://github.com/Vamshi73232)

---

If you find this project useful, consider giving it a ⭐ on GitHub!
