const User = require('../models/User');
const argon2 = require('argon2');
const path = require('path');
const fs = require('fs');

exports.createUser = async (req, res) => {
    const { name, email, password, role, status } = req.body;

    try {
        // Memeriksa apakah email sudah ada
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash password sebelum menyimpan
        const hashedPassword = await argon2.hash(password);

        // Tambahkan path gambar dari req.file jika ada
        const imagePath = req.file ? `${req.file.filename}` : null;

        // Membuat user baru
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword, // Simpan hashed password
            role,
            status: status || 'Aktif',
            image: imagePath, // Simpan path gambar
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        res.status(201).json({
            message: 'User created successfully',
            user: { ...newUser.dataValues, password: undefined }, // Hilangkan password dari response
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};

exports.getUserById = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
};

exports.updateUser = async (req, res) => {
  try {
    const { name, role, status } = req.body;
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Handle image update
    if (req.file) {
      // Construct path of the old image file
      if (user.image) {
        const oldImagePath = path.join(__dirname, '../images', user.image);

        // Check if the old image exists and remove it
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error('Error deleting old image:', err);
          }
        });
      }

      // Generate the new image path and update it
      const imagePath = `PP_${req.body.name}_${req.file.originalname}`;
      user.image = imagePath; // Update image path with the new image
    }

    // Update user details
    user.name = name || user.name;
    user.role = role || user.role;
    user.status = status || user.status;

    await user.save();

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    await user.destroy();
    res.json({ message: 'User deleted' });
};

// Controller method for updating user status by ID 
exports.updateUserStatus = async (req, res) => {
    try {
      const userId = req.params.id;
      const newStatus = req.query.status;
  
      // Update status user
      const [updated] = await User.update({ status: newStatus }, { where: { id: userId } });
  
      if (updated) {
        // Dapatkan informasi user setelah update
        const updatedUser = await User.findOne({ where: { id: userId }, attributes: ['id', 'name', 'status'] });
  
        return res.status(200).json({
          success: true,
          message: `User status updated to ${newStatus}`,
          data: updatedUser
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating user status",
        error: error.message
      });
    }
  };