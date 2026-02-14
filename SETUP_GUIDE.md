# AI Job Search Match - Setup Guide

Welcome! This guide will help you set up and run the AI Job Search Match application on your local machine.

## 📋 Prerequisites

Before you begin, make sure you have the following installed on your computer:

1. **Node.js** (version 16 or higher)
   - Download from: https://nodejs.org/
   - To check if installed, open terminal and run: `node --version`

2. **npm** (comes with Node.js)
   - To check if installed, run: `npm --version`

3. **A code editor** (optional, but recommended)
   - VS Code: https://code.visualstudio.com/

## 🚀 Quick Start Guide

### Step 1: Extract the Project

1. Extract the `AI_job_Search_match.zip` file to your desired location
2. Open your terminal/command prompt

### Step 2: Navigate to the Project Folder

```bash
cd path/to/AI_job_Search_match
```

**Example for Windows:**
```bash
cd C:\Users\YourName\Desktop\AI_job_Search_match
```

**Example for Mac/Linux:**
```bash
cd ~/Desktop/AI_job_Search_match
```

### Step 3: Install Server Dependencies

```bash
cd server
npm install
```

This will install all the required packages for the backend server. Wait for the installation to complete (may take 1-2 minutes).

### Step 4: Install Client Dependencies

Open a **new terminal window** (keep the first one open) and run:

```bash
cd path/to/AI_job_Search_match/client
npm install
```

This will install all the required packages for the frontend application. Wait for the installation to complete (may take 2-3 minutes).

### Step 5: Start the Server

In the **first terminal** (where you're in the `server` folder), run:

```bash
npm start
```

You should see a message like:
```
Server running on port 5000
```

**Keep this terminal window open!** The server needs to keep running.

### Step 6: Start the Client

In the **second terminal** (where you're in the `client` folder), run:

```bash
npm run dev
```

You should see output like:
```
VITE v7.2.4  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 7: Open in Browser

1. Open your web browser (Chrome, Firefox, Edge, etc.)
2. Go to: **http://localhost:5173/**
3. The application should now be running! 🎉

## 📁 Project Structure

```
AI_job_Search_match/
├── client/                 # Frontend React application
│   ├── src/               # Source code
│   ├── public/            # Static files
│   └── package.json       # Frontend dependencies
│
└── server/                # Backend Node.js server
    ├── controllers/       # Request handlers
    ├── routes/           # API routes
    ├── data/             # JSON data files
    ├── uploads/          # Resume uploads folder
    └── package.json      # Backend dependencies
```

## 🔧 Detailed Terminal Commands

### For Windows Users (PowerShell or Command Prompt)

**Terminal 1 - Server:**
```powershell
cd C:\path\to\AI_job_Search_match\server
npm install
npm start
```

**Terminal 2 - Client:**
```powershell
cd C:\path\to\AI_job_Search_match\client
npm install
npm run dev
```

### For Mac/Linux Users

**Terminal 1 - Server:**
```bash
cd ~/path/to/AI_job_Search_match/server
npm install
npm start
```

**Terminal 2 - Client:**
```bash
cd ~/path/to/AI_job_Search_match/client
npm install
npm run dev
```

## 🌐 Application URLs

Once running, you can access:

- **Frontend Application:** http://localhost:5173/
- **Backend API Server:** http://localhost:5000/

## 📝 Available Features

1. **User Authentication**
   - Register new account
   - Login to existing account

2. **Job Search**
   - Browse available jobs
   - Filter by category, location, type
   - View job details

3. **Resume Upload & Matching**
   - Upload your resume (PDF format)
   - AI-powered job matching based on your skills
   - View match scores

4. **Dashboard**
   - View your profile
   - Track applications
   - See recommended jobs

## ❗ Troubleshooting

### Issue: "npm: command not found"

**Solution:** Node.js is not installed. Download and install from https://nodejs.org/

### Issue: "Port 5000 is already in use"

**Solution:** Another application is using port 5000. Either:
1. Stop the other application, or
2. Change the port in `server/index.js` (line with `const PORT = 5000`)

### Issue: "Port 5173 is already in use"

**Solution:** Another application is using port 5173. The Vite dev server will automatically try the next available port (5174, 5175, etc.). Check the terminal output for the actual URL.

### Issue: "Cannot connect to server" or API errors

**Solution:** Make sure the server is running in the first terminal. You should see "Server running on port 5000".

### Issue: Dependencies installation fails

**Solution:** 
1. Delete the `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again

### Issue: Resume upload not working

**Solution:** Make sure the `server/uploads` folder exists. If not, create it manually.

## 🛑 Stopping the Application

To stop the application:

1. Go to each terminal window
2. Press `Ctrl + C` (Windows/Linux) or `Cmd + C` (Mac)
3. Confirm if prompted

## 🔄 Restarting the Application

To restart after stopping:

**Terminal 1 (Server):**
```bash
cd path/to/AI_job_Search_match/server
npm start
```

**Terminal 2 (Client):**
```bash
cd path/to/AI_job_Search_match/client
npm run dev
```

## 📦 What's Included

### Server Dependencies
- **express** - Web server framework
- **cors** - Cross-origin resource sharing
- **multer** - File upload handling
- **pdf-parse** - PDF resume parsing
- **uuid** - Unique ID generation

### Client Dependencies
- **react** - UI framework
- **react-router-dom** - Navigation
- **axios** - HTTP requests
- **tailwindcss** - Styling
- **framer-motion** - Animations
- **lucide-react** - Icons

## 💡 Tips

1. **Always run both server and client** - The application needs both to work properly
2. **Check terminal output** - Error messages will appear in the terminal
3. **Clear browser cache** - If you see old data, try clearing cache or hard refresh (Ctrl+Shift+R)
4. **Use modern browsers** - Chrome, Firefox, Edge (latest versions)

## 📞 Need Help?

If you encounter issues not covered here:

1. Check that both terminals are running without errors
2. Verify Node.js version: `node --version` (should be 16+)
3. Make sure you're in the correct directory when running commands
4. Try restarting both server and client

## 🎯 Next Steps

Once the application is running:

1. Create an account on the registration page
2. Login with your credentials
3. Upload your resume (PDF format)
4. Browse jobs and see AI-powered matches
5. Apply to jobs that match your skills

---

**Enjoy using the AI Job Search Match platform!** 🚀
