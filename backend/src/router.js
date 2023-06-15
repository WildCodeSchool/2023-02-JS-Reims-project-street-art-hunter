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

const messageControllers = require("./controllers/messageControllers");

router.get("/messages", messageControllers.browse);
router.get("/messages/:id", messageControllers.read);
router.put("/messages/:id", messageControllers.edit);
router.post("/messages", messageControllers.add);
router.delete("/messages/:id", messageControllers.destroy);
router.get("/messages/friends/:id_friendship", messageControllers.getMessage);
router.post("/messages/friends/:id_friendship", messageControllers.postMessage);

module.exports = router;
