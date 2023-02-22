const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
    type: String,
    required: true
},
password: {
    type: String,
    required: true
}
});

module.exports = User = mongoose.model('user', UserSchema);


// --implement a registration--
// route using Node.js, Express, and MongoDB:
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = require('../models/user');

router.post('/register', (req, res) => {
  //validate user input
const { email, password } = req.body;
if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
}

  // Check for existing user
User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const newUser = new User({
        email,
        password
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
            res.json({
            user: {
                id: user.id,email: user.email
            }
          });
        });
      });
    });
  });
}); //Taip turi buti visual studio iskraipo closing tagusjeu istrini white space

//--password check--
router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    // Check for existing user
    User.findOne({ email }).then(user => {
      if (!user) return res.status(400).json({ msg: 'User Does not exist' });
  
      // Validate password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
        res.json({
          user: {
            id: user.id,
            email: user.email
          } });
        });
      });
    });

