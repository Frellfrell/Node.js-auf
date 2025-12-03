import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }]
});

export default mongoose.model('Tag', tagSchema);