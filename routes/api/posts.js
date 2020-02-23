const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
// const Post = require('../../models/Post');
// const User = require('../../models/User');
// const auth = require('../../middleware/auth');

//@route POST create post api/posts
//@access private
// router.post(
//   '/',
//   [
//     auth,
//     [
//       check('title', 'Posts need a title')
//         .not()
//         .isEmpty(),
//       check('content', 'Posts need content')
//         .not()
//         .isEmpty()
//     ]
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.status(400).json({ errors: errors.array() });
//     }
//     const { title, content } = req.body;

//     try {
//       const user = await User.findById(req.user.id).select('-password');
//       const postdetails = {
//         title,
//         content,
//         name: user.name,
//         user: req.user.id,
//         avatar: user.avatar
//       };
//       const post = new Post(postdetails);
//       await post.save();
//       res.json(post);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).json({ msg: 'server error' });
//     }
//   }
// );

// //@route GET all posts api/posts/
// //@access private

// router.get('/', auth, async (req, res) => {
//   try {
//     const posts = await Post.find().sort({ date: -1 });
//     res.json(posts);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'server error' });
//   }
// });

// //@route GET post by id api/posts/:id
// //@access private

// router.get('/:id', auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) {
//       return res.status(404).json({ msg: 'post not found' });
//     }

//     res.json(post);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind == 'ObjectId') {
//       return res.status(400).json({ msg: 'post not found' });
//     }
//     res.status(500).json({ msg: 'server error' });
//   }
// });

// //@route DELETE post api/posts/:id
// //@access private

// router.delete('/:id', auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) {
//       return res.status(404).json({ msg: 'post not found' });
//     }
//     if (post.user.toString() !== req.user.id) {
//       res.status(401).json({ msg: 'not authorized' });
//     }
//     await post.remove();
//     res.json({ msg: 'post deleted' });
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind == 'ObjectId') {
//       return res.status(400).json({ msg: 'post not found' });
//     }
//     res.status(500).json({ msg: 'server error' });
//   }
// });

// //@route PUT like api/posts/like/:id
// //@access private

// router.put('/like/:id', auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (
//       post.likes.filter(like => like.user.toString() === req.user.id).length > 0
//     ) {
//       return res.status(400).json({ msg: 'post already liked' });
//     }
//     post.likes.unshift({ user: req.user.id });
//     await post.save();
//     res.json(post.likes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'server error' });
//   }
// });

// //@route PUT like api/posts/unlike/:id
// //@access private

// router.put('/unlike/:id', auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (
//       post.likes.filter(like => like.user.toString() === req.user.id).length ===
//       0
//     ) {
//       return res.status(400).json({ msg: 'post has not been liked' });
//     }

//     const removeIndex = post.likes
//       .map(like => like.user.toString())
//       .indexOf(req.user.id);

//     post.likes.splice(removeIndex, 1);
//     await post.save();
//     res.json(post.likes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'server error' });
//   }
// });

// //@route POST comment api/posts/comment/:id
// //@access private
// router.post(
//   '/comment/:id',
//   [
//     auth,
//     [
//       check('content', 'comment needs content')
//         .not()
//         .isEmpty()
//     ]
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.status(400).json({ errors: errors.array() });
//     }
//     const { content } = req.body;

//     try {
//       const user = await User.findById(req.user.id).select('-password');
//       const post = await Post.findById(req.params.id);

//       const commentDetails = {
//         content,
//         name: user.name,
//         user: req.user.id,
//         avatar: user.avatar
//       };
//       post.comments.unshift(commentDetails);
//       await post.save();
//       res.json(post.comments);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).json({ msg: 'server error' });
//     }
//   }
// );

// //@route DELETE comment api/posts/comment/:id/:comment_id
// //@access private

// router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     const comment = post.comments.find(
//       comment => comment.id === req.params.comment_id
//     );
//     if (!comment) {
//       return res.status(404).json({ msg: 'comment not found' });
//     }
//     if (comment.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'user not authorized' });
//     }
//     const removeIndex = post.comments
//       .map(comment => comment.user.toString())
//       .indexOf(req.user.id);

//     post.comments.splice(removeIndex, 1);
//     await post.save();
//     res.json(post.comments);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'server error' });
//   }
// });

router.get('/', (req, res) => res.send('Posts route'));
module.exports = router;
