const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Case = require('../../models/Case');

router.post('/', async (req, res) => {
  try {
    if (req.body.payment_status) {
      var data = req.body;
      const case1 = new Case({
        client: data.client,
        lawyer: data.lawyer,
        title: data.title,
        description: data.description,
        payment_status: true,
      });
      await case1.save();
      res.send('Case Created Successfully');
    } else {
      res.send('Payment unsuccessful');
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', async (req, res) => {
  try {
    const case1 = await Case.find()
      .populate('client', ['_id', 'name', 'email'])
      .populate('lawyer', ['_id', 'name', 'email', 'enrollmentno', 'state']);
    if (!case1) res.send('No case');
    else res.json(case1);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/mycases', auth, async (req, res) => {
  try {
    const case1 = await Case.find({ lawyer: req.user.id })
      .populate('client', ['_id', 'name', 'email'])
      .populate('lawyer', ['_id', 'name', 'email', 'enrollmentno', 'state']);

    if (case1.length > 0) res.json(case1);
    else {
      const case2 = await Case.find({ client: req.user.id })
        .populate('client', ['_id', 'name', 'email'])
        .populate('lawyer', ['_id', 'name', 'email', 'enrollmentno', 'state']);
      if (case2.length > 0) res.json(case2);
      else res.send('No cases');
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/clientcases/:id', auth, async (req, res) => {
  try {
    const case1 = await Case.find({ client: req.params.id })
      .populate('client', ['_id', 'name', 'email'])
      .populate('lawyer', ['_id', 'name', 'email', 'enrollmentno', 'state']);
    if (case1.length > 0) res.json(case1);
    else res.send('No cases');
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/lawyercases/:id', async (req, res) => {
  try {
    const case1 = await Case.find({ lawyer: req.params.id })
      .populate('client', ['_id', 'name', 'email'])
      .populate('lawyer', ['_id', 'name', 'email', 'enrollmentno', 'state']);
    if (case1.length > 0) res.json(case1);
    else res.send('No cases');
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const case1 = await Case.find({ _id: req.params.id })
      .populate('client', ['_id', 'name', 'email'])
      .populate('lawyer', ['_id', 'name', 'email', 'enrollmentno', 'state']);
    if (!case1) res.send('No case');
    else res.json(case1);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
