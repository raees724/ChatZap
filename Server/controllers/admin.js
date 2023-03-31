var Loginvalidate = require('../utils/validate')
const { Admin, validate } = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require('../models/user');

const adminController = {
// Admin SignUp
AdminSignup: async (req, res) => {
  console.log('888888888888')
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const admin = await Admin.findOne({ email: req.body.email });
		if (admin)
			return res
				.status(409)
				.send({ message: "Admin with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new Admin({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "Admin created successfully" });
	} catch (error) {
    console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
},

//Admin Login
// AdminLogin:  async (req, res) => {
//   try {
//     var { error } = Loginvalidate(req.body);
//     if (error)
//       return res.status(400).send({ message: error.details[0].message });

//     var admin = await Admin.findOne({ email: req.body.email });
//     if (!admin)
//       return res.status(401).send({ message: "Invalid Email or Password" });

//     var validPassword = await bcrypt.compare(req.body.password, admin.password);
//     if (!validPassword)
//       return res.status(401).send({ message: "Invalid Email or Password" });

//     var token = admin.generateAuthToken();
//     res
//       .status(200)
//       .json({ token, admin });
//   } catch (error) {
//     res.status(500).send({ message: "Internal Server Error" });
//   }


// },

AdminLogin: async (req, res) => {
  console.log("fffffffffffffff");
  try {
    var { error } = Loginvalidate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    var admin = await Admin.findOne({ email: req.body.email });
    if (!admin)
      return res.status(401).send({ message: "Invalid Email or Password" });

    var validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Emailor Password" });

    var token = admin.generateAuthToken();
    console.log(
      token,"This is Token",
      admin,
      "dddddddddddddddddddddddddddddddddddddddddddddddddd"
    );
    res.status(200).json({ token, admin });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
},

//  getUser :async (req, res) => {
    
//   const userId = req.params.id
//   try {
//       const user = await User.findById(userId);
      
//       res.status(200).json(user)
//   } catch (error) {
//       res.status(500).json(error)
//   }
// },


//Verify Token

//Verify Token

//Verify Token
verifyToken: async (req, res) => {
  try {
    console.log('5444444444 => ',req)
    console.log('5444444444 => ',req.headers)
    const Token = req.body.Token;
    const decoded = jwt.verify(Token, process.env.JWTPRIVATEKEY);
    const email = decoded.email;
    const admin = await Admin.findOne({ email: email });
    if (admin.image) admin.image = `http://localhost:9000/${admin.image}`;
    else
      admin.image = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`;
    return res.status(200).json({ message: "token valid", admin });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
},


// Get users to admin side.
getAllUser: async (req, res) => {
  try {
    const user = await User.find().select("-password");
    console.log(user , "////////////");
    if (!user)
      return res
        .status(500)
        .json({ message: "didnt got users from database" });

    res.status(200).json({ message: "Success", user });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
},


blockStaff :async (req, res) => {
  console.log('hiiii');
  try {
    let id = req.params.id   
    console.log(id,'iiiiiiiii'); 

    const user = await User.findByIdAndUpdate(
      { _id: Object(id) },
      { $set: { Block: true } }
    );

    res.json(user);
  } catch (err) {
    console.log(err);
  }
},

unblockStaff :async (req, res) => {
  let id = req.params.id  
  console.log(id,'uuuuuuuuuuuuu');
  try {
    console.log("unblock");
    // const {id} = req.body
    const user = await User.findByIdAndUpdate(
      { _id: Object(id) },
      { $set: { Block: false } }
    );

    res.json(user);
  } catch (err) {
    console.log(err);
  }
},


}

module.exports = adminController;