import config from './index.js';
import mongoose from 'mongoose';
const MONGO_DB = config.mongodb;

export default await mongoose.connect(`${MONGO_DB}`);
