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
    const project = await Project.findByPk(req.body.id_project);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Check if a file already exists for this pekerjaan (for F1 and F2)
    const existingFile = await DetailProjectPendukung.findOne({
      where: {
        id_project: req.body.id_project,
        pekerjaan: req.body.pekerjaan,
      },
    });

    // If pekerjaan is F1 or F2, deny if a file already exists
    if ((req.body.pekerjaan === 'F1' || req.body.pekerjaan === 'F2') && existingFile) {
      return res.status(400).json({ error: `${req.body.pekerjaan} file already exists` });
    }

    // Define allowed files and custom names for each pekerjaan
    let allowedOtherFiles = [];
    let customFileName = null;

    // Handle F1 and F2: Set custom names for the uploaded file
    if (req.body.pekerjaan === 'F1') {
      customFileName = `${req.body.id_project}_Form Pendaftaran.pdf`;

    } else if (req.body.pekerjaan === 'F2') {
      customFileName = `${req.body.id_project}_Informasi Pekerjaan.pdf`;
    }

    // Handle F3: Define allowed other files and set custom name
    if (req.body.pekerjaan === 'F3') {
      allowedOtherFiles = ['Form F3.pdf', 'Form F3.docx'];
      if (req.body.other_file === 'Form F3.pdf') {
        customFileName = `${req.body.id_project}_Form F3.pdf`;
      } else if (req.body.other_file === 'Form F3.docx') {
        customFileName = `${req.body.id_project}_Form F3.docx`;
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
        customFileName = `${req.body.id_project}_Gambar.pdf`;
      } else if (req.body.other_file === 'Analisa Struktur.pdf') {
        customFileName = `${req.body.id_project}_Analisa Struktur.pdf`;
      } else if (req.body.other_file === 'Spek Teknis.pdf') {
        customFileName = `${req.body.id_project}_Spek Teknis.pdf`;
      } else if (req.body.other_file === 'Perhitungan Air Hujan.pdf') {
        customFileName = `${req.body.id_project}_Perhitungan Air Hujan.pdf`;
      } else if (req.body.other_file === 'Perhitungan Air Bersih.pdf') {
        customFileName = `${req.body.id_project}_Perhitungan Air Bersih.pdf`;
      } else if (req.body.other_file === 'Perhitungan Air Kotor.pdf') {
        customFileName = `${req.body.id_project}_Perhitungan Air Kotor.pdf`;
      } else if (req.body.other_file === 'Kajian dan Simak (SLF).pdf') {
        customFileName = `${req.body.id_project}_Kajian dan Simak (SLF).pdf`;
      }
    }

    // If pekerjaan is F1 or F2, other_file should be null or undefined
    if (req.body.pekerjaan === 'F1' || req.body.pekerjaan === 'F2') {
      // Set other_file to null, but use the custom file name for F1 and F2
      req.body.other_file = null;
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
    const detailProjectPendukung = await DetailProjectPendukung.create({
      id_project: req.body.id_project,
      file: customFileName, // Use custom name based on pekerjaan (F1/F2) or other_file (F3/F4)
      other_file: req.body.other_file, // Will be null for F1 and F2
      pekerjaan: req.body.pekerjaan,
    });

    res.status(201).json(detailProjectPendukung);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    const { id } = req.params; // ID project dari URL
    const { pekerjaan } = req.query; // pekerjaan dari query
    let other_file = req.query.other_file; // nilai asli dari query other_file

    // Validasi id_project
    if (!id) {
      return res.status(400).json({ error: 'id_project is required in the URL' });
    }

    // Validasi pekerjaan dan other_file
    if (!pekerjaan || !other_file) {
      return res.status(400).json({ error: 'pekerjaan and other_file are required in the query' });
    }

    // Jika pekerjaan adalah F1 atau F2, set other_file menjadi null
    if (pekerjaan === 'F1' || pekerjaan === 'F2') {
      other_file = null;
    }

    // Cari DetailProjectPendukung dengan kondisi khusus untuk pekerjaan F1 dan F2
    const searchCriteria = {
      id_project: id,
      pekerjaan: pekerjaan,
    };

    // Tambahkan other_file ke criteria hanya jika pekerjaan bukan F1 atau F2
    if (other_file !== null) {
      searchCriteria.other_file = other_file;
    }

    const detailProjectPendukung = await DetailProjectPendukung.findOne({
      where: searchCriteria,
    });

    if (!detailProjectPendukung) {
      return res.status(404).json({ error: 'DetailProjectPendukung not found' });
    }

    // Tentukan customFileName sesuai dengan logika create, tanpa mengubah nama file yang sudah ada
    let customFileName;
    if (pekerjaan === 'F1') {
      customFileName = `${id}_Form Pendaftaran.pdf`;
    } else if (pekerjaan === 'F2') {
      customFileName = `${id}_Informasi Pekerjaan.pdf`;
    } else if (pekerjaan === 'F3') {
      if (other_file === 'Form F3.pdf') {
        customFileName = `${id}_Form F3.pdf`;
      } else if (other_file === 'Form F3.docx') {
        customFileName = `${id}_Form F3.docx`;
      }
    } else if (pekerjaan === 'F4') {
      if (other_file === 'Gambar.pdf') {
        customFileName = `${id}_Gambar.pdf`;
      } else if (other_file === 'Analisa Struktur.pdf') {
        customFileName = `${id}_Analisa Struktur.pdf`;
      } else if (other_file === 'Spek Teknis.pdf') {
        customFileName = `${id}_Spek Teknis.pdf`;
      } else if (other_file === 'Perhitungan Air Hujan.pdf') {
        customFileName = `${id}_Perhitungan Air Hujan.pdf`;
      } else if (other_file === 'Perhitungan Air Bersih.pdf') {
        customFileName = `${id}_Perhitungan Air Bersih.pdf`;
      } else if (other_file === 'Perhitungan Air Kotor.pdf') {
        customFileName = `${id}_Perhitungan Air Kotor.pdf`;
      } else if (other_file === 'Kajian dan Simak (SLF).pdf') {
        customFileName = `${id}_Kajian dan Simak (SLF).pdf`;
      }
    }

    // Simpan file yang diupload (jika ada) ke dalam folder uploads dengan nama sesuai `customFileName`
    if (req.file) {
      const fs = require('fs');
      const path = require('path');

      // Path lengkap ke file yang diupload
      const uploadPath = path.join(__dirname, '../uploads', customFileName);

      // Hapus file lama jika ada dan digantikan
      if (fs.existsSync(uploadPath)) {
        fs.unlinkSync(uploadPath);
      }

      // Pindahkan file baru dengan nama customFileName
      fs.renameSync(req.file.path, uploadPath);

      // Update data pada database
      await detailProjectPendukung.update({
        file: customFileName,
        other_file: other_file
      });
    } else {
      // Update hanya `other_file` jika tidak ada file baru yang diupload
      await detailProjectPendukung.update({
        other_file: other_file
      });
    }

    res.status(200).json({
      id_project_pendukung: detailProjectPendukung.id_project_pendukung,
      id_project: detailProjectPendukung.id_project,
      file: detailProjectPendukung.file,
      other_file: detailProjectPendukung.other_file,
      pekerjaan: detailProjectPendukung.pekerjaan,
      createdAt: detailProjectPendukung.createdAt,
      updatedAt: detailProjectPendukung.updatedAt,
      deletedAt: detailProjectPendukung.deletedAt,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
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