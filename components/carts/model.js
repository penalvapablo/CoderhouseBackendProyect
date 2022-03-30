import mongoose from 'mongoose';

const cartItemSchema = mongoose.Schema({
  product: { type: mongoose.Schema.ObjectId, ref: 'products' },
  quantity: { type: Number, require: true, trim: true },
});

export default cartItemSchema;
