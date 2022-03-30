export default async function validateUserData(req, res, next) {
  const { fullname, email, password1, password2, phone } = req.body;
  if (
    !(fullname.length > 0) ||
    !(email.length > 0) ||
    !(password1.length > 0) ||
    !(password2.length > 0) ||
    !Number(phone)
  ) {
    return res.status(400).json({ error_description: 'missing data.' });
  }
  if (password1 != password2)
    return res
      .status(400)
      .json({ error_description: 'passwords must be the same' });
  next();
}
