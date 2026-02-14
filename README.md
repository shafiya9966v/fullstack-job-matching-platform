# 🎯 AI Job Search Match

An intelligent job search and matching platform powered by AI that helps job seekers find the perfect opportunities based on their skills and experience.

## ✨ Features

- 🔐 **User Authentication** - Secure registration and login system
- 📄 **Resume Upload & Parsing** - Upload PDF resumes with automatic skill extraction
- 🤖 **AI-Powered Matching** - Intelligent job matching based on resume analysis
- 🔍 **Advanced Job Search** - Filter by category, location, job type, and experience level
- 📊 **Match Scoring** - See how well you match with each job opportunity
- 💼 **Application Tracking** - Keep track of your job applications
- 🎨 **Modern UI** - Beautiful, responsive interface with smooth animations

## 🛠️ Tech Stack

### Frontend
- React 19.2
- React Router for navigation
- Tailwind CSS for styling
- Framer Motion for animations
- Axios for API calls
- Lucide React for icons
- Vite as build tool

### Backend
- Node.js with Express
- JSON-based data storage
- PDF parsing for resume analysis
- Multer for file uploads
- CORS enabled

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)
- Modern web browser

## 🚀 Quick Start

### 1. Install Dependencies

**Server:**
```bash
cd server
npm install
```

**Client:**
```bash
cd client
npm install
```

### 2. Run the Application

**Start the server (Terminal 1):**
```bash
cd server
npm start
```

**Start the client (Terminal 2):**
```bash
cd client
npm run dev
```

### 3. Access the Application

Open your browser and navigate to: **http://localhost:5173/**

## 📖 Detailed Setup Guide

For detailed setup instructions, troubleshooting, and more information, please see [SETUP_GUIDE.md](SETUP_GUIDE.md)

## 🏗️ Project Structure

```
AI_job_Search_match/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context (auth)
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── public/              # Static assets
│   └── package.json
│
└── server/                   # Backend application
    ├── controllers/         # Business logic
    ├── routes/             # API endpoints
    ├── data/               # JSON data files
    │   ├── users.json
    │   ├── jobs.json
    │   └── applications.json
    ├── uploads/            # Resume uploads
    ├── utils/              # Helper functions
    └── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get specific job
- `POST /api/jobs` - Create new job

### Resume
- `POST /api/resume/upload` - Upload and parse resume
- `POST /api/resume/match` - Get AI job matches

### Applications
- `POST /api/applications` - Submit job application
- `GET /api/applications/user/:userId` - Get user's applications

## 🎨 Key Features Explained

### Resume Parsing
Upload a PDF resume and the system will:
- Extract text content
- Identify skills and technologies
- Parse experience and education
- Store for matching analysis

### AI Job Matching
The matching algorithm:
- Analyzes your resume skills
- Compares with job requirements
- Calculates match percentage
- Ranks jobs by relevance

### Job Filtering
Filter jobs by:
- **Category:** Engineering, Design, Marketing, Sales, etc.
- **Location:** Remote, On-site, Hybrid
- **Job Type:** Full-time, Part-time, Contract, Internship
- **Experience Level:** Entry, Mid, Senior, Lead

## 🎯 Usage Flow

1. **Register/Login** - Create an account or sign in
2. **Upload Resume** - Upload your PDF resume
3. **Browse Jobs** - Explore available opportunities
4. **View Matches** - See AI-recommended jobs based on your profile
5. **Apply** - Submit applications to jobs you're interested in
6. **Track** - Monitor your applications in the dashboard

## 🔒 Data Storage

The application uses JSON files for data persistence:
- `users.json` - User accounts and profiles
- `jobs.json` - Job listings
- `applications.json` - Application records
- Resume files stored in `uploads/` folder

## 🌟 Highlights

- **No Database Required** - Simple JSON-based storage
- **PDF Resume Support** - Automatic parsing and skill extraction
- **Real-time Matching** - Instant job recommendations
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI/UX** - Gradient backgrounds, smooth animations, glassmorphism effects

## 🛠️ Development

### Server Development Mode
```bash
cd server
npm run dev  # Uses nodemon for auto-restart
```

### Client Development Mode
```bash
cd client
npm run dev  # Hot module replacement enabled
```

### Building for Production

**Client:**
```bash
cd client
npm run build
```

## 📝 Environment

### Server
- Runs on port **5000**
- CORS enabled for frontend communication

### Client
- Runs on port **5173** (Vite default)
- Proxies API requests to server

## 🤝 Contributing

This is a demonstration project. Feel free to:
- Add more features
- Improve the matching algorithm
- Enhance the UI/UX
- Add database integration
- Implement more advanced AI features

## 📄 License

ISC

## 🙏 Acknowledgments

Built with modern web technologies and best practices for a seamless job search experience.

---

**Happy Job Hunting!** 🎉
