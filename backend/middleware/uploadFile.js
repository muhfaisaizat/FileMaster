const multer = require('multer');
const path = require('path');

// Configure file storage for multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // File storage location
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname); // Jika file lama ada, pakai nama itu
    cb(null, fileName);  // Menyimpan file dengan nama yang ditentukan
}
});


// Set file filter to accept only PDF, DOC, and DOCX
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/msword' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(null, false); // Reject the file
  }
};

// Set up multer middleware
const upload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10MB
}).single('file'); // Expecting a single file upload with field name 'file'

module.exports = upload;
