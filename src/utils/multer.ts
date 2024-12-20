import multer from 'multer';
import fs from 'fs';
import path from 'path';

const FILE_LOCATION = process.env.FILE_LOCATION || ''; // Use an empty string as a default if the env variable is not defined

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(FILE_LOCATION, `public/`);
    if (!fs.existsSync(uploadDir)) {
      // Create the parent directory if it doesn't exist
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  }
});


export const image = (fieldName: string) => {
  return multer({
    storage: Storage,
    fileFilter: (req, file, cb) => {
      cb(null, true);
    }
  }).single(fieldName);

};

