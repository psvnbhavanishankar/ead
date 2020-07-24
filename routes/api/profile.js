const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/ClientProfile');
const LawyerProfile = require('../../models/LawyerProfile');
const User = require('../../models/Client');
const { check, validationResult } = require('express-validator/check');

//@route GET api/profile/me
//@access private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['_id', 'name', 'avatar', 'email']);
    //const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'profile does not exist for this user' });
    }
    res.send(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

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
router.post(
  '/',
  [
    auth,
    //   [
    //     check('skills', 'skills are required')
    //       .not()
    //       .isEmpty()
    //   ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { locality, city, pincode } = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.address = {
      locality: locality,
      city: city,
      pincode: pincode,
    };
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'server error' });
    }
  }
);

router.post('/update', auth, async (req, res) => {
  try {
    var image = req.body.image_content;
    var update;
    // console.log(req.body.image_content);
    if (image !== '') {
      update = {
        address: {
          locality: req.body.locality,
          city: req.body.city,
          pincode: req.body.pincode,
        },
        image: image,
      };
    } else {
      update = {
        address: {
          locality: req.body.locality,
          city: req.body.city,
          pincode: req.body.pincode,
        },
      };
    }

    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      update,
      {
        new: true,
      }
    );

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});
router.post('/lawyerupdate', auth, async (req, res) => {
  try {
    var image;
    var update;
    if (req.body.image_content !== '') {
      image = req.body.image;
      update = {
        address: {
          locality: req.body.locality,
          city: req.body.city,
          pincode: req.body.pincode,
        },
        licensed_year: req.body.licensed_year,
        experience: req.body.experience,
        price: req.body.price,
        mobile: req.body.mobile,
        image: image,
      };
    } else {
      update = {
        address: {
          locality: req.body.locality,
          city: req.body.city,
          pincode: req.body.pincode,
        },
        licensed_year: req.body.licensed_year,
        experience: req.body.experience,
        price: req.body.price,
        mobile: req.body.mobile,
      };
    }
    let profile = await LawyerProfile.findOneAndUpdate(
      { user: req.user.id },
      update,
      {
        new: true,
      }
    );

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

router.post('/field', async (req, res) => {
  try {
    let users = await LawyerProfile.find({
      practice_areas: req.body.field,
    }).populate('user', ['_id', 'name', 'avatar', 'email']);
    // console.log(users);
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

router.post('/endorse', auth, async (req, res) => {
  try {
    const name = req.body.name;
    console.log(1);
    console.log(req.user.id);
    const profile_1 = await LawyerProfile.findOne({ user: req.user.id });
    // console.log(profile_1);
    const profile = await LawyerProfile.updateOne(
      { user: req.user.id },
      { $addToSet: { endorsments_given: name } }
    );
    // console.log(profile);
    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'profile does not exist for this user' });
    }
    // res.send(profile);
    const user_endorse = await Lawyer.findOne({ name: name });
    const user = await Lawyer.findOne({ _id: req.user.id });
    const profile_endorse = await LawyerProfile.updateOne(
      { user: user_endorse },
      { $addToSet: { endorsments_got: user.name } }
    );
    if (!profile_endorse) {
      return res
        .status(400)
        .json({ msg: 'profile does not exist for this user' });
    }
    res.send(profile_endorse);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

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

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['_id', 'name', 'email']);
    if (!profile) {
      res.status(400).json({ msg: 'profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      res.status(400).json({ msg: 'profile not found' });
    }
    res.status(500).json({ msg: 'server error' });
  }
});

router.get('/lawyer/me', auth, async (req, res) => {
  try {
    const profile = await LawyerProfile.findOne({
      user: req.user.id,
    }).populate('user', ['_id', 'name', 'email', 'enrollmentno', 'state']);
    if (!profile) {
      res.status(400).json({ msg: 'profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      res.status(400).json({ msg: 'profile not found' });
    }
    res.status(500).json({ msg: 'server error' });
  }
});

router.get('/lawyer/:lawyer_id', auth, async (req, res) => {
  try {
    const profile = await LawyerProfile.findOne({
      user: req.params.lawyer_id,
    }).populate('user', ['_id', 'name', 'email', 'enrollmentno', 'state']);
    if (!profile) {
      res.status(400).json({ msg: 'profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      res.status(400).json({ msg: 'profile not found' });
    }
    res.status(500).json({ msg: 'server error' });
  }
});

router.post('/lawyer/compare', auth, async (req, res) => {
  try {
    const profile1 = await LawyerProfile.findById(
      req.body.array[0]
    ).populate('user', ['_id', 'name', 'email', 'enrollmentno', 'state']);
    const profile2 = await LawyerProfile.findById(
      req.body.array[1]
    ).populate('user', ['_id', 'name', 'email', 'enrollmentno', 'state']);
    if (!profile1) {
      res.status(400).json({ msg: 'profile1 not found' });
    }
    if (!profile2) {
      res.status(400).json({ msg: 'profile2 not found' });
    }

    res.send([profile1, profile2]);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      res.status(400).json({ msg: 'profile not found' });
    }
    res.status(500).json({ msg: 'server error' });
  }
});
// //@route GET all profiles api/profile
// //@access public

router.get('/lawyers', async (req, res) => {
  try {
    const profiles = await LawyerProfile.find().populate('user', [
      '_id',
      'name',
      'email',
      'enrollmentno',
      'state',
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      '_id',
      'name',
      'email',
      'locality',
      'city',
      'pincode',
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

// //@route DELETE user api/profile
// //@access private

router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'user deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

router.post('/fields', auth, async (req, res) => {
  try {
    // console.log(req);
    const update = {
      practice_areas: req.body.fields,
    };
    let profile = await LawyerProfile.findOneAndUpdate(
      { user: req.user.id },
      update,
      { new: true }
    );
    await profile.save();
    res.send('update success');
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

router.get('/', (req, res) => res.send('Profile route'));
module.exports = router;
