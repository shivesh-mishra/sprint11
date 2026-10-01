const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
  
  imageUrl: { type: String, default: '' },      // Cloudinary URL only — never binary/Base64
    imagePublicId: { type: String, default: '' }, // needed to delete the asset later
  },
  { timestamps: true }
);



module.exports = mongoose.model('Post', postSchema);
