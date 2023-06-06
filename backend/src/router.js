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
