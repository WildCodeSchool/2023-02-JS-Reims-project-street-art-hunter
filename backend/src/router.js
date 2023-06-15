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

const artistControllers = require("./controllers/artistControllers");

router.get("/artists", artistControllers.browse);
router.get("/artists/:id", artistControllers.read);
router.put("/artists/:id", artistControllers.edit);
router.post("/artists", artistControllers.add);
router.delete("/artists/:id", artistControllers.destroy);

const userControllers = require("./controllers/userControllers");

router.get("/users/scores", userControllers.scores);
router.get("/users/:id/score", userControllers.score);

router.get("/users/:id/gallery", userControllers.gallery);

router.get("/users/:id/friends", userControllers.friends);

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.post("/users", userControllers.add);
router.delete("/users/:id", userControllers.destroy);

const authControllers = require("./controllers/authControllers");

router.post("/login", authControllers.login);

const friendsControllers = require("./controllers/friendsControllers");

router.get("/friends", friendsControllers.browse);
router.get("/friends/:id", friendsControllers.read);
router.put("/friends/:id", friendsControllers.edit);
router.post("/friends", friendsControllers.add);
router.delete("/friends/:id", friendsControllers.destroy);

module.exports = router;
