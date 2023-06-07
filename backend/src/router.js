const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

const streetArtControllers = require("./controllers/streetArtControllers");

router.get("/street-arts", streetArtControllers.browse);
router.get("/street-arts/:id", streetArtControllers.read);
router.put("/street-arts/:id", streetArtControllers.edit);
router.post("/street-arts", streetArtControllers.add);
router.delete("/street-arts/:id", streetArtControllers.destroy);

const userControllers = require("./controllers/userControllers");

router.get("/users/:id/gallery", userControllers.gallery);

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.post("/users", userControllers.add);
router.delete("/users/:id", userControllers.destroy);

const authControllers = require("./controllers/authControllers");

router.post("/login", authControllers.login);
router.get("/users/scores", (req, res) =>
  res.send([
    { id: 1, pseudo: "Player1", score: 200 },
    { id: 2, pseudo: "Player2", score: 100 },
  ])
);
router.get("/users/scores/:id", (req, res) =>
  res.send([{ id: 1, pseudo: "Player1", score: 200 }])
);

module.exports = router;
