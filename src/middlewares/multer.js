import multer from "multer";

const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");
console.log('single upload ')