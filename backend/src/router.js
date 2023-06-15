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

router.get("users/:id/friendship", userControllers.friendship);

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.post("/users", userControllers.add);
router.delete("/users/:id", userControllers.destroy);

const authControllers = require("./controllers/authControllers");

router.post("/login", authControllers.login);

const friendshipControllers = require("./controllers/friendshipControllers");

router.get("/friendship", friendshipControllers.browse);
router.get("/friendship/:id", friendshipControllers.read);
router.put("/friendship/:id", friendshipControllers.edit);
router.post("/friendship", friendshipControllers.add);
router.delete("/friendship/:id", friendshipControllers.destroy);

module.exports = router;
