import users from "../models/users.model";
import emailService from "./email.service";
import {
  SENDER,
  TEXT,
  SUBJECT,
  MONGO_UNIQUE_CONSTRAINT_ERROR_CODE
} from "../../utils/constants";
import {
  hashPassword,
  generateVerifyEmailToken,
  verifyEmailToken,
  decodeOldToken,
  generateAuthenticationToken,
  verifyLoginToken,
  verifyPassword
} from "../../utils/encrypt";
import { ApolloError } from "apollo-server-core";

class AuthService {
  constructor() {
    this.users = users;
    this.emailService = emailService;
  }
  async signUp(user) {
    try {
      const { password } = user;
      const hashedPassword = await hashPassword(password);
      const createdUser = await this.users.create({
        ...user,
        password: hashedPassword
      });
      const { email } = createdUser;
      const token = generateVerifyEmailToken(email);
      await this.handleVerifyEmail(createdUser, token);
      // return
      // console.log(createdUser)
      return {
        message: "SignUp Successful, please verify your email address",
        user: createdUser
      };
    } catch (error) {
      if (error.code === MONGO_UNIQUE_CONSTRAINT_ERROR_CODE) {
        throw new ApolloError(
          "User with provided email already exists",
          "BAD_USER_INPUT"
        );
      }
    }
  }

  async verifyEmail(verificationToken) {
    try {
      const email = verifyEmailToken(verificationToken);
      const user = await this.getUser({ email });
      if (user && user.emailVerified !== true) {
        const updatedUser = await this.users.findOneAndUpdate(
          { email },
          { emailVerified: true },
          { new: true }
        );
        return { message: "Email Verification Successful", user: updatedUser };
      }

      return { message: "User already verified", user };
    } catch (error) {
      throw new Error(error);
    }
  }

  async resendVerificationEmail(oldToken) {
    try {
      const email = decodeOldToken(oldToken); // could return null if wrong token is passed in
      const user = await this.getUser({ email });
      if (user && user.emailVerified !== true) {
        const { email } = user;
        const token = generateVerifyEmailToken(email);
        await this.handleVerifyEmail(user, token);
        return { message: "Email Verification link sent Successfully", user };
      }
      return { message: "User already verified", user };
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(loginPayload) {
    try {
      const { email, password } = loginPayload;
      const user = await this.getUser({ email });
      await verifyPassword(password, user.password);
      this.checkVerificationStatus(user)
      const token = generateAuthenticationToken(user.id);
      return { token, user };
    } catch (error) {
      // console.log(error);
      throw new Error(error);
    }
  }

    checkVerificationStatus(user) {
    if (user.emailVerified !== false) {
      return
    } else {
      throw new ApolloError('User not verified', 'UNAUTHENTICATED')
    }
  }

  async getUser(options = {}, payload = {}, mongoOptions = {}) {
    const user = await this.users
      .findOne(options, payload, mongoOptions)
      .exec();
    if (!user) {
      throw new ApolloError("User not found", "NOT_FOUND");
    }

    return user;
  }

  async getUsers() {
    return await this.users.find();
  }

  async handleVerifyEmail(user, token) {
    const { firstname, lastname, email } = user;
    return await this.emailService.sendMail({
      from: SENDER,
      to: `${firstname} ${lastname} ${email}`,
      subject: SUBJECT,
      text: TEXT,
      template: "verify",
      context: {
        name: firstname,
        url: `https://localhost:4000/verify/${token}`
      }
    });
  }
}

export default new AuthService();
