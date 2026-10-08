const prisma = require('../config/prisma');

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      include: {
        user: { select: { name: true, email: true } },
        job: { select: { title: true, company: { select: { name: true } } } }
      }
    });
    return res.status(200).json({ status: 'success', data: applications });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch applications', details: error.message });
  }
};

exports.createApplication = async (req, res) => {
  try {
    const { jobId, userId, resumeUrl, notes } = req.body;
    if (!jobId || !userId || !resumeUrl) {
      return res.status(400).json({ error: 'jobId, userId, and resumeUrl are required' });
    }
    const newApp = await prisma.application.create({
      data: {
        jobId: parseInt(jobId),
        userId: parseInt(userId),
        resumeUrl,
        notes,
        status: 'PENDING'
      }
    });
    return res.status(201).json({ message: 'Application submitted successfully', data: newApp });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to submit application', details: error.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['PENDING', 'REVIEWED', 'ACCEPTED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    const updatedApp = await prisma.application.update({
      where: { id: parseInt(id) },
      data: { status }
    });
    return res.status(200).json({ message: 'Application status updated', data: updatedApp });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update status', details: error.message });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.application.delete({ where: { id: parseInt(id) } });
    return res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete application', details: error.message });
  }
};