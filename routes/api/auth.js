const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/Client');
const Lawyer = require('../../models/Lawyer');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

// @route GET api/auth
// @desc Test Route
// @access Public

router.get('/', auth, async (req, res) => {
  try {
    var user = await User.findById(req.user.id).select('-password');
    if (!user) {
      user = await Lawyer.findById(req.user.id).select('-password');
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/auth
// @desc Authenticate user and get token
// @access Public

router.post(
  '/',
  [
    check('email', 'Please include a valid email address').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        let user = await Lawyer.findOne({ email });
        console.log(user);
        if (!user) {
          console.log(1);
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        console.log(user);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);

        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        if (!user.isVerified) {
          return res.status(400).json({
            errors: [
              {
                msg: 'Email not verified. Please check the verification email.'
              }
            ]
          });
        }

        const payload = {
          user: {
            id: user.id
          }
        };

        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 360000000 },
          (err, token) => {
            if (err) throw err;
            return res.json({ token: token, type: 'lawyer' });
          }
        );
      } else {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        console.log(user);
        if (!user.isVerified) {
          return res.status(400).json({
            errors: [
              {
                msg: 'Email not verified. Please check the verification email.'
              }
            ]
          });
        }

        const payload = {
          user: {
            id: user.id
          }
        };

        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 360000000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token: token, type: 'client' });
          }
        );
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
