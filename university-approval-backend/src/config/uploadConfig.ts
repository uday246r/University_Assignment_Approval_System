import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";
import { Request } from "express";

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    const error: any = new Error("Only PDF files are allowed.");
    cb(error, false);
  }
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "assignments",      
      resource_type: "raw",  
      allowed_formats: ["pdf"],     
    };
  },
});

export const upload = multer({
  storage,
  fileFilter,
//   limits: {
//     fileSize: 10 * 1024 * 1024, 
//   },
});