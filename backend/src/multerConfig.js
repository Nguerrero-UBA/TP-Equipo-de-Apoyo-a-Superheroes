const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Verifica que el archivo sea una imagen
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('El archivo debe ser una imagen'), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
