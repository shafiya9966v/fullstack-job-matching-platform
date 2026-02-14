# Quick Start Commands

This file contains copy-paste ready commands for quick setup.

## Windows (PowerShell)

### Setup and Run (First Time)
```powershell
# Navigate to project
cd "C:\path\to\AI_job_Search_match"

# Install server dependencies
cd server
npm install

# Open new terminal and install client dependencies
cd "C:\path\to\AI_job_Search_match\client"
npm install

# In first terminal - start server
cd "C:\path\to\AI_job_Search_match\server"
npm start

# In second terminal - start client
cd "C:\path\to\AI_job_Search_match\client"
npm run dev
```

### Run (After Initial Setup)
```powershell
# Terminal 1 - Server
cd "C:\path\to\AI_job_Search_match\server"
npm start

# Terminal 2 - Client
cd "C:\path\to\AI_job_Search_match\client"
npm run dev
```

## Mac/Linux

### Setup and Run (First Time)
```bash
# Navigate to project
cd ~/path/to/AI_job_Search_match

# Install server dependencies
cd server
npm install

# Open new terminal and install client dependencies
cd ~/path/to/AI_job_Search_match/client
npm install

# In first terminal - start server
cd ~/path/to/AI_job_Search_match/server
npm start

# In second terminal - start client
cd ~/path/to/AI_job_Search_match/client
npm run dev
```

### Run (After Initial Setup)
```bash
# Terminal 1 - Server
cd ~/path/to/AI_job_Search_match/server
npm start

# Terminal 2 - Client
cd ~/path/to/AI_job_Search_match/client
npm run dev
```

## Access the Application

Once both server and client are running, open your browser to:
**http://localhost:5173/**

## Stop the Application

Press `Ctrl + C` in each terminal window.
