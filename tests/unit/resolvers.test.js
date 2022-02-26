import Resolvers from "../../src/auth/schemas/Resolvers";

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
    expect(Resolvers.Mutation.signUp({}, user)).toEqual({
      data: {
        signUp: {
          message: "SignUp Successful, please verify your email address",
          user: {
            id: "6219f13fc8715a5889f6cb76",
            firstname: "Daniel",
            lastname: "Oguejiofor",
            email: "nielnonso@gmail.com",
            mobileNo: "+23489900660",
            country: "Norway",
            password: "P@ssword123",
            confirmPassword: "P@ssword123",
          }
        }
      }
    });
  });
});
