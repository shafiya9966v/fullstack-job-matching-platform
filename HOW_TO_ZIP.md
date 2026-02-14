# How to Create a Zip File

This guide shows you how to create a zip file of the project to share with others.

## 🎯 What Gets Included

The zip file will include:
- ✅ All source code files
- ✅ Configuration files
- ✅ Documentation (README, SETUP_GUIDE, etc.)
- ✅ Data files (jobs.json, users.json, etc.)
- ❌ **Excluded:** node_modules (too large, will be installed by recipient)
- ❌ **Excluded:** package-lock.json (auto-generated)
- ❌ **Excluded:** Build outputs and logs

## 📦 Method 1: Using the PowerShell Script (Recommended for Windows)

### Step 1: Open PowerShell in the project folder
1. Open File Explorer
2. Navigate to the `AI_job_Search_match` folder
3. Hold `Shift` and right-click in the folder
4. Select "Open PowerShell window here" or "Open in Terminal"

### Step 2: Run the script
```powershell
.\create_zip.ps1
```

If you get an execution policy error, run this first:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\create_zip.ps1
```

### Step 3: Find your zip file
The script will create `AI_job_Search_match.zip` on your Desktop!

## 📦 Method 2: Manual Zip Creation (All Operating Systems)

### Windows
1. Go to the **parent folder** (Desktop)
2. Right-click on the `AI_job_Search_match` folder
3. Select "Send to" → "Compressed (zipped) folder"
4. Rename if needed

**⚠️ Important:** After creating the zip, you should manually delete the `node_modules` folders to reduce size:
- Extract the zip to a temporary location
- Delete `client/node_modules` folder
- Delete `server/node_modules` folder
- Re-zip the folder

### Mac
1. Go to the **parent folder** (Desktop)
2. Right-click on the `AI_job_Search_match` folder
3. Select "Compress AI_job_Search_match"
4. A zip file will be created

**⚠️ Important:** Same as Windows - remove node_modules folders before sharing.

### Linux
```bash
cd ~/Desktop
zip -r AI_job_Search_match.zip AI_job_Search_match -x "*/node_modules/*" "*/package-lock.json" "*/.git/*"
```

## 📤 Sharing the Zip File

Once created, you can share the zip file via:
- 📧 Email (if under 25MB)
- ☁️ Google Drive / OneDrive / Dropbox
- 💬 Messaging apps (Discord, Slack, etc.)
- 🔗 File sharing services (WeTransfer, etc.)

## 📊 Expected Zip Size

- **Without node_modules:** ~500 KB - 2 MB ✅
- **With node_modules:** ~200-300 MB ❌ (too large!)

**Always exclude node_modules!** Recipients will install them using `npm install`.

## ✅ Verification Checklist

Before sharing, verify the zip contains:
- [ ] `README.md`
- [ ] `SETUP_GUIDE.md`
- [ ] `QUICK_START.md`
- [ ] `client/` folder (with src, public, package.json)
- [ ] `server/` folder (with controllers, routes, data, package.json)
- [ ] **NO** `node_modules` folders
- [ ] **NO** `package-lock.json` files

## 💡 Tips

1. **Test the zip:** Extract it to a different location and verify all files are present
2. **Include documentation:** The setup guides help recipients get started quickly
3. **Keep it small:** Excluding node_modules makes sharing much easier
4. **Version your zips:** Consider naming like `AI_job_Search_match_v1.0.zip`

## 🛡️ "Blocked for security reasons" (Gmail/Email Fix)

Gmail and other email providers often block `.zip` files if they contain scripts (`.js`, `.ps1`, etc.). Here are the best ways to fix this:

### Option A: Upload to Google Drive (Best Method)
1. Go to [drive.google.com](https://drive.google.com)
2. Drag and drop your `AI_job_Search_match.zip` there.
3. Right-click the file → **Get link**.
4. Change "Restricted" to "Anyone with the link".
5. Copy the link and paste it into your email.

### Option B: The "Rename" Trick
1. Right-click your zip file.
2. Select **Rename**.
3. Change the name from `AI_job_Search_match.zip` to `AI_job_Search_match.zip.txt`.
4. Send the `.txt` file via Gmail (it will pass the filters).
5. **Tell the recipient:** "Download this and rename it back to `.zip` to open it."

### Option C: Use a Password (Encrypted Zip)
If you have 7-Zip or WinRAR installed:
1. Right-click the folder → **7-Zip** → **Add to archive...**
2. Set a password (e.g., `123`).
3. Gmail usually cannot scan the contents of password-protected zips.
