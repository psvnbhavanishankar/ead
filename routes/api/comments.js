const express = require('express');
const router = express.Router();
const Comment = require('../../models/Comment');
const auth = require('../../middleware/auth');

router.get('/:id', async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.id,
    }).populate('author', ['_id', 'name', 'email']);
    console.log(99999990);
    console.log(comments);
    console.log(09876543);
    if (!comments) res.send('No posts');
    else res.json(comments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/create', auth, async (req, res) => {
  const author = req.user.id;
  const { post, content } = req.body;

  const comment = new Comment({
    author,
    post,
    content,
  });

  await comment.save();

  res.send('Commented successfully');
});

router.post('/update', auth, async (req, res) => {
  const update = {
    content: req.body.content,
  };

  let comment = await Comment.findOneAndUpdate(
    { author: req.user.id, post: req.body.post },
    update,
    { new: true }
  );

  await comment.save();
  res.send('Comment updated');
});

router.delete('/', auth, async (req, res) => {
  await Comment.findOneAndRemove({
    author: req.user.id,
    post: req.body.post,
    content: req.body.content,
  });
  res.send('Deleted comment');
});

module.exports = router;
