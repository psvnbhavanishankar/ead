const express = require('express');
const router = express.Router();
const Field = require('../../models/Field');

router.post('/', async (req, res) => {
  try {
    const name = req.body.name;
    const field = new Field({ name: name });
    await field.save();
    res.send('Field Created Successfully');
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', async (req, res) => {
  const fields = await Field.find();
  res.json({ fields });
});

module.exports = router;
