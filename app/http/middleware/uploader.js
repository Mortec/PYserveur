const multer = require('multer');
const __rootDir = require('../../utils/rootDir');


exports.avatar = multer({
  // Send to /path/to/temporary/directory/to/store/iploaded/files 
  dest: __rootDir + '/storage/temp/',
  limits: {
    files: 1, 
    fieldSize: 5e6,
  }
});
