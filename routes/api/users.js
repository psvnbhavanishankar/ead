const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
var csvPath = path.join(__dirname, '..', '..', 'All_India_Advocate_List');
const crypto = require('crypto');

const Token = require('../../models/Token');
const Token_Lawyer = require('../../models/Token_Lawyer');
const User = require('../../models/Client');
const Lawyer = require('../../models/Lawyer');
const LawyerProfile = require('../../models/LawyerProfile');
const ClientProfile = require('../../models/ClientProfile');

var smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'onlineplatformforlegalservices@gmail.com',
    pass: 'yuvraj12'
  }
});

// @route POST api/users
// @desc Register user
// @access Public

router.get('/confirmation/:id', async (req, res) => {
  const { name, email, password } = req.body;
  const id = req.params.id;
  try {
    console.log(req.body);
    console.log(id);

    Token.findOne({ token: id }, function(err, token) {
      if (!token)
        return res.status(400).send({
          type: 'not-verified',
          msg:
            'We were unable to find a valid token. Your token my have expired.'
        });

      // If we found a token, find a matching user
      User.findOne({ _id: token._userId }, function(err, user) {
        if (!user)
          return res
            .status(400)
            .send({ msg: 'We were unable to find a user for this token.' });
        if (user.isVerified)
          return res.status(400).send({
            type: 'already-verified',
            msg: 'This user has already been verified.'
          });

        // Verify and save the user
        user.isVerified = true;
        user.save(function(err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          res.status(200).send('The account has been verified. Please log in.');
        });
      });
    });

    // jwt.sign(
    //   payload,
    //   config.get('jwtSecret'),
    //   { expiresIn: 360000000 },
    //   (err, token) => {
    //     if (err) throw err;
    //     res.json({ token });
    //   }
    // );
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/sendmail',
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
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const client = new ClientProfile({ user });
      await client.save();

      const payload = {
        user: {
          id: user.id
        }
      };
      var token = new Token({
        _userId: user._id,
        token: crypto.randomBytes(16).toString('hex')
      });
      token.save(function(err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
      });

      link = 'http://localhost:5000/verify?id=' + token;
      console.log(token);
      // var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
      var mailOptions = {
        from: 'onlineplatformforlegalservices@gmail.com',
        to: user.email,
        subject: 'Account Verification Token',
        text:
          'Hello,\n\n' +
          'Please verify your account by clicking the link: \nhttp://' +
          req.headers.host +
          '/api/users/confirmation/' +
          token.token +
          '.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        res.status(200).json({
          msg: 'A verification email has been sent to ' + user.email + '.'
        });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/confirmation_lawyer/:id', async (req, res) => {
  const { name, email, password } = req.body;
  const id = req.params.id;
  try {
    console.log(req.body);

    Token_Lawyer.findOne({ token: id }, function(err, token) {
      if (!token)
        return res.status(400).send({
          type: 'not-verified',
          msg:
            'We were unable to find a valid token. Your token my have expired.'
        });

      // If we found a token, find a matching user
      Lawyer.findOne({ _id: token._userId }, function(err, user) {
        if (!user)
          return res
            .status(400)
            .send({ msg: 'We were unable to find a user for this token.' });
        if (user.isVerified)
          return res.status(400).send({
            type: 'already-verified',
            msg: 'This user has already been verified.'
          });

        // Verify and save the user
        user.isVerified = true;
        user.save(function(err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          res.status(200).send('The account has been verified. Please log in.');
        });
      });
    });

    // jwt.sign(
    //   payload,
    //   config.get('jwtSecret'),
    //   { expiresIn: 360000000 },
    //   (err, token) => {
    //     if (err) throw err;
    //     res.json({ token });
    //   }
    // );
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/lawyer_sendmail',
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

      const lawyer = new LawyerProfile({ user });
      await lawyer.save();

      const payload = {
        user: {
          id: user.id
        }
      };
      var token = new Token_Lawyer({
        _userId: user._id,
        token: crypto.randomBytes(16).toString('hex')
      });
      token.save(function(err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
      });

      console.log(token);
      // var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
      var mailOptions = {
        from: 'onlineplatformforlegalservices@gmail.com',
        to: user.email,
        subject: 'Account Verification Token',
        text:
          'Hello,\n\n' +
          'Please verify your account by clicking the link: \nhttp://' +
          req.headers.host +
          '/api/users/confirmation_lawyer/' +
          token.token +
          '.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        res
          .status(200)
          .send('A verification email has been sent to ' + user.email + '.');
      });
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
        if (r != 1)
          res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
