const prisma = require('../config/prisma');

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        company: { select: { name: true, location: true } },
        category: { select: { name: true } }
      }
    });
    return res.status(200).json({ status: 'success', count: jobs.length, data: jobs });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch jobs', details: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await prisma.job.findUnique({
      where: { id: parseInt(id) },
      include: { company: true, category: true, applications: true }
    });
    if (!job) return res.status(404).json({ error: 'Job listing not found' });
    return res.status(200).json({ status: 'success', data: job });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch job', details: error.message });
  }
};

exports.createJob = async (req, res) => {
  try {
    const { companyId, categoryId, title, description, salary, jobType, location } = req.body;
    if (!companyId || !categoryId || !title || !description || !jobType || !location) {
      return res.status(400).json({ error: 'companyId, categoryId, title, description, jobType, and location are required' });
    }
    const newJob = await prisma.job.create({
      data: {
        companyId: parseInt(companyId),
        categoryId: parseInt(categoryId),
        title,
        description,
        salary: salary ? parseInt(salary) : null,
        jobType,
        location
      }
    });
    return res.status(201).json({ message: 'Job listing created successfully', data: newJob });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create job listing', details: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyId, categoryId, title, description, salary, jobType, location } = req.body;

    const existingJob = await prisma.job.findUnique({ where: { id: parseInt(id) } });
    if (!existingJob) return res.status(404).json({ error: 'Job listing not found' });

    const updatedJob = await prisma.job.update({
      where: { id: parseInt(id) },
      data: {
        companyId: companyId ? parseInt(companyId) : existingJob.companyId,
        categoryId: categoryId ? parseInt(categoryId) : existingJob.categoryId,
        title: title || existingJob.title,
        description: description || existingJob.description,
        salary: salary !== undefined ? parseInt(salary) : existingJob.salary,
        jobType: jobType || existingJob.jobType,
        location: location || existingJob.location
      }
    });
    return res.status(200).json({ message: 'Job listing updated successfully', data: updatedJob });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update job listing', details: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const existingJob = await prisma.job.findUnique({ where: { id: parseInt(id) } });
    if (!existingJob) return res.status(404).json({ error: 'Job listing not found' });

    await prisma.job.delete({ where: { id: parseInt(id) } });
    return res.status(200).json({ message: 'Job listing deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete job listing', details: error.message });
  }
};