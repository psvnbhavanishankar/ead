const express = require('express');
const router = express.Router();
const Blog = require('../../models/Blog');
const auth = require('../../middleware/auth');

router.get('/myblogs', auth, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id });
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', [
      '_id',
      'name',
      'email',
      'enrollmentno',
      'state',
    ]);
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

router.post('/create', auth, async (req, res) => {
  const author = req.user.id;
  const { title, content } = req.body;

  const blog = new Blog({
    author,
    title,
    content,
  });

  await blog.save();

  res.send('Blog saved successfully');
});

router.post('/update', auth, async (req, res) => {
  const update = {
    content: req.body.content,
  };

  let blog = await Blog.findOneAndUpdate(
    { author: req.user.id, title: req.body.title },
    update,
    { new: true }
  );

  await blog.save();
  res.send('Blog updated');
});

router.delete('/:title', auth, async (req, res) => {
  await Blog.findOneAndRemove({ author: req.user.id, title: req.params.title });
  res.send(req.params.title);
});

module.exports = router;
