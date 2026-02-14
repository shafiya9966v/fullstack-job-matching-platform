const express = require('express');
const { getAllJobs, getJobById, createJob } = require('../controllers/jobController');

const router = express.Router();

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', createJob);

module.exports = router;
