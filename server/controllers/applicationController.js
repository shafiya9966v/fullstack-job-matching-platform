const { readData, writeData } = require('../utils/fileHelper');
const { v4: uuidv4 } = require('uuid');

const applyForJob = (req, res) => {
    const { userId, jobId } = req.body;

    if (!userId || !jobId) {
        return res.status(400).json({ message: 'User ID and Job ID are required' });
    }

    const applications = readData('applications.json');
    const jobs = readData('jobs.json');
    const job = jobs.find(j => j.id === jobId);

    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }

    // Check if already applied
    const existing = applications.find(app => app.userId === userId && app.jobId === jobId);
    if (existing) {
        return res.status(400).json({ message: 'Already applied for this job' });
    }

    const newApplication = {
        id: uuidv4(),
        userId,
        jobId,
        jobTitle: job.title,
        company: job.company,
        status: 'Applied',
        date: new Date().toISOString()
    };

    applications.push(newApplication);
    writeData('applications.json', applications);

    res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
};

const getUserApplications = (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    const applications = readData('applications.json');
    const userApplications = applications.filter(app => app.userId === userId);

    res.json(userApplications);
};

module.exports = { applyForJob, getUserApplications };
