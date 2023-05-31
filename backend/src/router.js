const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

const streetArtControllers = require("./controllers/streetArtControllers");

router.get("/streetArts", streetArtControllers.browse);
router.get("/streetArts/:id", streetArtControllers.read);
router.put("/streetArts/:id", streetArtControllers.edit);
router.post("/streetArts", streetArtControllers.add);
router.delete("/streetArts/:id", streetArtControllers.destroy);

module.exports = router;
