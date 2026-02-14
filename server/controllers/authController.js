const { readData, writeData } = require('../utils/fileHelper');
const { v4: uuidv4 } = require('uuid');

const register = (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const users = readData('users.json');

    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
        id: uuidv4(),
        name,
        email,
        password,
        role: role || 'candidate',
        profile: {}
    };

    users.push(newUser);
    writeData('users.json', users);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
};

const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const users = readData('users.json');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user });
};

const updateProfile = (req, res) => {
    const { userId, skills, experience, education, bio } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    let users = readData('users.json');
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users[userIndex].profile = {
        ...users[userIndex].profile,
        skills,
        experience,
        education,
        bio
    };

    writeData('users.json', users);

    res.json({ message: 'Profile updated successfully', user: users[userIndex] });
};

module.exports = { register, login, updateProfile };
