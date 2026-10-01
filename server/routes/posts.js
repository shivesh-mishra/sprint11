const express = require('express');
const multer = require('multer');
 const Post = require('../models/Post');
const cloudinary = require('../config/cloudinary');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    file.mimetype.startsWith('image/') ? cb(null, true) : cb(new Error('Only image files are allowed')),
});

const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: 'posts' }, (err, result) =>
    
      err ? reject(err) : resolve(result)
    );
    stream.end(buffer);
  });
router.get('/', async (req, res, next) => {
  try {
    res.json(await Post.find().sort({ createdAt: -1 }));
  } catch (e) { next(e); }
});
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) return res.status(400).json({ message: 'Title and body are required' });


    let imageUrl = '', imagePublicId = '';
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
         imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }
    const post = await Post.create({ title, body, imageUrl, imagePublicId });
    res.status(201).json(post);
  } catch (e) { next(e); }
});
router.delete('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.imagePublicId) await cloudinary.uploader.destroy(post.imagePublicId);
    res.json({ message: 'Deleted', id: req.params.id });
  } catch (e) { next(e); }
});

module.exports = router;
