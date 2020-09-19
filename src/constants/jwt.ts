export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'jwtSecret',
  expiresIn: '1d',
};
