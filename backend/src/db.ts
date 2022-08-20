import mongoose from 'mongoose';
import { config } from './config';

const connectDB = async () => {
  let attempts = 10;
  while (attempts) {
    try {
      await mongoose.connect('mongodb://mongodb', {
        user: config.db.user,
        pass: config.db.pass,
        dbName: config.db.name,
      });
      console.log('MongoDB connected.');
      // break out of loop once conncected
      break;
    } catch (err) {
      console.log('Error: ', err instanceof Error ? err.message : err);

      attempts -= 1;
      console.log(`Connection attempts left: ${attempts}`);

      // throw error again
      if (!attempts) throw err;

      // wait for 10 seconds before retrying
      await new Promise(res => setTimeout(res, 10000));
    }
  }
};

export default connectDB;
