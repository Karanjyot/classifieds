const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

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

module.exports = router;
