const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadResume } = require('../controllers/resumeController');

const router = express.Router();

const fs = require('fs');

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('resume'), uploadResume);
const { saveResume } = require('../controllers/resumeController');
router.post('/save', saveResume);

module.exports = router;
