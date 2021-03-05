let config = require("../Config/config");
let jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    console.log("header values are", req.headers);
    const token = req.headers.token;
    const verifyUser = jwt.verify(token, config.tokenKey);
    console.log(verifyUser);
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = auth;
