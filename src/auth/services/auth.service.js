import users from "../models/users.model";
import emailService from "./email.service";
import { SENDER,  TEXT, SUBJECT } from "../../utils/constants";

class AuthService {
  constructor() {
    this.users = users;
    this.emailService = emailService;
  }
  async createUser(user) {
    try {
      await this.handleVerifyEmail(user)
      // return await this.users.create(user);
      return user
    } catch (error) {
      console.log(error);
    }
  }

  async getUsers() {
    return await this.users.find();
  }

  async handleVerifyEmail(user) {
    const { firstname, email } = user;
    return await this.emailService.sendMail({
      from: SENDER,
      to: email,
      subject: SUBJECT,
      text: TEXT,
      template: 'verify',
      context: {
        name: firstname,
        url: 'https://stackoverflow.com/questions/55530949/how-to-verify-user-email-while-using-graphql-and-node-js'
      }
    });
  }
}

export default new AuthService();
