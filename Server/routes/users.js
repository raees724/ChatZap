// import upload from "../config/multer.js";
const upload = require("../config/multer.js");

const express = require("express");
const {
	UserSignup,
	 userLogin,
	 verifyToken,
	 getUser,
	 getUsers,
	 followUser,
	 unfollowUser,
	 getNotFollowingUsers,
	 getFollowers,
	 getFollowings,
	 userOtpSend,
} = require("../controllers/user");

const {
	createPost,
	getPosts,
	likePost,
	commentPost,
	getUserPost,
	deletePost
} = require ("../controllers/post")
const { User } = require("../models/user");
const router = express.Router();



router.post("/",UserSignup);
router.post('/login', userLogin)
router.post("/verifyToken", verifyToken);

// Post add

//post get n post.
router.get('/user/:id',  getUser);
router.get('/search-users', getUsers);

router.get('/getNotFollowingUsers/:id', getNotFollowingUsers);

//followers and followings
router.get('/getFollowers/:id', getFollowers);
router.get('/getFollowings/:id', getFollowings);



router.put('/follow/:id',followUser)
router.put('/unfollow/:id',unfollowUser)

//post
router.post('/add-post/:id',  upload.single('image'), createPost);

router.get('/getUserPost/:id', getUserPost);

router.get('/getPosts', getPosts);
router.get('/user-post/:id', verifyToken, getUserPost);

/* UPDATE */
router.patch("/posts/like/:id", likePost);
router.patch("/posts/comment/:id", commentPost);



router.post("/sendOtp", userOtpSend)


//delete
router.delete('/post/:id',deletePost);


module.exports = router;
