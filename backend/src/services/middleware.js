const fs = require("fs");
const models = require("../models");

const uploadDelete = (path, res) => {
  fs.unlink(path, (err) => {
    if (err) {
      throw err;
    }
    res.sendStatus(404);
  });
};

const checkLocation = (req, res, next) => {
  models.streetArt
    .checkLocation(req.body)
    .then(([rows]) => {
      if (rows[0] == null) {
        uploadDelete(req.file.path, res);
      } else {
        req.body.id_street_art = rows[0].id;
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const uploadRename = (req, res, next) => {
  const { fieldname, filename, mimetype, destination } = req.file;
  const newFileName = `${fieldname}-${req.body.id}-${req.body.id_street_art}`;
  const typeFile = mimetype.replace("image/", "");
  req.body.imgURL = `${destination.replace(
    "./public",
    ""
  )}${newFileName}.${typeFile}`;
  fs.rename(
    `${destination}${filename}`,
    `${destination}${newFileName}.${typeFile}`,
    (err) => {
      if (err) throw err;
      next();
    }
  );
};

module.exports = {
  uploadRename,
  checkLocation,
};
