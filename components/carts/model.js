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
  // product: { type: mongoose.Schema.ObjectId, ref: 'products' },
  // quantity: { type: Number, require: true, trim: true },
  // deliveryAddress: { type: String, require: true, trim: true },
});

const Carts = mongoose.model('carts', cartSchema);

export default Carts;
