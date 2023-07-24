const express = require("express");

const router = express.Router();

const cors = require("cors");

const multer = require("multer");

const upload = multer({ dest: "./public/upload/" });

const middleware = require("./services/middleware");

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

const artistControllers = require("./controllers/artistControllers");

const messageControllers = require("./controllers/messageControllers");

// route public

// items

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);

// street-arts

router.get("/street-arts", streetArtControllers.browse);
router.get("/street-arts/:id", streetArtControllers.read);

// artists

router.get("/artists", artistControllers.browse);
router.get("/artists/:id", artistControllers.read);
router.put("/artists/:id", artistControllers.edit);
router.post("/artists", artistControllers.add);
router.delete("/artists/:id", artistControllers.destroy);

// score

router.get("/users/scores", userControllers.scores);
router.get("/users/:id/score", userControllers.score);

// gallery

router.get("/users/:id/gallery", userControllers.gallery);
router.get("/users/gallery", verifyToken, userControllers.galleryByUser);

// friends

router.get(
  "/users/friends_request",
  verifyToken,
  userControllers.editFriendsRequest
);
router.put("/users/friends_request", friendsControllers.edit);
router.delete("/users/friends_request", friendsControllers.destroy);

router.get(
  "/users/friends_pending",
  verifyToken,
  userControllers.editFriendsPending
);
router.post("/users/:id/friends_pending", userControllers.add);
router.delete("/users/:id/friends_pending", userControllers.destroy);
// messages

router.get("/messages", messageControllers.browse);
router.get("/messages/:id", messageControllers.read);

// users
router.get("/users/friends", verifyToken, userControllers.friends);

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

// route veryf
router.use(verifyToken);

// route privée

const galleryControllers = require("./controllers/galleryControllers");

router.get("/gallery", galleryControllers.browse);
router.get("/gallery/:id", galleryControllers.read);
router.put("/gallery/:id", galleryControllers.edit);
router.post(
  "/gallery",

  upload.single("gallery"),
  middleware.checkLocation,
  middleware.checkToGallery,
  middleware.uploadRename,
  galleryControllers.add
);
router.delete("/gallery/:id", galleryControllers.destroy);

router.get("/friends", friendsControllers.browse);
router.get("/friends/:id", friendsControllers.read);

router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);

router.delete("/items/:id", itemControllers.destroy);

router.put("/street-arts/:id", streetArtControllers.edit);
router.post(
  "/street-arts",
  upload.single("streetArt"),
  middleware.checkIdStreeArt,
  middleware.uploadRename,
  streetArtControllers.addUsers
);
router.delete("/street-arts/:id", streetArtControllers.destroy);

router.put("/friends/:id", friendsControllers.edit);
router.post("/friends", middleware.checkByUsername, friendsControllers.add);
router.delete("/friends/:id", friendsControllers.destroy);

router.put("/messages/:id", messageControllers.edit);
router.post("/messages", messageControllers.add);
router.delete("/messages/:id", messageControllers.destroy);
router.get("/messages/friends/:id_friendship", messageControllers.getMessage);
router.post("/messages/friends/:id_friendship", messageControllers.postMessage);

router.get("/street-arts-pending", galleryControllers.galleryByNotValid);

module.exports = router;
