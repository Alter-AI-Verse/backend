import multer from "multer";

const storageConfig = (destination) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  });

const fileFilter = (allowedTypes) => (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid File Type!"), false);
  }
};

export  const upload = multer(
  {
    storage: storageConfig("./public/avatars-covers"),
    fileFilter: fileFilter(["image/png", "image/jpeg", "image/jpg"])
  }
)
export  const uploadDocs = multer(
  {
    storage: storageConfig("./public/docs"),
    fileFilter: fileFilter(["application/pdf", "text/plain", "text/csv", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"])
  }
)
