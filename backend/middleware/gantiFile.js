const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads')); // Menentukan folder penyimpanan
  },
  filename: (req, file, cb) => {
    // Mengambil nama file lama dari request (misalnya, melalui body atau parameter)
    const oldFileName = req.body.oldFileName;  // Anda bisa mengirimkan oldFileName di body request
    console.log(oldFileName)
    const fileName = oldFileName || Date.now() + path.extname(file.originalname); // Jika file lama ada, pakai nama itu
    cb(null, fileName);  // Menyimpan file dengan nama yang ditentukan
  }
});

// Filter file yang diterima (PDF, DOC, DOCX)
const fileFilter = (req, file, cb) => {
  if (['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.mimetype)) {
    cb(null, true); // Terima file
  } else {
    cb(null, false); // Tolak file jika tipe mimetype tidak valid
  }
};

// Konfigurasi multer
const gantifile = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // Maksimal ukuran file 10MB
}).single('file');  // File yang diupload diharapkan bernama 'file' di form

module.exports = gantifile;
