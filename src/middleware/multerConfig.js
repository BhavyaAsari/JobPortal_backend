import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path to resume upload directory
const uploadPath = path.join(__dirname,"../uploads/resumes");

// Defines where and how files should be stored
const storage = multer.diskStorage({

      // Destination folder where resumes will be saved
    destination:(req,file,cb) => {

        cb(null,uploadPath);
    },


      // Generate unique filename to avoid overwriting files
    filename:(req,file,cb) => {

          const uniqueName = `${Date.now()}-${file.originalname}`;
         cb(null, uniqueName);
    },
});


// Restricts upload to PDF and DOC/DOCX files only
const fileFilter = (req,file,cb) => {

    const ext = path.extname(file.originalname);

    if(ext !== ".pdf" && ext !== ".doc" && ext !== ".docx") {
        
        return  cb(new Error("Only PDF or DOC file allowed"),false);
    }

    cb(null,true);
};

// Initialize multer with storage and file validation
const upload = multer({

    storage,
    fileFilter,
});

export default upload;