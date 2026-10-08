const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.get('/', applicationController.getAllApplications);
router.post('/', applicationController.createApplication);
router.patch('/:id/status', applicationController.updateApplicationStatus);
router.delete('/:id', applicationController.deleteApplication);

module.exports = router;