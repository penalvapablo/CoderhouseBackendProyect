import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
  userEmail: {
    type: String,
    require: true,
    lowercase: true,
    trim: true,
  },
  date: { type: String, require: true, trim: true },
  products: [],
});

const Carts = mongoose.model('carts', cartSchema);

export default Carts;
