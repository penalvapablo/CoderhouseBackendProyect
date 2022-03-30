import bcrypt from 'bcrypt';

const validPassword = async (password, userPassword) =>{
  return await bcrypt.compare(password, userPassword)
}

export default validPassword