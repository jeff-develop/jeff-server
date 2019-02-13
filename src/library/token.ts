import * as jwt from 'jsonwebtoken';

const { SECRET_ACCESS_KEY, SECRET_REFRESH_KEY } = process.env;

type User = {
  id: string;
  name: string;
};

type Payload = {
  user: User;
};

type Options = {
  issuer: string;
  expiresIn: string;
  subject: string;
};

const generateAccessToken = async (payload: Payload) => {
  try {
    const options: Options = {
      issuer: 'jeper.io', // 임시 이름!
      expiresIn: '1h',
      subject: 'accessToken'
    };

    return jwt.sign(payload, SECRET_ACCESS_KEY, options);
  } catch (error) {
    throw error;
  }
};

const generateRefreshToken = async (payload: Payload) => {
  try {
    const options: Options = {
      issuer: 'jeper.io',
      expiresIn: '7d',
      subject: 'refreshToken'
    };

    return jwt.sign(payload, SECRET_REFRESH_KEY, options);
  } catch (error) {
    throw error;
  }
};

const verifyAccessToken = async (accessToken: string) => {
  try {
    return await jwt.verify(accessToken, SECRET_ACCESS_KEY);
  } catch (error) {
    throw error;
  }
};

const verifyRefreshToken = async (refreshToken: string) => {
  try {
    return await jwt.verify(refreshToken, SECRET_REFRESH_KEY);
  } catch (error) {
    throw error;
  }
}

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};
