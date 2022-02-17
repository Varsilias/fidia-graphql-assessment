import users from "../models/users.model";

class UserService {
  constructor() {
    this.users = users
  }
  signUp() {
    
    return 'Hello Dee';
  }

  async getUsers() {
    return await this.users.find()
  }
};

export default new UserService()
