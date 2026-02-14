const fs = require('fs');
const pdf = require('pdf-parse');

const uploadResume = async (req, res) => {
    console.log("Upload Request Received");
    console.log("File:", req.file);
    console.log("Body:", req.body);

    if (!req.file) {
        console.error("No file received in request");
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Check if file is PDF
    if (req.file.mimetype !== 'application/pdf') {
        console.error("Invalid file type:", req.file.mimetype);
        return res.status(400).json({ message: 'Only PDF resumes are supported. Please upload a PDF file.' });
    }

    try {
        const dataBuffer = fs.readFileSync(req.file.path);
        const data = await pdf(dataBuffer);

        // Mock AI Extraction logic
        // In a real app, you would send `data.text` to an NLP model (e.g., OpenAI, BERT)

        const extractedSkills = ['JavaScript', 'React', 'Node.js', 'Python']; // Mocked
        const extractedExperience = '3 years'; // Mocked

        // Simple keyword extraction from text
        const text = data.text.toLowerCase();
        const detectedSkills = [];
        const commonSkills = ['javascript', 'react', 'node.js', 'python', 'java', 'c++', 'sql', 'aws', 'docker', 'kubernetes'];

        commonSkills.forEach(skill => {
            if (text.includes(skill)) {
                detectedSkills.push(skill);
            }
        });

        res.json({
            message: 'Resume parsed successfully',
            data: {
                text: data.text.substring(0, 500) + '...', // Preview
                skills: detectedSkills.length > 0 ? detectedSkills : extractedSkills,
                experience: extractedExperience,
                filename: req.file.filename,
                path: req.file.path
            }
        });

        // Cleanup: remove uploaded file to save space? Or keep it?
        // fs.unlinkSync(req.file.path); 
    } catch (error) {
        console.error("Parsing Error:", error);
        res.status(500).json({ message: 'Error parsing resume: ' + error.message });
    }
};

const { readData, writeData } = require('../utils/fileHelper');

const saveResume = (req, res) => {
    const { userId, resumeData, profileData } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const users = readData('users.json');
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user profile
        users[userIndex].profile = {
            ...users[userIndex].profile,
            ...profileData,
            skills: resumeData.skills,
            resumeAnalyzed: true,
            analyzedDate: new Date().toISOString(),
            resumeFile: resumeData.filename
        };

        writeData('users.json', users);

        res.json({ message: 'Resume saved successfully', user: users[userIndex] });
    } catch (error) {
        console.error("Save resume error:", error);
        res.status(500).json({ message: 'Failed to save resume' });
    }
};

module.exports = { uploadResume, saveResume };
