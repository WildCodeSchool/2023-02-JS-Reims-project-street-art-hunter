const express = require("express");

const router = express.Router();

const cors = require("cors");

router.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./middleware/auth");

// require des controllers

const itemControllers = require("./controllers/itemControllers");

const streetArtControllers = require("./controllers/streetArtControllers");

const userControllers = require("./controllers/userControllers");

const friendsControllers = require("./controllers/friendsControllers");

// route public

// items

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);

// street-arts

router.get("/street-arts", streetArtControllers.browse);
router.get("/street-arts/:id", streetArtControllers.read);

// score

router.get("/users/scores", userControllers.scores);
router.get("/users/:id/score", userControllers.score);

// gallery

router.get("/users/:id/gallery", userControllers.gallery);

// friends

router.get("/users/:id/friends", userControllers.friends);

// users

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", hashPassword, userControllers.edit);
router.post("/users", hashPassword, userControllers.add);
router.delete("/users/:id", userControllers.destroy);

// login

router.post(
  "/login",
  userControllers.getUserByUsernameWithPasswordAndPassToNext,
  verifyPassword
);

// friends

router.get("/friends", friendsControllers.browse);
router.get("/friends/:id", friendsControllers.read);

// route privée

router.use(verifyToken);

router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.put("/street-arts/:id", streetArtControllers.edit);
router.post("/street-arts", streetArtControllers.add);
router.delete("/street-arts/:id", streetArtControllers.destroy);

router.put("/friends/:id", friendsControllers.edit);
router.post("/friends", friendsControllers.add);
router.delete("/friends/:id", friendsControllers.destroy);

module.exports = router;
