const jwt = require("jsonwebtoken");

module.exports={

  verifyToken : async (req, res, next) => {
    try {
      
      let token = req.header("Authorization");
      console.log("token in Server", token)
      
      if (!token) {
        return res.status(403).send("Access Denied");
      }

      if (token.startsWith("Bearer ")) {
          token = token.slice(7, token.length).trimLeft();
      }
      const verified = jwt.verify(token, process.env.JWTPRIVATEKEY);
      req.user = verified;
      console.log("User",req.user)
      next();
      console.log("user verified")
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
}