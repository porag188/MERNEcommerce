const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
//Item model
const User = require('../../models/User');
//@route    GET api/auth
//@desc     Auth user
//@acess    Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  //validations
  if (!email || !password) {
    return res.status(400).json({ msg: 'Plase enter all fields' });
  }
  //Check user validations
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: 'User Does not exists' });
    //validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid Password' });
      jwt.sign(
        { id: user.id },
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});
//@route    GET api/auth/user
//@desc     Get user data
//@acess    Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;
