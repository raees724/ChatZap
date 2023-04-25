var Loginvalidate = require("../utils/validate");
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userotp = require("../models/userOtp");
const cloudinary = require("../config/cloudinary.js");
const nodemailer = require("nodemailer");
const Notification = require("../models/Notification");

//Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

module.exports = {
  //User SignUp
  UserSignup: async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const user = await User.findOne({ email: req.body.email });
      if (user)
        return res
          .status(409)
          .send({ message: "User with given email already Exist!" });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      await new User({ ...req.body, password: hashPassword }).save();
      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  //User Login
  userLogin: async (req, res) => {
    try {
      var { error } = Loginvalidate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      var user = await User.findOne({ email: req.body.email });

      if (!user)
        return res.status(401).send({ message: "Invalid Email or Password" });

      if (user.Block)
        return res.status(401).send({ message: "You are Blocked !" });

      var validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res.status(401).send({ message: "Invalid Email or Password" });

      var token = user.generateAuthToken();
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  otpLogin: async (req, res) => {
    console.log("ddddd");
    try {
      const email = req.params.email;
      var user = await User.findOne({ email: email });

      console.log("uduudu ", user);

      if (!user)
        return res.status(401).send({ message: "Invalid Email or Password" });

      if (user.Block)
        return res.status(401).send({ message: "You are Blocked !" });

      var token = user.generateAuthToken();
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  //User Send Otp
  userOtpSend: async (req, res) => {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: "Please enter your email" });
    }

    try {
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        const OTP = Math.floor(100000 + Math.random() * 900000);

        const existEmail = await userotp.findOne({ email: email });

        if (existEmail) {
          const updateData = await userotp.findByIdAndUpdate(
            { _id: existEmail._id },
            {
              otp: OTP,
            },
            { new: true }
          );
          await updateData.save();

          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Sending Email for Otp Validation",
            text: `OTP:-${OTP}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("Error", error);
              res.status(400).json({ error: "Email not Send" });
            } else {
              console.log("Email sent", info.response);
              res
                .status(200)
                .json({ message: "Email sent Successfully", otp: OTP });
            }
          });
        } else {
          const saveOtpData = new userotp({ email, otp: OTP });
          await saveOtpData.save();
          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Sending Email for Otp Validation",
            text: `OTP:-${OTP}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("Error", error);
              res.status(400).json({ error: "Email not Send" });
            } else {
              console.log("Email sent", info.response);
              res
                .status(200)
                .json({ message: "Email sent Successfullyy", otp: OTP });
            }
          });
        }
      } else {
        res.status(401).send({ message: "This Email is Not Registerd" });
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid Details", error });
    }
  },

  // Get user
  getUser: async (req, res) => {
    const userId = req.params.id;
    try {
      // console.log('1444444444446666666666666')
      const user = await User.findById(req.params.id);

      // hidden field 51:23
      // console.log("Responce.data",res.data)
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllUser: async (req, res) => {
    try {
      const user = await User.find().select("-password");
      console.log(user, "////////////");
      if (!user)
        return res
          .status(500)
          .json({ message: "didnt got users from database" });

      res.status(200).json({ message: "Success", user });
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
    }
  },

  //Search user
  getUsers: async (req, res) => {
    // const userId = req.params.id
    try {
      console.log(req.query.query);
      const regex = new RegExp(req.query.query, "i");
      const users = await User.find({ username: regex });
      console.log(users);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //Follow user
  followUser: async (req, res) => {
    if (req.body.currentUserId != req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.currentUserId);
        if (!user.followers.includes(req.body.currentUserId)) {
          await user?.updateOne({
            $push: { followers: req.body.currentUserId },
          });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          const notification = new Notification({
            type: "follow",
            user: req.params.id,
            friend: req.body.currentUserId,
            content: "Started Following You",
          });
          await notification.save();

          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you already follow the user");
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    } else {
      console.log("us ", req.params.id);
      console.log("cus ", req.body.currentUserId);
      res.status(403).json("You cant follow yourself");
    }
  },

  //Unfollow users
  unfollowUser: async (req, res) => {
    if (req.body.currentUserId != req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.currentUserId);
        if (user.followers.includes(req.body.currentUserId)) {
          await user.updateOne({
            $pull: { followers: req.body.currentUserId },
          });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You cant unfollow yourself");
    }
  },

  // Not followings
  getNotFollowingUsers: async (req, res) => {
    try {
      const currentUserId = req.params.id;
      const currentUser = await User.findById(currentUserId);

      // Get all users except the current user and those being followed by the current user
      const notFollowingUsers = await User.find({
        _id: { $ne: currentUserId, $nin: currentUser.followings },
      });
      notFollowingUsers.reverse();
      // console.log('notFollowingUsers',notFollowingUsers)
      res.status(200).json(notFollowingUsers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // Followers
  getFollowers: async (req, res) => {
    try {
      const currentUserId = req.params.id;
      const currentUser = await User.findById(currentUserId);

      // Get all users except the current user and those who follow  the current user
      const Followers = await User.find({
        _id: { $ne: currentUserId, $in: currentUser.followers },
      });
      Followers.reverse();
      // console.log('Followers',Followers)
      res.status(200).json(Followers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  //Followings
  getFollowings: async (req, res) => {
    try {
      const currentUserId = req.params.id;
      const currentUser = await User.findById(currentUserId);

      // Get all users except the current user and those being followed by the current user
      const Followings = await User.find({
        _id: { $ne: currentUserId, $in: currentUser.followings },
      });

      res.status(200).json(Followings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  addProfilePic: async (req, res) => {
    try {
      console.log("user id baneeeeeeeee");
      console.log(req.body);
      const id = req.params.id;
      console.log("user id is :", id);
      const { userId } = req.body;
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Users",
      });
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePicture: result.secure_url },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  editUserProfile: async (req, res) => {
    try {
      const { bio, userId, currentPassword, newPassword } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid current password" });
      }

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          bio: bio,
          password: hashedPassword,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //userBio
  editUserProfileBio: async (req, res) => {
    try {
      const { bio, userId } = req.body;

      console.log("Edk etheen", req.body.bio, req.body.userId);

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          bio: bio,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log("eeedk edthi because eede error baaai");
      res.status(500).json(error);
    }
  },

  //Notifications
  getNotifications: async (req, res) => {
    try {
      const id = req.params.id;
      console.log("Notificationl banne id", id);
      const notifiactions = await Notification.find({ user: Object(id) })
        .populate("friend", "username profilePicture")
        .populate("postId", "image")
        .sort({ createdAt: -1 })
        .exec();
      res.status(200).json(notifiactions);
    } catch (err) {
      console.log("notififcation ////", err);
      res.status(500).json(err);
    }
  },
};
