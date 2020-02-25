const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
var csvPath = path.join(__dirname, '..', '..', 'All_India_Advocate_List');

const User = require('../../models/Client');
const Lawyer = require('../../models/Lawyer');

// @route POST api/users
// @desc Register user
// @access Public

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email address').isEmail(),
    check(
      'password',
      'Please enter a pasword with 8 or more characters'
    ).isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ erros: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.post(
  '/lawyer',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email address').isEmail(),
    check(
      'password',
      'Please enter a pasword with 8 or more characters'
    ).isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, state, enrollmentno } = req.body;

    try {
      let user = await Lawyer.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ erros: [{ msg: 'User already exists' }] });
      }

      user = new Lawyer({
        name,
        email,
        password,
        state,
        enrollmentno
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.post('/check', async (req, res) => {
  // const errors = validationResult(req);
  // if(!errors.isEmpty()){
  //     return res.status(400).json({errors:errors.array() });
  // }

  const { enrollmentno, name, state } = req.body;

  try {
    var state1 = state.replace(/\s+/, '');
    var r = 0;
    fs.createReadStream(csvPath + '/' + state1 + '.csv')
      .pipe(csv())
      .on('data', row => {
        if (
          row.NAME_OF_ADVOCATE.toUpperCase()
            .replace('SHRI ', '')
            .replace('KU. ', '')
            .replace('SMT. ', '')
            .replace(/\s+/, '') == name.toUpperCase().replace(/\s+/, '') &&
          row.ENROLLMENT_NO == enrollmentno
        ) {
          res.json(req.body);
          r = 1;
        }
      })
      .on('end', () => {
        if (r != 1) res.json({ errors: [{ msg: 'Invalid Credentials' }] });
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
