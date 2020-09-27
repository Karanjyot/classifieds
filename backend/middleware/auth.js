const jwt = require("jsonwebtoken");

// middleware to check token.
const auth = (req, res, next) => {
  try {
    // token is sent in request header
    const token = req.header("auth-token");
    // if no token send 401 error which is not authorized
    if (!token)
      return res
        .status(401)
        .json({ msg: "no authentication token. Access denied." });

    // verify the token. Verified constant will contain the encoded data the token holds.
    const verified = jwt.verify(token, process.env.JWT_Secret);

    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed. Access denied" });

    // save the id from token to req.users
    req.user = verified.id;

    //continue to next function
    next();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = auth;
