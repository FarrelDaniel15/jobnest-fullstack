const prisma = require('../config/prisma');

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      include: { user: { select: { name: true, email: true } }, jobs: true }
    });
    return res.status(200).json({ status: 'success', data: companies });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch companies', details: error.message });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await prisma.company.findUnique({
      where: { id: parseInt(id) },
      include: { jobs: true }
    });
    if (!company) return res.status(404).json({ error: 'Company not found' });
    return res.status(200).json({ status: 'success', data: company });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch company', details: error.message });
  }
};

exports.createCompany = async (req, res) => {
  try {
    const { userId, name, description, location, website } = req.body;
    if (!userId || !name || !location) {
      return res.status(400).json({ error: 'userId, name, and location are required' });
    }
    const newCompany = await prisma.company.create({
      data: { userId: parseInt(userId), name, description, location, website }
    });
    return res.status(201).json({ message: 'Company created successfully', data: newCompany });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create company', details: error.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, location, website } = req.body;
    const company = await prisma.company.update({
      where: { id: parseInt(id) },
      data: { name, description, location, website }
    });
    return res.status(200).json({ message: 'Company updated successfully', data: company });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update company', details: error.message });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.company.delete({ where: { id: parseInt(id) } });
    return res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete company', details: error.message });
  }
};