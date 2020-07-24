const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Chat = require('../../models/Chat');
const Client = require('../../models/Client');
const { deleteOne } = require('../../models/Client');

router.post('/', auth, async (req, res) => {
  try {
    let lawyer_chat = await Chat.findOne(
      { lawyer: req.body.lawyer },
      (err, result) => {
        if (err) return 0;
        if (result) return 1;
      }
    );
    // let curr_user = req.user.id
    let username = await Client.findOne({ _id: req.user.id });
    if (lawyer_chat) {
      Chat.update(
        { lawyer: req.body.lawyer },
        { $push: { client: username.name } }
      ).then((x) => {
        res.json('done');
      });
    } else {
      // console.log(username.name);
      // console.log(typeof username.name);
      let new_chat = new Chat({
        client: [username.name],
        lawyer: req.body.lawyer,
      });
      await new_chat.save();
      res.json(new_chat);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    let all_chats = await Chat.findOne(
      { lawyer: req.user.id },
      (err, result) => {
        if (err) return 0;
        else return 1;
      }
    );
    if (all_chats) {
      res.json(all_chats.client);
    } else {
      // all_chats = [];
      res.json([]);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
