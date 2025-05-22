const multer = require("multer");
const path = require("path");

// files storage
const genericStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extention = path.extname(file.originalname);
    cb(null, uniquePrefix + extention);
  },
});
// const imagesStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/images");
//   },
//   filename: function (req, file, cb) {
//     const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const extention = path.extname(file.originalname);
//     cb(null, uniquePrefix + extention);
//   },
// });

// const videosStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/videos");
//   },
//   filename: function (req, file, cb) {
//     const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const extention = path.extname(file.originalname);
//     cb(null, uniquePrefix + extention);
//   },
// });

// const filesStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/files");
//   },
//   filename: function (req, file, cb) {
//     const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const extention = path.extname(file.originalname);
//     cb(null, uniquePrefix + extention);
//   },
// });

// files filter

// const genericFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "video/mp4" ||
//     file.mimetype === "application/pdf"
//   ) {
//     cb(null, true);
//   } else {
//     cb({ message: "Unsupported File Format" }, false);
//   }
// }

// const imageFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg"
//   ) {
//     cb(null, true);
//   } else {
//     cb({ message: "Unsupported File Format" }, false);
//   }
// };

// const videoFilter = (req, file, cb) => {
//   if (file.mimetype === "video/mp4") {
//     cb(null, true);
//   } else {
//     cb({ message: "Unsupported File Format" }, false);
//   }
// };

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "application/pdf") {
//     cb(null, true);
//   } else {
//     cb({ message: "Unsupported File Format" }, false);
//   }
// };

// files uploaders

exports.genericUploader = multer({
  storage: genericStorage,
});

// exports.uploadImages = multer({
//   storage: imagesStorage,
//   fileFilter: imageFilter,
// });

// exports.uploadVideos = multer({
//   storage: videosStorage,
//   fileFilter: videoFilter,
// });

// exports.uploadFiles = multer({
//   storage: filesStorage,
//   fileFilter,
// });
