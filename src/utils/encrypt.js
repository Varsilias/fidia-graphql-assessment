import { ApolloError } from "apollo-server-core";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtConfigOptions } from "../../config";
import { JWT_EXPIRED_ERROR, JWT_INVALID_SIGNATURE_ERROR } from "./constants";

export const generateSalt = async () => {
  return await bcrypt.genSalt();
};

export const hashPassword = async (plainTextPassword) => {
  const salt = await generateSalt();
  return await bcrypt.hash(plainTextPassword, salt);
};

export const verifyPassword = async (plainTextPassword, hashedPassword) => {
  const isPasswordMatch = await bcrypt.compare(
    plainTextPassword,
    hashedPassword
  );
  if (isPasswordMatch) {
    return isPasswordMatch;
  } else {
    throw new ApolloError("Invalid user credentials", "BAD_USER_INPUT");
  }
};

export const generateVerifyEmailToken = (email) => {
  return jwt.sign({ email }, jwtConfigOptions.secretKey, { expiresIn: 60 });
};

export const verifyEmailToken = (verificationToken) => {
  try {
    const decodedData = jwt.verify(
      verificationToken,
      jwtConfigOptions.secretKey
    );
    return decodedData.email;
  } catch (error) {
    if (!error) return;
    if (error.name === JWT_EXPIRED_ERROR) {
      throw new ApolloError(
        "Verification failed. Get a new verification email"
      );
    }
    if (error.name === JWT_INVALID_SIGNATURE_ERROR) {
      throw new ApolloError(
        "Invalid verification token provided",
        "BAD_USER_INPUT"
      );
    }
  }
};

export const decodeOldToken = (oldToken) => {
  try {
    const decodedData = jwt.decode(oldToken); // returns null for when wrong token is passed in
    return decodedData.email;
  } catch (error) {
    throw new ApolloError("token is invalid", "BAD_USER_INPUT");
  }
};

export const generateAuthenticationToken = (userId) => {
  return jwt.sign({ userId }, jwtConfigOptions.secretKey, {
    expiresIn: jwtConfigOptions.expiry
  });
};

export const verifyLoginToken = (verificationToken) => {
  try {
    const decodedData = jwt.verify(
      verificationToken,
      jwtConfigOptions.secretKey
    );
    return decodedData.email;
  } catch (error) {
    if (!error) return;
    if (error.name === JWT_EXPIRED_ERROR) {
      throw new ApolloError("Token has Expired", "UNAUTHENTICATED");
    }
    if (error.name === JWT_INVALID_SIGNATURE_ERROR) {
      throw new ApolloError(
        "Invalid authorization token provided",
        "BAD_USER_INPUT"
      );
    }
  }
};
