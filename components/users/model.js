import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cartItemSchema from '../carts/model.js';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, require: true, trim: true },
  fullname: { type: String, require: true, trim: true },
  phone: { type: String, require: true, trim: true },
  cart: [cartItemSchema],
});

//Hash password before saving
userSchema.pre('save', async function () {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

const User = mongoose.model('user', userSchema);

export default User;
