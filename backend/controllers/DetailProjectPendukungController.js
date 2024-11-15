const DetailProjectPendukung = require('../models/DetailProjectPendukung');
const Project = require('../models/Project'); // Pastikan path ini benar
const upload = require('../middleware/uploadFile'); // Middleware for file upload
const fs = require('fs');
const path = require('path');

// Helper to format file paths
const formatFilePath = (file) => `${file.filename}`;

// Create a new DetailProjectPendukung entry
exports.createDetailProjectPendukung = async (req, res) => {
  try {
    // Check if the related project exists
    const project = await Project.findByPk(req.body.id_project);
    if (!project) {
        return res.status(404).json({ error: 'Project not found' });
    }

    // Create a new DetailProjectPendukung entry
    const newDetailProjectPendukung = await DetailProjectPendukung.create({
        id_project: req.body.id_project,
        file: req.file.filename , // Assume multer is handling file upload
        other_file: req.file.originalname ,
        pekerjaan: 'file pendukung', // Default to 'file pendukung'
    });

    return res.status(201).json({
        message: 'DetailProjectPendukung created successfully',
        data: newDetailProjectPendukung,
    });
} catch (error) {
    console.error('Error creating DetailProjectPendukung:', error);
    return res.status(500).json({ error: 'Internal server error' });
}
};


// Get all DetailProjectPendukung entries
exports.getAllDetailProjectPendukung = async (req, res) => {
  try {
    const detailProjectPendukungs = await DetailProjectPendukung.findAll();
    res.status(200).json(detailProjectPendukungs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get DetailProjectPendukung by ID
exports.getDetailProjectPendukungById = async (req, res) => {
  try {
    const detailProjectPendukung = await DetailProjectPendukung.findByPk(req.params.id, {
      include: [{ model: Project, attributes: ['name'] }],
    });
    if (detailProjectPendukung) {
      res.status(200).json(detailProjectPendukung);
    } else {
      res.status(404).json({ error: 'DetailProjectPendukung not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateDetailProjectPendukung = async (req, res) => {
  try {
    const projectId = req.params.id;
    const detail = await DetailProjectPendukung.findOne({
        where: { id_project_pendukung: projectId }
    });

    if (!detail) {
        return res.status(404).json({ message: 'Detail project pendukung not found' });
    }

    const oldFileName = req.body.oldFileName || detail.file; // Nama file lama, jika ada
    const newFile = req.file; // File baru yang di-upload

    if (newFile) {
        // Hapus file lama
        const oldFilePath = path.join(__dirname, '..', 'uploads', oldFileName);
        fs.unlink(oldFilePath, (err) => {
            if (err) {
                console.error("Error deleting old file:", err);
                return res.status(500).json({ message: 'Error deleting old file', error: err.message });
            }
            console.log('Old file deleted successfully');
        });

        // Update file baru dan simpan perubahan di database
        detail.file = newFile.filename;
        detail.other_file = newFile.originalname;
        detail.updatedAt = new Date();
        await detail.save();

        res.status(200).json({ message: 'Detail project pendukung updated successfully', detail });
    } else {
        // Jika tidak ada file baru, hanya update timestamp
        detail.updatedAt = new Date();
        await detail.save();
        res.status(200).json({ message: 'Detail project pendukung updated (no file change)', detail });
    }
} catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: 'Error updating detail project pendukung', error: error.message });
}
};

exports.deleteDetailProjectPendukung = async (req, res) => {
  try {
    // Find the detail project entry by id_project_utama
    const detail = await DetailProjectPendukung.findOne({
      where: { id_project_pendukung: req.params.id }
    });

    if (!detail) {
      return res.status(404).json({ message: 'Detail project pendukung not found' });
    }

    // Get the file name from the database record
    const filePath = path.join(__dirname, '..', 'uploads', detail.file);

    // Delete the file from the uploads folder if it exists
    if (detail.file) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return res.status(500).json({ message: 'Error deleting file', error: err.message });
        }
        console.log('File deleted successfully');
      });
    }

    // Update the record to set file fields to null (if needed) before deleting the entry
    await DetailProjectPendukung.update(
      { file: null, other_file: null },
      { where: { id_project_pendukung: req.params.id } }
    );

    // Proceed to delete the record from the database
    const deleted = await DetailProjectPendukung.destroy({
      where: { id_project_pendukung: req.params.id }  // Ensure this is part of the options object
    });

    if (deleted) {
      res.status(200).json({ message: 'Detail project pendukung deleted successfully' });
    } else {
      res.status(404).json({ message: 'Detail project pendukung not found' });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: 'Error deleting detail project pendukung', error: error.message });
  }
};