const express = require('express');
const router = express.Router();
// const auth = require('../../middleware/auth');
// const Profile = require('../../models/Profile');
// const User = require('../../models/User');
const { check, validationResult } = require('express-validator/check');

//@route GET api/profile/me
//@access private
// router.get('/me', auth, async (req, res) => {
//   try {
//     console.log(req);
//     console.log('*****');
//     const profile = await Profile.findOne({
//       user: req.user.id
//     }).populate('user', ['_id', 'name', 'avatar', 'email', 'fav_cuisines']);
//     //const profile = await Profile.findOne({ user: req.user.id });
//     if (!profile) {
//       return res
//         .status(400)
//         .json({ msg: 'profile does not exist for this user' });
//     }
//     res.send(profile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'server error' });
//   }
// });

// router.get('/cart', auth, async (req, res) => {
//   try {
//     console.log(req);
//     console.log('*****');
//     const cart = await Profile.findOne({ user: req.user.id }).cart.map(car =>
//       car.populate('recipe', [
//         'title',
//         'images',
//         'video',
//         'ingredients',
//         'cuisine'
//       ])
//     );

//     console.log(cart);
//     //const profile = await Profile.findOne({ user: req.user.id });
//     if (!cart) {
//       return res.status(400).json({ msg: 'cart does not exist for this user' });
//     }
//     res.send(cart);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'server error' });
//   }
// });

// //@route POST api/profile
// //@access private
// // router.post(
// // '/',
// // [
// //   auth,
// //   [
// //     check('skills', 'skills are required')
// //       .not()
// //       .isEmpty()
// //   ]
// // ],
// //   async (req, res) => {
// //     console.log('************');
// //     console.log(req.body);
// //     console.log('#############');
// //     const errors = validationResult(req);
// //     if (!errors.isEmpty()) {
// //       return res.status(400).json({ errors: errors.array() });
// //     }

// //     const { skills, website } = req.body;
// //     const profileFields = {};
// //     profileFields.user = req.user.id;
// //     if (website) profileFields.website = website;
// //     if (skills) {
// //       profileFields.skills = skills.split(',').map(skill => skill.trim());
// //     }
// //     try {
// //       let profile = await Profile.findOne({ user: req.user.id });
// //       if (profile) {
// //         profile = await Profile.findOneAndUpdate(
// //           { user: req.user.id },
// //           { $set: profileFields },
// //           { new: true }
// //         );
// //         return res.json(profile);
// //       }
// //       profile = new Profile(profileFields);
// //       await profile.save();
// //       res.json(profile);
// //     } catch (err) {
// //       console.error(err.message);
// //       res.status(500).json({ msg: 'server error' });
// //     }
// //   }
// // );

// router.post('/', auth, async (req, res) => {
//   console.log(req.user);
//   console.log(req.body);
//   //let profile = await Profile.findOne({user: req.user.id});
//   //console.log(profile);
//   try {
//     const update = {
//       dob: req.body.dob,
//       mobile: req.body.mobile,
//       avatar: req.body.avatar,
//       address: {
//         locality: req.body.locality,
//         city: req.body.city,
//         pincode: req.body.pincode
//       }
//     };
//     let profile = await Profile.findOneAndUpdate(
//       { user: req.user.id },
//       update,
//       {
//         new: true
//       }
//     );
//     await profile.save();
//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'server error' });
//   }
// });

// router.post('/follow', auth, async (req, res) => {
//   console.log(req.user);
//   console.log(req.body);
//   //let profile = await Profile.findOne({user: req.user.id});
//   //console.log(profile);

//   try {
//     const update = {
//       following: req.body.following,
//       followers: req.body.followers
//     };
//     let profile = await Profile.findOneAndUpdate(
//       { user: req.body.user },
//       update,
//       {
//         new: true
//       }
//     );
//     await profile.save();
//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'server error' });
//   }
// });

// router.post('/cart', auth, async (req, res) => {
//   console.log(req.user);
//   console.log('*******');
//   console.log(req.body);
//   //let profile = await Profile.findOne({user: req.user.id});
//   //console.log(profile);

//   try {
//     const update = {
//       cart: req.body.cart
//     };

//     let profile = await Profile.findOneAndUpdate(
//       { user: req.body.user },
//       update,
//       {
//         new: true
//       }
//     );
//     await profile.save();
//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'server error' });
//   }
// });

// //@route GET profile of one user by id api/profile/user/:user_id
// //@access public

// router.get('/user/:user_id', async (req, res) => {
//   try {
//     const profile = await Profile.findOne({
//       user: req.params.user_id
//     }).populate('user', ['_id', 'name', 'avatar', 'email', 'fav_cuisines']);

//     if (!profile) {
//       res.status(400).json({ msg: 'profile not found' });
//     }
//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind == 'ObjectId') {
//       res.status(400).json({ msg: 'profile not found' });
//     }
//     res.status(500).json({ msg: 'server error' });
//   }
// });

// //@route GET all profiles api/profile
// //@access public

// router.get('/', async (req, res) => {
//   try {
//     const profiles = await Profile.find().populate('user', [
//       '_id',
//       'name',
//       'avatar',
//       'email',
//       'fav_cuisines',
//       'locality',
//       'city',
//       'pincode',
//       'user_type'
//     ]);
//     res.json(profiles);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'server error' });
//   }
// });

// //@route DELETE user api/profile
// //@access private

// router.delete('/', auth, async (req, res) => {
//   try {
//     await Profile.findOneAndRemove({ user: req.user.id });
//     await User.findOneAndRemove({ _id: req.user.id });
//     res.json({ msg: 'user deleted' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'server error' });
//   }
// });

router.get('/', (req, res) => res.send('Profile route'));
module.exports = router;
