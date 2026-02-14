const { readData, writeData } = require('../utils/fileHelper');
const { v4: uuidv4 } = require('uuid');

const getAllJobs = (req, res) => {
    const { query, location, experience, userId } = req.query;
    let jobs = readData('jobs.json');

    // 1. Filter by Search Query
    if (query) {
        const lowerQuery = query.toLowerCase();
        jobs = jobs.filter(job =>
            job.title.toLowerCase().includes(lowerQuery) ||
            job.company.toLowerCase().includes(lowerQuery) ||
            job.skills.some(skill => skill.toLowerCase().includes(lowerQuery))
        );
    }

    // 2. Filter by Location
    if (location) {
        jobs = jobs.filter(job => job.location.toLowerCase().includes(location.toLowerCase()));
    }

    // 3. Filter by Experience
    if (experience) {
        jobs = jobs.filter(job => job.experience.toLowerCase().includes(experience.toLowerCase()));
    }

    // 4. AI Matching (if userId is provided)
    if (userId) {
        const users = readData('users.json');
        const user = users.find(u => u.id === userId);

        if (user && user.profile && user.profile.skills) {
            const userSkills = Array.isArray(user.profile.skills)
                ? user.profile.skills.map(s => s.toLowerCase())
                : (typeof user.profile.skills === 'string'
                    ? user.profile.skills.split(',').map(s => s.trim().toLowerCase())
                    : []);

            jobs = jobs.map(job => {
                const jobSkills = job.skills.map(s => s.toLowerCase());

                // Calculate Skill Overlap
                const matchingSkills = jobSkills.filter(skill => userSkills.includes(skill));
                let matchScore = 0;
                if (jobSkills.length > 0) {
                    matchScore = Math.round((matchingSkills.length / jobSkills.length) * 100);
                }

                return { ...job, matchScore };
            });

            // Sort by Match Score (Descending)
            jobs.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
        }
    }

    res.json(jobs);
};

const getJobById = (req, res) => {
    const jobs = readData('jobs.json');
    const job = jobs.find(j => j.id === req.params.id);
    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
};

const createJob = (req, res) => {
    const { title, company, location, type, salary, description, skills, experience } = req.body;

    if (!title || !company || !description) {
        return res.status(400).json({ message: 'Required fields missing' });
    }

    const jobs = readData('jobs.json');
    const newJob = {
        id: uuidv4(),
        title,
        company,
        location,
        type,
        salary,
        description,
        skills: skills || [],
        experience,
        postedDate: new Date().toISOString()
    };

    jobs.push(newJob);
    writeData('jobs.json', jobs);

    res.status(201).json(newJob);
};

module.exports = { getAllJobs, getJobById, createJob };
