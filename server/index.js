import express, { application } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import RequestRoutes from './routes/request.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', chatRoutes);
app.use('/api', RequestRoutes);

mongoose.set('strictQuery', false)

mongoose.connect(process.env.URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
