import express from 'express';
import ChatMessage from '../models/chatmessage.js';
import ChatList from '../models/chatlist.js';

const router = express.Router();

export const getMessages = async (req, res) => {
  try {
    const { sender, recipient } = req.query;

    let chats = await ChatMessage.findOne({
      sender: sender,
      recipient: recipient
    });

    if (!chats) {
      chats = await ChatMessage.findOne({
        sender: recipient,
        recipient: sender
      });

      return res.json({
        sender: chats.recipient,
        recipient: chats.sender,
        messages: chats.message
      });


    }

    if (!chats) {
      return res.status(404).json({ message: 'No messages found' });
    }

    res.json({
      sender: chats.sender,
      recipient: chats.recipient,
      messages: chats.message
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addMessages = async (req, res) => {
  try {
    const { sender, recipient, message } = req.body;

    // Check if a chat record already exists between the sender and recipient
    let chat = await ChatMessage.findOne({
      $or: [
        { sender: sender, recipient: recipient },
        { sender: recipient, recipient: sender }
      ]
    });

    if (!chat) {
      // If there is no chat record, create a new one
      chat = new ChatMessage({
        sender: sender,
        recipient: recipient,
        message: [{
          text: message,
          sender: sender
        }]
      });
    } else {
      // If there is an existing chat record, add the new message to the message array
      chat.message.push({ text: message, sender: sender });
    }

    // Save the chat record to the database
    await chat.save();

    // Send the response to the client
    res.json({ message: 'Message added successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




export const getFriend = async (req, res) => {
  try {

    const { sender } = req.query;

    
    // Find the user's chat list
    const chatList = await ChatList.findOne({ user: sender }).populate('contacts');

    

    if (!chatList) {
      return res.status(404).json({ error: 'User has no chat list' });
    }

    // Return the user's contacts
    res.json(chatList.contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteFriend = async (req, res) => {

  try{

  const { sender, friend } = req.query;


  const chatList = await ChatList.findOne({ user: sender }).populate('contacts');

  if (!chatList.contacts.includes(friend)) {
    return res.status(404).json({ error: 'Friend not found in chat list' });
  }

   // Remove friend from chat list's contacts array
   const index = chatList.contacts.indexOf(friend);
   chatList.contacts.splice(index, 1);

   // Save updated chat list to database
   await chatList.save();

   await ChatMessage.deleteMany({
    $or: [
      { sender: sender, recipient: friend },
      { sender: friend, recipient: sender },
    ],
  });


   // Return success message
   res.json({ message: 'Friend deleted successfully' });
 } catch (err) {
   res.status(500).json({ message: err.message });
 }
}

export default router;

