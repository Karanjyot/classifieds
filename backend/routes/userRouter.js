const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { json } = require("express");

// async because we are saving to mongodb and that's an async operation
router.post("/register", async (req, res) => {
  // try catch used in async functions to catch error vs promises (.then.catch)
  try {
    //destructure from req.body
    let { email, password, passwordCheck, displayName } = req.body;

    //validation

    if (!email || !password || !passwordCheck)
      // 400 = bad request
      return res.status(400).json({ msg: "not all fields have been entered" });

    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "password needs to be atleast 5 characters long" });

    if (password !== passwordCheck)
      return res.status(400).json({ msg: "passwords do not match" });

    const existingUser = await User.findOne({ email: email });

    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists" });

    if (!displayName) displayName = email;

    // generate salt
    const salt = await bcrypt.genSalt();
    //generate hashed password
    const passwordHash = await bcrypt.hash(password, salt);

    // create new User model
    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });

    //save the new user. Saving is async operation so use await
    const savedUser = await newUser.save();

    // send back savedUser to frontend
    res.json(savedUser);

    // error handling
  } catch (err) {
    //internal server error
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate
    if (!email || !password)
      return res.status(400).json({ msg: "not all fields have been entered" });

    // find user in database
    const user = await User.findOne({ email: email });

    // handle if user is not found in database
    if (!user)
      return res
        .status(400)
        .json({ msg: "no account with this email has been register" });

    // compare the client password to password stored in database
    const isMatch = await bcrypt.compare(password, user.password);

    // Incorrect password handling
    if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });

    // create token if passwords match that stores users id. Verify token with password we create
    const token = jwt.sign({ id: user._id }, process.env.JWT_Secret);

    // if successful login send back token and user info to front end
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
      },
    });

    // error handling
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// route to just provide boolean values for certain conditions relating to the token
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("auth-token");

    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_Secret);

    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);

    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//route to get current logged in user
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({ displayName: user.displayName, id: user._id });
});
module.exports = router;
