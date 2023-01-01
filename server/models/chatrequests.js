import mongoose from 'mongoose';

const ChatRequestSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'accepted', 'declined'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const ChatRequest = mongoose.model('ChatRequest', ChatRequestSchema);

export default ChatRequest;
