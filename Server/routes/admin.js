const router = require("express").Router();
const { Admin, validate } = require("../models/admin");
const bcrypt = require("bcrypt");
const adminController = require("../controllers/admin");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const admin = await Admin.findOne({ email: req.body.email });
    if (admin)
      return res
        .status(409)
        .send({ message: "admin with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new Admin({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "admin created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/signUp", adminController.AdminSignup);
router.get("/getAllUsers", adminController.getAllUser);
router.get("/getAllPosts", adminController.getAllPost);

router.get("/getUserCount", adminController.getUserCount);
router.get("/getPostCount", adminController.getPostCount);
router.get("/getReportCount", adminController.getReportCount);

router.post("/login", adminController.AdminLogin);

router.patch("/block/:id", adminController.blockStaff);
router.patch("/unblock/:id", adminController.unblockStaff);

router.patch("/blockpost/:id", adminController.blockPost);
router.patch("/unblockpost/:id", adminController.unblockPost);

module.exports = router;
