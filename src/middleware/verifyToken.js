const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;
const MASTER_KEY = process.env.MASTER_KEY;

const verifyUser = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send({ error: { message: "access denieds" } });

    try {
        console.log('token', token)
        console.log('JWT_KEY', JWT_KEY)
        // console.log('jwt.verify(token, JWT_KEY)', jwt.verify(token, JWT_KEY))
      req.user = jwt.verify(token, JWT_KEY);
      next();
    } catch (err) {
      res.status(400).send({ error: { message: "invalid tokenn" } });
    }
};

const verifyAdmin = (req, res, next) => {
    //const token = req.header("admin-token");
    let token = req.header("Authorization");
    token = token.split(" ")[1];
    token = token.trim();
    token = token.replace(/['"]+/g, '');
    if (!token) return res.status(400).send("access denied");

    try {
      const verifiedAdmin = jwt.verify(token, MASTER_KEY);
      req.admin = verifiedAdmin;
      next();
    } catch (err) {
      res.status(400).send("invalid token");
    }
};

module.exports = { verifyUser, verifyAdmin }
