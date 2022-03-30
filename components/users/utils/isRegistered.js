import Users from '../model.js';

export default async function isRegistered(req, res, next) {
  const { email } = req.body;

  const exists = await Users.find({ email: email });
  if (exists.length) {
    res.json({ error: 'email already registered' });
    return;
  }
  next();
}
