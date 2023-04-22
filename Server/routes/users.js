const upload = require("../config/multer.js");
const { verifyToken } = require("../middleware/auth.js");

const express = require("express");
const {
  UserSignup,
  userLogin,
  getUser,
  getUsers,
  followUser,
  unfollowUser,
  getNotFollowingUsers,
  getFollowers,
  getFollowings,
  userOtpSend,
  addProfilePic,
  otpLogin,
  editUserProfile,
  editUserProfileBio,
  getNotifications,
} = require("../controllers/user");

const {
  createPost,
  getPosts,
  likePost,
  commentPost,
  getUserPost,
  deletePost,
  reportPost,
} = require("../controllers/post");
const { User } = require("../models/user");
const router = express.Router();

router.post("/", UserSignup);
router.post("/login", userLogin);
router.post("/otplogin/:email", otpLogin);
router.post("/sendOtp", userOtpSend);

// Post Routes

//User Needs.
router.get("/user/:id", verifyToken, getUser);
router.get("/search-users", verifyToken, getUsers);

//followers and followings
router.get("/getNotFollowingUsers/:id", verifyToken, getNotFollowingUsers);
router.get("/getFollowers/:id", verifyToken, getFollowers);
router.get("/getFollowings/:id", verifyToken, getFollowings);
router.put("/follow/:id", verifyToken, followUser);
router.put("/unfollow/:id", verifyToken, unfollowUser);

//Profile
router.put("/profile/:id", verifyToken, editUserProfile);
router.put("/profilebio/:id", verifyToken, editUserProfileBio);

//post
router.post("/add-post/:id", verifyToken, upload.single("image"), createPost);
router.post(
  "/profile-pic/:id",
  verifyToken,
  upload.single("image"),
  addProfilePic
);

router.get("/getUserPost/:id", verifyToken, getUserPost);

router.get("/getPosts", verifyToken, getPosts);
router.get("/user-post/:id", verifyToken, getUserPost);

/* UPDATE */
router.patch("/posts/like/:id", verifyToken, likePost);
router.patch("/posts/comment/:id", verifyToken, commentPost);

//delete
router.delete("/post/:id", verifyToken, deletePost);
//report
router.post("/posts/:id/:reason", verifyToken, reportPost);

//Notifications
router.get("/notifications/:id", verifyToken, getNotifications);

module.exports = router;
