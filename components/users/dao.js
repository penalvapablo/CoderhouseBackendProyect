import User from './model.js';

class usersDao {
  async create(newUserData) {
    try {
      const newUser = new User(newUserData);
      newUser.cart = [];
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log(`error creating user in db . ${error}`);
    }
  }
  async getUser(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      console.log(`error finding user in db . ${error}`);
    }
  }
}
export default new usersDao();
