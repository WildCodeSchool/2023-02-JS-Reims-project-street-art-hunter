const models = require("../models");

const browse = (req, res) => {
  models.streetArt
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.streetArt
    .findWithArtist(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const streetArt = req.body;

  // TODO validations (length, format...)

  streetArt.id = parseInt(req.params.id, 10);

  models.streetArt
    .update(streetArt)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addUsers = (req, res) => {
  const streetArt = req.body;

  // TODO validations (length, format...)

  models.streetArt
    .insertFromUsers(streetArt)
    .then(([result]) => {
      res.location(`/streetArts/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const addAdministrator = (req, res) => {
  const streetArt = req.body;

  // TODO validations (length, format...)

  models.streetArt
    .insertFromAdministrator(streetArt)
    .then(([result]) => {
      res.location(`/streetArts/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.streetArt
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  addUsers,
  addAdministrator,
  destroy,
};
