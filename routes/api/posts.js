const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', [
      '_id',
      'name',
      'email',
    ]);
    if (!posts) res.send('No posts');
    else res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/myposts', async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id }).populate('author', [
      '_id',
      'name',
      'email',
    ]);
    if (!posts) res.send('No posts');
    else res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id }).populate('author', [
      '_id',
      'name',
      'email',
    ]);
    if (!post) res.send('No posts');
    else res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/create', auth, async (req, res) => {
  const author = req.user.id;
  const title = req.body.title;
  const content = req.body.content;
  const tag = req.body.tag;
  const status = req.body.status;

  const post = new Post({
    author,
    title,
    content,
    tag,
    status,
  });

  await post.save();

  res.send('Post saved successfully');
});

router.post('/update', auth, async (req, res) => {
  const update = {
    content: req.body.content,
    tag: req.body.tag,
    status: req.body.status,
    UpdatedAt: mongoose.Schema.Types.Date.now,
  };

  let post = await Post.findOneAndUpdate(
    { author: req.user.id, title: req.body.title },
    update,
    { new: true }
  );

  await post.save();
  res.send('Post updated');
});

router.delete('/:title', auth, async (req, res) => {
  await Post.findOneAndRemove({ author: req.user.id, title: req.params.title });
  res.send('Deleted post');
});

module.exports = router;
