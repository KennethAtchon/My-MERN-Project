import mongoose from 'mongoose';

const ChatListSchema = new mongoose.Schema({
  user: {
  type: String,
  required: true,
  },
  contacts: [{
  type: String,
  }],
  createdAt: {
  type: Date,
  default: Date.now,
  },
  });
  
  const ChatList = mongoose.model('ChatList', ChatListSchema);
  
  export default ChatList;
  
  
  
  
