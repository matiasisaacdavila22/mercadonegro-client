const {validationResult} = require('express-validator')
const multer = require('multer');
const path = require('path');

//module.exports = {

 function getMulterStorageConfig (fileruta, filename){
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, path.join(__dirname, fileruta));
        },
        filename: (req, file, cb) => {
          const newFileName =
          filename + Date.now() + path.extname(file.originalname);
          cb(null, newFileName);
        },
      });
      return storage;
}
/*
storeFileToPath: (storePath, filename, req, res, acceptedExt)  =>{
    const storage = this.getMulterStorageConfig(storePath, filename);
    const upload = multer({
      storage : storage,
      fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname).toUpperCase();
        if(acceptedExt.includes(ext)){
          return callback(null, true);
        }
        return callback(new HttpError[400]('this format file is no compatible'));
      },
      limits:{
        fileSize:1024*1024 
      }
    })
}
}*/
module.exports = getMulterStorageConfig;