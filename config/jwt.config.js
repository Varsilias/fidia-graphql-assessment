export const jwtConfigOptions = {
  secretKey: process.env.JWT_SECRET,
  expiry: JSON.parse(process.env.JWT_EXPIRY)
}