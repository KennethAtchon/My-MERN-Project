import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import ChatList from '../models/chatlist.js';
import dotenv from 'dotenv';

dotenv.config();


const router = express.Router();


export const getUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find a user with a matching email and password
      const user = await User.findOne({ email, password });
  
      if (user) {
        // Email and password are valid, proceed with sign in process
        res.json({ success: true, message: 'Sign in successful' });
      } else {
        // Email and password are invalid, return an error message
        res.status(401).json({ success: false, message: 'Incorrect email or password' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

export const signInUser = async (req, res) => {

     try{
        // Destructure the email and password from the request body
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).json({
            error: 'Email and password are required'
          });
        }

        
    
        // Find the user with the matching email
        const user = await User.findOne({ email });
        if (!user) {
          // If there is no user with the given email, return an error message
          return res.status(401).json({ error: 'Incorrect email or password' });
        }
        
    
        // Check if the provided password is correct
        const passwordIsValid = await bcrypt.compare(password, user.password);
        
        if (!passwordIsValid) {
          // If the password is incorrect, return an error message
          return res.status(401).json({ error: 'Incorrect email or password' });
        }

      
        
        // Check if the user has a ChatList document
        const chatList = await ChatList.findOne({ user: user.email });

        if (!chatList) {
        // If the user doesn't have a ChatList document, create a new one
        const newChatList = new ChatList({
        user: user.email,
        contacts: [],
        });
        await newChatList.save();
        }
        
    
        // If the email and password are correct, generate a JWT and send it in the response
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).json({ 
          auth: true, 
          token, 
          username: user.username,
          email: user.email,

        });

      } 
      catch (error) {
        // If there was an error, return a server error response
        res.status(500).json({ error: 'Server error' });
      }

  };

  export const signUpUser = (req, res) => {

    
    const { email, password, username } = req.body;
  
    // Validate request data
    if (!email || !password || !username) {
      return res.status(400).json({
        error: 'Email, username, and password are required'
      });
    }
  
    // Check if a user with the given email already exists
    User.findOne({ email }).then(existingUser => {
      if (existingUser) {
        return res.status(400).json({
          error: 'A user with this email already exists'
        });
      }
  
      // Hash the user's password
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        }
        

      // Create a new user
      const user = new User({
        username: username,
        email: email,
        password: hash,
      });
  
        user.save()
          .then(async savedUser => {
            // Generate a JWT for the newly created user
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
              expiresIn: 86400 // expires in 24 hours
            });

            const chatList = new ChatList({
              user: savedUser.email,
              contacts: [],
            });
            
            try {
              await chatList.save();
            } catch (error) {
              return res.status(500).json({ error });
            }
            

            res.json({
              username: savedUser.username,
              email: savedUser.email,
              token
            });
          })
          .catch(error => {
            res.status(500).json({
              error
            });

          });


      });
    });
  };



export default router;