import express from 'express';
import ChatMessage from '../models/chatmessage.js';
import ChatList from '../models/chatlist.js';
import ChatRequest from '../models/chatrequests.js';
import User from '../models/users.js';


const router = express.Router();


export const sendRequest = async (req, res) => {
    try {

      const { sender, recipient, reason } = req.body;


      // Check if the recipient is a valid user
      const recipientUser = await User.findOne({ email: recipient });
    if (!recipientUser) {
      return res.status(400).json({
        message: 'The recipient is not a valid user',
      });
    }

    

    if(sender == recipient){
      return res.status(400).json({
        message: 'Cant send a request to yourself',
      });
    }

      // Check if a request has already been sent
      const existingRequest = await ChatRequest.findOne({
        sender: sender,
        recipient: recipient,
        status: 'pending',
        });
        if (existingRequest) {
        return res.status(400).json({
        message: 'A request has already been sent to this user',
        });
        }

        
        // Create the new request
        const newRequest = new ChatRequest({
          sender: sender,
          recipient: recipient,
          status: 'pending',
          reason: reason,
          });
          // Save the new request to the database
          await newRequest.save();
          // Send the response to the client

      res.json({ message: 'Request sent successfully' });
      } catch (err) {
      res.status(500).json({ message: err.message });
      }
  };

  
  export const AcceptRequest = async (req, res) => {
    try {

      // Get the sender and recipient from the request body
      const { sender, recipient } = req.body;
  
      // Create a new chat message between the sender and recipient
      const newChatMessage = new ChatMessage({ sender, recipient });
      await newChatMessage.save();
  
      // Add the recipient to the sender's chat list
      const senderChatList = await ChatList.findOne({ user: sender });
      senderChatList.contacts.push(recipient);
      await senderChatList.save();
  
      // Add the sender to the recipient's chat list
      const recipientChatList = await ChatList.findOne({ user: recipient });
      recipientChatList.contacts.push(sender);
      await recipientChatList.save();
  
      // Delete the chat request
      await ChatRequest.findOneAndDelete({ sender, recipient });
  
      res.json({ message: 'Request accepted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

  export const DeclineRequest = async (req, res) => {
    try {


      // Retrieve the sender and recipient from the request body
      const { sender, recipient } = req.query;
  
      // Find and delete the chat request
      const chatRequest = await ChatRequest.findOne({ sender, recipient });
      await chatRequest.delete();
  
      // Return a success message to the client
      res.json({ message: 'Request declined successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export const GetRequest = async (req, res) => {
    try {
      
      const { sender } = req.query;
  
      // Find all requests for the specified user
      const requests = await ChatRequest.find({ recipient: sender });
  
      if (!requests) {
        return res.json({ message: 'No requests found' });
      }
  
      
      // Return the requests
      res.json(requests);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  export default router;