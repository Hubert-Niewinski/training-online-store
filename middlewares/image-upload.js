const multer = require("multer");
const uuid = require("uuid").v4;
const env = require("../config/environment");

const upload = multer({
  storage: multer.diskStorage({
    destination: env.filesDestination,
    filename: (req, file, cb) => {
      cb(null, uuid() + "-" + file.originalname);
    },
  }),
});

const configuredMulterMiddleware = upload.single("image");

module.exports = configuredMulterMiddleware;
