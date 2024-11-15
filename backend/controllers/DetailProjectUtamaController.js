const DetailProjectUtama = require('../models/DetailProjectUtama');
const Project = require('../models/Project'); // Pastikan path ini benar
const upload = require('../middleware/uploadFile'); // Middleware for file upload
const fs = require('fs');
const path = require('path');


// Helper to format file paths
const formatFilePath = (file) => `${file.filename}`;

// Create a new DetailProjectUtama entry
exports.createDetailProjectUtama = async (req, res) => {
    try {
        const project = await Project.findByPk(req.body.id_project);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Check if a file already exists for this pekerjaan (for F1 and F2)
        const existingFile = await DetailProjectUtama.findOne({
            where: {
                id_project: req.body.id_project,
                pekerjaan: req.body.pekerjaan,
            },
        });

        // If pekerjaan is F1 or F2, deny if a file already exists
        if ((req.body.pekerjaan === 'F1' || req.body.pekerjaan === 'F2') && existingFile) {
            return res.status(400).json({ error: `${req.body.pekerjaan} file already exists `});
        }

        // Define allowed files and custom names for each pekerjaan
        let allowedOtherFiles = [];
        let customFileName = null;

        // Handle F1 and F2: Set custom names for the uploaded file
        if (req.body.pekerjaan === 'F1') {
            customFileName = req.file.filename;

        } else if (req.body.pekerjaan === 'F2') {
            customFileName = req.file.filename;
        }

        // Handle F3: Define allowed other files and set custom name
        if (req.body.pekerjaan === 'F3') {
            allowedOtherFiles = ['Form F3.pdf', 'Form F3.docx'];
            if (req.body.other_file === 'Form F3.pdf') {
                customFileName = req.file.filename;
            } else if (req.body.other_file === 'Form F3.docx') {
                customFileName = req.file.filename;
            }
        } 
        // Handle F4: Define allowed other files and set custom name
        else if (req.body.pekerjaan === 'F4') {
            allowedOtherFiles = [
                'Gambar.pdf', 'Analisa Struktur.pdf', 'Spek Teknis.pdf',
                'Perhitungan Air Hujan.pdf', 'Perhitungan Air Bersih.pdf',
                'Perhitungan Air Kotor.pdf', 'Kajian dan Simak (SLF).pdf'
            ];
            if (req.body.other_file === 'Gambar.pdf') {
                customFileName = req.file.filename;
            } else if (req.body.other_file === 'Analisa Struktur.pdf') {
                customFileName = req.file.filename;
            } else if (req.body.other_file === 'Spek Teknis.pdf') {
                customFileName = req.file.filename;
            } else if (req.body.other_file === 'Perhitungan Air Hujan.pdf') {
                customFileName = req.file.filename;
            } else if (req.body.other_file === 'Perhitungan Air Bersih.pdf') {  
                customFileName = req.file.filename;
            } else if (req.body.other_file === 'Perhitungan Air Kotor.pdf') {
                customFileName = req.file.filename;
            } else if (req.body.other_file === 'Kajian dan Simak (SLF).pdf') {
                customFileName = req.file.filename;
            }
        }

        // If pekerjaan is F1 or F2, other_file should be null or undefined
        if (req.body.pekerjaan === 'F1' || req.body.pekerjaan === 'F2') {
            customFileName = req.file.filename;
        }

        // If pekerjaan is F3 or F4, validate other_file value
        if (allowedOtherFiles.length > 0 && !allowedOtherFiles.includes(req.body.other_file)) {
            return res.status(400).json({ error: `Invalid other_file for pekerjaan ${req.body.pekerjaan}` });
        }

        // If no custom file name is found, use the original filename if available
        if (!customFileName && req.file) {
            customFileName = req.file.originalname;
        }

        // Save the entry in the database
        const detailProjectUtama = await DetailProjectUtama.create({
            id_project: req.body.id_project,
            file: customFileName, // Use custom name based on pekerjaan (F1/F2) or other_file (F3/F4)
            other_file: req.body.other_file, // Will be null for F1 and F2
            pekerjaan: req.body.pekerjaan,
        });

        res.status(201).json(detailProjectUtama);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get all DetailProjectUtama entries
exports.getAllDetailProjectUtama = async (req, res) => {
  try {
    const detailProjectUtamas = await DetailProjectUtama.findAll();
    res.status(200).json(detailProjectUtamas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get DetailProjectUtama by ID
exports.getDetailProjectUtamaById = async (req, res) => {
  try {
    const detailProjectUtama = await DetailProjectUtama.findByPk(req.params.id, {
      include: [{ model: Project, attributes: ['name'] }],
    });
    if (detailProjectUtama) {
      res.status(200).json(detailProjectUtama);
    } else {
      res.status(404).json({ error: 'DetailProjectUtama not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateDetailProjectUtama = async (req, res) => {
    try {
        const projectId = req.params.id;
        const detail = await DetailProjectUtama.findOne({
            where: { id_project_utama: projectId }
        });

        if (!detail) {
            return res.status(404).json({ message: 'Detail project utama not found' });
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
            detail.updatedAt = new Date();
            await detail.save();

            res.status(200).json({ message: 'Detail project utama updated successfully', detail });
        } else {
            // Jika tidak ada file baru, hanya update timestamp
            detail.updatedAt = new Date();
            await detail.save();
            res.status(200).json({ message: 'Detail project utama updated (no file change)', detail });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Error updating detail project utama', error: error.message });
    }
};

exports.deleteDetailProjectUtama = async (req, res) => {
    try {
        // Find the detail project entry by id_project_utama
        const detail = await DetailProjectUtama.findOne({
            where: { id_project_utama: req.params.id }
        });

        if (!detail) {
            return res.status(404).json({ message: 'Detail project utama not found' });
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
        await DetailProjectUtama.update(
            { file: null, other_file: null },
            { where: { id_project_utama: req.params.id } }
        );

        // Proceed to delete the record from the database
        const deleted = await DetailProjectUtama.destroy({
            where: { id_project_utama: req.params.id }  // Ensure this is part of the options object
        });

        if (deleted) {
            res.status(200).json({ message: 'Detail project utama deleted successfully' });
        } else {
            res.status(404).json({ message: 'Detail project utama not found' });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Error deleting detail project utama', error: error.message });
    }
  };