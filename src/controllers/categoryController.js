const prisma = require('../config/prisma');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({ include: { jobs: true } });
    return res.status(200).json({ status: 'success', data: categories });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch categories', details: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    if (!name || !slug) return res.status(400).json({ error: 'name and slug are required' });
    const newCat = await prisma.category.create({ data: { name, slug } });
    return res.status(201).json({ message: 'Category created successfully', data: newCat });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create category', details: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({ where: { id: parseInt(id) } });
    return res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete category', details: error.message });
  }
};