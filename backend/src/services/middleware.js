const fs = require("fs");
const models = require("../models");

const uploadDelete = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      throw err;
    }
  });
};

const checkToGallery = (req, res, next) => {
  req.body.id = req.payload.sub;
  models.gallery
    .checkToGallery(req.body)
    .then(([rows]) => {
      if (rows[0] != null) {
        uploadDelete(req.file.path);
        res.status(200).send({ text: "posséder" });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const checkLocation = (req, res, next) => {
  models.streetArt
    .checkLocation(req.body)
    .then(([rows]) => {
      if (rows[0] == null) {
        uploadDelete(req.file.path);
        res.status(200).send({ text: "notExist" });
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

const checkIdStreeArt = (req, res, next) => {
  req.body.id = req.payload.sub;
  models.streetArt
    .findEndId()
    .then(([rows]) => {
      if (rows[0]) {
        req.body.id_street_art = rows[0].id + 1;
      } else {
        req.body.id_street_art = 1;
      }
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const checkByUsername = (req, res, next) => {
  models.user.findUserByUsername(req.body.username).then(([rows]) => {
    req.body.id = rows[0].id;
    next();
  });
};

module.exports = {
  uploadRename,
  checkLocation,
  checkIdStreeArt,
  checkToGallery,
  checkByUsername,
};
