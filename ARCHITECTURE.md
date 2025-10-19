# 🏗️ Resume System Architecture

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
│                     (React + Vite + Tailwind)                   │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐   │
│  │   Login/    │  │  Dashboard  │  │  Resume Builder     │   │
│  │  Register   │  │             │  │                     │   │
│  │             │  │  - Stats    │  │  - Form Input       │   │
│  │  - Auth     │  │  - Summary  │  │  - Live Preview     │   │
│  │  - JWT      │  │  - Actions  │  │  - AI Generation    │   │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘   │
│         │                │                     │               │
│         └────────────────┴─────────────────────┘               │
│                          │                                     │
│                          │ HTTP/REST (Axios)                   │
└──────────────────────────┼─────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                       API LAYER (Express.js)                    │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Middleware                            │  │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────────┐  │  │
│  │  │   CORS     │→ │   JSON     │→ │  JWT Auth        │  │  │
│  │  │  Enabled   │  │  Parser    │  │  (Protected)     │  │  │
│  │  └────────────┘  └────────────┘  └──────────────────┘  │  │
│  └──────────────────────────┬───────────────────────────────┘  │
│                             │                                   │
│  ┌──────────────────────────┴───────────────────────────────┐  │
│  │                      Routes                              │  │
│  │  ┌─────────────────┐     ┌──────────────────────────┐   │  │
│  │  │  Auth Routes    │     │  Resume Routes           │   │  │
│  │  │  /api/auth/     │     │  /api/                   │   │  │
│  │  │  - register     │     │  - generate-summary      │   │  │
│  │  │  - login        │     │  - save-resume           │   │  │
│  │  │  - me           │     │  - resume/:userId        │   │  │
│  │  └────────┬────────┘     └──────────┬───────────────┘   │  │
│  └───────────┼──────────────────────────┼───────────────────┘  │
│              │                          │                       │
│  ┌───────────┼──────────────────────────┼───────────────────┐  │
│  │           ▼                          ▼                   │  │
│  │  ┌──────────────────┐     ┌────────────────────────┐   │  │
│  │  │ Auth Controller  │     │  Resume Controller     │   │  │
│  │  │                  │     │                        │   │  │
│  │  │ - User Reg       │     │ - AI Summary Gen       │   │  │
│  │  │ - Login Logic    │     │ - Save/Update Resume   │   │  │
│  │  │ - Token Gen      │     │ - Fetch Resume         │   │  │
│  │  │ - Password Hash  │     │ - Delete Resume        │   │  │
│  │  └─────────┬────────┘     └────────┬───────────────┘   │  │
│  └────────────┼──────────────────────┼─────────────────────┘  │
│               │                      │                         │
└───────────────┼──────────────────────┼─────────────────────────┘
                │                      │
                ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DATA LAYER (MongoDB)                         │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  Mongoose Models                         │  │
│  │                                                          │  │
│  │  ┌─────────────────────┐    ┌──────────────────────┐   │  │
│  │  │   User Model        │    │   Resume Model       │   │  │
│  │  │                     │    │                      │   │  │
│  │  │  - _id              │    │  - _id               │   │  │
│  │  │  - name             │◄───┤  - userId (ref)      │   │  │
│  │  │  - email (unique)   │    │  - skills []         │   │  │
│  │  │  - password (hash)  │    │  - projects []       │   │  │
│  │  │  - role             │    │  - courses []        │   │  │
│  │  │  - createdAt        │    │  - achievements []   │   │  │
│  │  │                     │    │  - summary           │   │  │
│  │  └─────────────────────┘    │  - education []      │   │  │
│  │                             │  - experience []     │   │  │
│  │                             │  - createdAt         │   │  │
│  │                             │  - updatedAt         │   │  │
│  │                             └──────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│                    MongoDB Database                             │
│                   resume-system (local/Atlas)                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Request Flow Diagrams

### 1. User Registration Flow

```
User                 Frontend              Backend              Database
 │                      │                      │                    │
 │  Fill Form          │                      │                    │
 ├─────────────────────>│                      │                    │
 │                      │                      │                    │
 │  Click Register     │                      │                    │
 ├─────────────────────>│                      │                    │
 │                      │  POST /api/auth/     │                    │
 │                      │      register        │                    │
 │                      ├─────────────────────>│                    │
 │                      │                      │                    │
 │                      │                      │  Check if exists   │
 │                      │                      ├───────────────────>│
 │                      │                      │<───────────────────┤
 │                      │                      │   (No duplicate)   │
 │                      │                      │                    │
 │                      │                      │  Hash password     │
 │                      │                      │  (bcrypt)          │
 │                      │                      │                    │
 │                      │                      │  Create User       │
 │                      │                      ├───────────────────>│
 │                      │                      │<───────────────────┤
 │                      │                      │   User Saved       │
 │                      │                      │                    │
 │                      │                      │  Generate JWT      │
 │                      │                      │  Token             │
 │                      │                      │                    │
 │                      │  {success, token,    │                    │
 │                      │   user}              │                    │
 │                      │<─────────────────────┤                    │
 │                      │                      │                    │
 │                      │  Store token in      │                    │
 │                      │  localStorage        │                    │
 │                      │                      │                    │
 │  Redirect to        │                      │                    │
 │  Dashboard          │                      │                    │
 │<─────────────────────┤                      │                    │
```

### 2. AI Summary Generation Flow

```
User                 Frontend              Backend              AI Engine
 │                      │                      │                    │
 │  Fill Resume Data   │                      │                    │
 ├─────────────────────>│                      │                    │
 │                      │                      │                    │
 │  Click "Generate    │                      │                    │
 │  AI Summary"        │                      │                    │
 ├─────────────────────>│                      │                    │
 │                      │                      │                    │
 │                      │  POST /api/          │                    │
 │                      │  generate-summary    │                    │
 │                      │  + JWT Token         │                    │
 │                      ├─────────────────────>│                    │
 │                      │                      │                    │
 │                      │                      │  Verify JWT        │
 │                      │                      │                    │
 │                      │                      │  Extract data:     │
 │                      │                      │  - Skills count    │
 │                      │                      │  - Projects count  │
 │                      │                      │  - Courses count   │
 │                      │                      │  - Achievements    │
 │                      │                      │                    │
 │                      │                      │  Build Summary     │
 │                      │                      ├───────────────────>│
 │                      │                      │                    │
 │                      │                      │  AI Algorithm:     │
 │                      │                      │  "A passionate     │
 │                      │                      │  [role] skilled    │
 │                      │                      │  in [skills]..."   │
 │                      │                      │<───────────────────┤
 │                      │                      │                    │
 │                      │  {success: true,     │                    │
 │                      │   summary: "..."}    │                    │
 │                      │<─────────────────────┤                    │
 │                      │                      │                    │
 │  Update Preview     │                      │                    │
 │  with Summary       │                      │                    │
 │<─────────────────────┤                      │                    │
```

### 3. Resume Save Flow

```
User                 Frontend              Backend              Database
 │                      │                      │                    │
 │  Edit Resume        │                      │                    │
 ├─────────────────────>│                      │                    │
 │                      │  (Live Preview      │                    │
 │                      │   Updates)          │                    │
 │                      │                      │                    │
 │  Click "Save"       │                      │                    │
 ├─────────────────────>│                      │                    │
 │                      │                      │                    │
 │                      │  POST /api/          │                    │
 │                      │  save-resume         │                    │
 │                      │  + JWT + Data        │                    │
 │                      ├─────────────────────>│                    │
 │                      │                      │                    │
 │                      │                      │  Verify JWT        │
 │                      │                      │                    │
 │                      │                      │  Find existing     │
 │                      │                      │  resume by userId  │
 │                      │                      ├───────────────────>│
 │                      │                      │<───────────────────┤
 │                      │                      │                    │
 │                      │                      │  If exists:        │
 │                      │                      │    Update fields   │
 │                      │                      │  Else:             │
 │                      │                      │    Create new      │
 │                      │                      ├───────────────────>│
 │                      │                      │<───────────────────┤
 │                      │                      │   Saved            │
 │                      │                      │                    │
 │                      │  {success: true,     │                    │
 │                      │   data: resume}      │                    │
 │                      │<─────────────────────┤                    │
 │                      │                      │                    │
 │  Show Success       │                      │                    │
 │  Message            │                      │                    │
 │<─────────────────────┤                      │                    │
```

---

## Technology Stack Deep Dive

### Frontend Stack
```
┌──────────────────────────────────────────┐
│             React 18                     │
│  ┌────────────────────────────────────┐  │
│  │  React Router DOM v6               │  │
│  │  - BrowserRouter                   │  │
│  │  - Routes & Route                  │  │
│  │  - Navigate (redirects)            │  │
│  │  - useNavigate hook                │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  State Management                  │  │
│  │  - useState (local state)          │  │
│  │  - useEffect (side effects)        │  │
│  │  - localStorage (persistence)      │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  Styling                           │  │
│  │  - Tailwind CSS (utility-first)   │  │
│  │  - Custom animations               │  │
│  │  - Responsive design               │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  HTTP Client                       │  │
│  │  - Axios                           │  │
│  │  - Interceptors (auth, errors)    │  │
│  │  - Base URL configuration          │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

### Backend Stack
```
┌──────────────────────────────────────────┐
│           Node.js + Express              │
│  ┌────────────────────────────────────┐  │
│  │  Core Middleware                   │  │
│  │  - express.json()                  │  │
│  │  - express.urlencoded()            │  │
│  │  - cors()                          │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  Authentication                    │  │
│  │  - JWT (jsonwebtoken)              │  │
│  │  - bcryptjs (password hashing)     │  │
│  │  - Custom auth middleware          │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  Database                          │  │
│  │  - MongoDB (NoSQL)                 │  │
│  │  - Mongoose (ODM)                  │  │
│  │  - Schema validation               │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  AI Logic                          │  │
│  │  - Custom summary generation       │  │
│  │  - Text analysis algorithms        │  │
│  │  - Future: OpenAI/Claude API       │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

---

## Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Security Layers                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Password Security                                   │
│     ┌───────────────────────────────────────┐          │
│     │  bcrypt hashing with salt (10 rounds)│          │
│     │  - Never store plain text passwords   │          │
│     │  - One-way encryption                 │          │
│     └───────────────────────────────────────┘          │
│                                                         │
│  2. JWT Authentication                                  │
│     ┌───────────────────────────────────────┐          │
│     │  Token Structure:                     │          │
│     │  Header.Payload.Signature             │          │
│     │  - 7 day expiration                   │          │
│     │  - Stored in localStorage             │          │
│     │  - Sent in Authorization header       │          │
│     └───────────────────────────────────────┘          │
│                                                         │
│  3. Protected Routes                                    │
│     ┌───────────────────────────────────────┐          │
│     │  Middleware verifies token on every   │          │
│     │  protected API call                   │          │
│     │  - Unauthorized = 401 response        │          │
│     │  - Invalid token = redirect to login  │          │
│     └───────────────────────────────────────┘          │
│                                                         │
│  4. CORS Protection                                     │
│     ┌───────────────────────────────────────┐          │
│     │  Configured for frontend origin only  │          │
│     │  - Prevents unauthorized access       │          │
│     └───────────────────────────────────────┘          │
│                                                         │
│  5. Input Validation                                    │
│     ┌───────────────────────────────────────┐          │
│     │  Mongoose schema validation           │          │
│     │  - Email format                       │          │
│     │  - Required fields                    │          │
│     │  - Data types                         │          │
│     └───────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────┘
```

---

## Deployment Architecture (Future)

```
┌──────────────────────────────────────────────────────────┐
│                     Production Setup                     │
└──────────────────────────────────────────────────────────┘

┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│   Vercel    │      │   Heroku    │      │  MongoDB     │
│  (Frontend) │─────>│  (Backend)  │─────>│   Atlas      │
│             │      │             │      │  (Database)  │
│  - React    │      │  - Node.js  │      │             │
│  - CDN      │      │  - Express  │      │  - Cloud    │
│  - SSL      │      │  - SSL      │      │  - Backup   │
└─────────────┘      └─────────────┘      └──────────────┘
       │                    │
       │                    │
       └────────┬───────────┘
                │
                ▼
        ┌──────────────┐
        │   Cloudinary │
        │   (Future)   │
        │  - Images    │
        │  - PDFs      │
        └──────────────┘
```

---

## Component Hierarchy

```
App.jsx
├── Router (BrowserRouter)
    ├── Routes
        ├── / → Navigate to /dashboard
        ├── /login
        │   └── Login.jsx
        │       ├── Form inputs
        │       └── Submit handler
        ├── /register
        │   └── Register.jsx
        │       ├── Form inputs
        │       └── Submit handler
        ├── /dashboard (Protected)
        │   └── Dashboard.jsx
        │       ├── Navbar.jsx
        │       ├── Welcome Section
        │       ├── Stats Grid
        │       ├── Summary Display
        │       └── Quick Actions
        └── /resume-builder (Protected)
            └── ResumeBuilder.jsx
                ├── Navbar.jsx
                ├── Action Buttons
                ├── ResumeForm.jsx
                │   ├── Tab Navigation
                │   ├── Skills Tab
                │   ├── Projects Tab
                │   ├── Courses Tab
                │   └── Achievements Tab
                └── ResumePreview.jsx
                    ├── Header Section
                    ├── Summary Section
                    ├── Skills Section
                    ├── Projects Section
                    ├── Education Section
                    ├── Experience Section
                    ├── Courses Section
                    └── Achievements Section
```

---

This architecture provides a solid foundation for building and scaling the Resume System! 🚀
