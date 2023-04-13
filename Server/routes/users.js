const upload = require("../config/multer.js");
const {verifyToken} = require("../middleware/auth.js")

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
} = require ("../controllers/post")
const { User } = require("../models/user");
const router = express.Router();



router.post("/",UserSignup);
router.post('/login', userLogin)
router.post('/otplogin/:email', otpLogin)
router.post("/verifyToken", verifyToken);

// Post add

//post get n post.
router.get('/user/:id',verifyToken, getUser);
router.get('/search-users', getUsers);

router.get('/getNotFollowingUsers/:id', getNotFollowingUsers);

//followers and followings
router.get('/getFollowers/:id', getFollowers);
router.get('/getFollowings/:id', getFollowings);



router.put('/follow/:id',followUser)
router.put('/unfollow/:id',unfollowUser)

//Edit Profile
router.put('/profile/:id',verifyToken, editUserProfile)
router.put('/profilebio/:id',verifyToken, editUserProfileBio)

//post
router.post('/add-post/:id',verifyToken,  upload.single('image'), createPost);
router.post('/profile-pic/:id',verifyToken, upload.single('image'), addProfilePic);

router.get('/getUserPost/:id',verifyToken, getUserPost);

router.get('/getPosts',verifyToken, getPosts);
router.get('/user-post/:id', verifyToken, getUserPost);

/* UPDATE */
router.patch("/posts/like/:id",verifyToken, likePost);
router.patch("/posts/comment/:id",verifyToken, commentPost);




router.post("/sendOtp", userOtpSend)


//delete
router.delete('/post/:id',deletePost);


//report
router.post('/posts/:id/:reason',reportPost);


//Notifications
router.get('/notifications/:id',verifyToken, getNotifications)



module.exports = router;
