# 🎯 Resume System - AI-Powered Resume Builder

A modern, full-stack MERN application that enables users to create professional resumes with AI-generated summaries and live preview functionality.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Architecture](#architecture)
- [Future Enhancements](#future-enhancements)

---

## 🌟 Overview

**Resume System** is a trial project demonstrating a next-generation resume and career ecosystem. This prototype showcases automatic AI resume summary generation with a live preview feature, built using the MERN stack (MongoDB, Express.js, React, Node.js).

### 🎯 Core Functionality

1. **User Authentication** - Secure JWT-based registration and login
2. **AI Summary Generation** - Intelligent resume summary creation based on user achievements
3. **Live Resume Preview** - Real-time resume updates as you type
4. **Data Persistence** - MongoDB storage for user profiles and resumes
5. **Modern UI/UX** - Professional, LinkedIn-style interface with Tailwind CSS

---

## ✨ Features

### Frontend
- ✅ Clean, responsive React UI built with Vite
- ✅ Real-time resume preview with professional formatting
- ✅ Multi-tab form interface (Skills, Projects, Courses, Achievements)
- ✅ Tailwind CSS for modern styling
- ✅ JWT token-based authentication
- ✅ Protected routes and session management

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose ODM
- ✅ JWT authentication middleware
- ✅ Password hashing with bcrypt
- ✅ AI-powered summary generation algorithm
- ✅ CORS-enabled for frontend communication

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JSON Web Token (JWT)** - Authentication
- **bcryptjs** - Password hashing

---

## 📁 Project Structure

```
resume-system/
├── client/                      # Frontend React application
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ResumeForm.jsx
│   │   │   └── ResumePreview.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── ResumeBuilder.jsx
│   │   ├── utils/               # Utility functions
│   │   │   └── api.js           # API client with Axios
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/                      # Backend Node.js application
│   ├── models/                  # Mongoose models
│   │   ├── User.js
│   │   └── Resume.js
│   ├── routes/                  # Express routes
│   │   ├── authRoutes.js
│   │   └── resumeRoutes.js
│   ├── controllers/             # Business logic
│   │   ├── authController.js
│   │   └── resumeController.js
│   ├── middleware/              # Custom middleware
│   │   └── auth.js              # JWT authentication
│   ├── server.js                # Entry point
│   ├── package.json
│   └── .env.example             # Environment variables template
│
├── mock-data/                   # Sample data for testing
│   └── sample-resume.json
└── README.md                    # This file
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
  - Or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud database)
- **npm** or **yarn** package manager
- **Git** (optional, for cloning)

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Resume-System
```

### 2. Setup Backend

```bash
cd server

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env file with your configurations
# MONGODB_URI=mongodb://localhost:27017/resume-system
# JWT_SECRET=your_super_secret_jwt_key
# PORT=5000
```

### 3. Setup Frontend

```bash
cd ../client

# Install dependencies
npm install

# Create .env file (optional)
copy .env.example .env

# Edit .env if needed
# VITE_API_URL=http://localhost:5000
```

### 4. Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas**
- Update `MONGODB_URI` in `server/.env` with your Atlas connection string

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

---

## 💻 Usage

### 1. Register a New Account
- Navigate to http://localhost:3000
- Click "Sign up" and create an account
- Provide your name, email, password, and professional role

### 2. Build Your Resume
- After login, click "Create Resume" or "Resume Builder"
- Add your information across different tabs:
  - **Skills**: Add technical and soft skills
  - **Projects**: Detail your projects with descriptions and technologies
  - **Courses**: List completed courses and certifications
  - **Achievements**: Highlight awards and accomplishments

### 3. Generate AI Summary
- Click "Generate AI Summary" button
- The system analyzes your input and creates a professional summary
- View the live preview on the right side

### 4. Save Your Resume
- Click "Save Resume" to persist your data
- Return anytime to update your resume

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |

### Resume Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/generate-summary` | Generate AI summary | ✅ |
| POST | `/api/save-resume` | Save/update resume | ✅ |
| GET | `/api/resume` | Get current user's resume | ✅ |
| GET | `/api/resume/:userId` | Get specific user's resume | ✅ |
| DELETE | `/api/resume` | Delete resume | ✅ |

### Request Examples

**Register:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123",
  "role": "Software Developer"
}
```

**Generate Summary:**
```json
POST /api/generate-summary
Headers: { "Authorization": "Bearer <token>" }
{
  "skills": ["React", "Node.js", "MongoDB"],
  "projects": [{ "title": "E-commerce App", ... }],
  "courses": [{ "title": "Advanced JavaScript", ... }],
  "achievements": [{ "title": "Hackathon Winner", ... }]
}
```

---

## 🏗 Architecture

### System Design

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   React     │  HTTP   │  Express.js │  ODM    │  MongoDB    │
│  Frontend   │ ──────> │   Backend   │ ──────> │  Database   │
│  (Port 3000)│ <────── │ (Port 5000) │ <────── │             │
└─────────────┘   JSON  └─────────────┘  Data   └─────────────┘
```

### Data Flow

1. **User Registration/Login**
   - User submits credentials → Backend validates → JWT token generated → Token stored in localStorage

2. **Resume Creation**
   - User fills form → Data sent to backend → Stored in MongoDB → Confirmation returned

3. **AI Summary Generation**
   - User clicks "Generate" → Resume data sent to backend → AI algorithm processes data → Summary returned → Preview updated

### Authentication Flow

```
Client Request → JWT Middleware → Verify Token → Attach User → Route Handler
```

### Database Schema

**Users Collection:**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String,
  createdAt: Date
}
```

**Resumes Collection:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  skills: [String],
  projects: [{ title, description, technologies, link }],
  courses: [{ title, provider, completionDate, certificate }],
  achievements: [{ title, description, date }],
  education: [{ degree, institution, year, gpa }],
  experience: [{ company, position, duration, description }],
  summary: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Testing

### Mock User Data

Use this sample data for testing:

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "test123",
  "role": "Full Stack Developer",
  "skills": ["JavaScript", "React", "Node.js", "MongoDB", "Python"],
  "projects": [
    {
      "title": "E-commerce Platform",
      "description": "Built a scalable online shopping platform",
      "technologies": ["React", "Redux", "Node.js", "Stripe"],
      "link": "https://github.com/janesmith/ecommerce"
    }
  ],
  "courses": [
    {
      "title": "Complete Web Development Bootcamp",
      "provider": "Udemy",
      "completionDate": "2023-06-15",
      "certificate": "https://certificate-link.com"
    }
  ],
  "achievements": [
    {
      "title": "Hackathon Winner 2023",
      "description": "First place in regional coding competition",
      "date": "2023-08-20"
    }
  ]
}
```

---

## 🔮 Future Enhancements

This prototype can be extended with:

### Phase 1: Enhanced Features
- 🔄 PDF export functionality
- 🎨 Multiple resume templates
- 📊 Resume analytics and insights
- 🌐 Public resume sharing with unique URLs

### Phase 2: Integration
- 🔗 LinkedIn profile import
- 🤖 Integration with real AI APIs (OpenAI GPT-4, Claude)
- 📧 Email resume delivery
- 💼 Job board integrations

### Phase 3: Ecosystem
- 🎓 Achievement fetching from educational platforms (Coursera, Udemy)
- 🏆 GitHub contributions auto-import
- 📱 Mobile application
- 👥 Recruiter portal
- 📈 Career progress tracking

### Phase 4: AI Enhancement
- 🧠 Resume optimization suggestions
- 🎯 Job matching recommendations
- 📝 Cover letter generation
- 🗣 Interview preparation

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Resume System Development Team**

- GitHub: [@monu808](https://github.com/monu808)

---

## 🙏 Acknowledgments

- Design inspiration from LinkedIn and Canva Resume
- MERN stack community
- Tailwind CSS for styling utilities
- MongoDB for database solution

---

## 📞 Support

For support, email support@resumesystem.com or open an issue in the repository.

---

## 🎉 Getting Started Checklist

- [ ] Install Node.js and MongoDB
- [ ] Clone the repository
- [ ] Install backend dependencies (`cd server && npm install`)
- [ ] Install frontend dependencies (`cd client && npm install`)
- [ ] Configure environment variables
- [ ] Start MongoDB service
- [ ] Run backend server (`npm start`)
- [ ] Run frontend development server (`npm run dev`)
- [ ] Open http://localhost:3000 in browser
- [ ] Register a new account
- [ ] Create your first resume!

---

**Happy Coding! 🚀**
