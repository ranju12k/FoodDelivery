const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const jwtSecret="uR7p2WnFz3qLx8yBvM4iO9tH6sJk0GhE"


// Create a user
router.post("/createuser", [
  body('email').isEmail(),
  body('name').isLength({ min: 4 }),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  body('location').isString(), // Make the location optional
], async (req, res) => {
  const errors = validationResult(req);


  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const salt=await bcrypt.genSalt(10);
  let secPassword=await bcrypt.hash(req.body.password , salt)  //encrypting user password




  try {
    const newUser = new User({
      name: req.body.name,
      password: secPassword,
      email: req.body.email,
      location: req.body.location
    });

    const savedUser = await newUser.save();
    res.json({ success: true, user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Login user


router.post("/loginuser", [
  body('email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const userData = await User.findOne({ email });

    if (!userData) {
      return res.status(400).json({ error: "Invalid email credentials" });
    }

    const pwdCompare=await bcrypt.compare(req.body.password,userData.password)

    if (!pwdCompare) {
      return res.status(400).json({ error: "Invalid password credentials" });
    }
    const data={
      user:{
        id:userData.id
      }
    }

    const authToken=jwt.sign(data,jwtSecret)
    res.json({ success: true,authToken:authToken });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
