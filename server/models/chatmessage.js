import mongoose from 'mongoose';

const ChatMessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  message: [{
    text: {
    type: String,
    required: true,
    },
    sender: {
    type: String,
    required: true,
    }
    }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);

export default ChatMessage;
