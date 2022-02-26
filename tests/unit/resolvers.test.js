import Resolvers from "../../src/auth/schemas/Resolvers";
import { testConnection } from "../mocks/database/db";

beforeAll(async () => {
  await testConnection.connect();
});

afterAll(async () => {
  testConnection.disconnect()
})

describe("Resolvers test suites", () => {
  test("should be be true", async () => {
    expect(true).toBe(true);
  });

  test("should register user and return a success message with the user", async () => {
    const user = {
      signupInput: {
        firstname: "Daniel",
        lastname: "Oguejiofor",
        email: "nielnonso@gmail.com",
        mobileNo: "+23489900660",
        country: "Norway",
        password: "P@ssword123",
        confirmPassword: "P@ssword123"
      }
    };
    expect(Resolvers.Mutation.signUp(_, user)).toEqual();
  });
});
