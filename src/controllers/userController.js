const prisma = require('../config/prisma');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });
    return res.status(200).json({ status: 'success', data: users });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: { id: true, name: true, email: true, role: true, companies: true, applications: true }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch user', details: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Fields name, email, and password are required' });
    }
    const newUser = await prisma.user.create({
      data: { name, email, password, role: role || 'candidate' },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });
    return res.status(201).json({ message: 'User created successfully', data: newUser });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    return res.status(500).json({ error: 'Failed to create user', details: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, role },
      select: { id: true, name: true, email: true, role: true }
    });
    return res.status(200).json({ message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update user', details: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: parseInt(id) } });
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete user', details: error.message });
  }
};