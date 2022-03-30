import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema({
  userName: { type: String, require: true, trim: true },
  products: [],
  userEmail: {
    type: String,
    require: true,
    lowercase: true,
    trim: true,
  },
  date: { type: String, require: true, trim: true },
  state: { type: String, require: true, trim: true },
});

const Orders = mongoose.model('orders', OrderSchema);

export default Orders;
