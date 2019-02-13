import { userRepo } from '../database/repository';
import { cipher, token } from '../library';

import { authValidation } from '../validation';

interface User {
  email: string;
  name: string;
}

interface Token {
  accessToken: string;
  refreshToken: string;
}

interface Email {
  error: boolean;
  code: string;
  token: Token;
  user: User | null;
}

interface EmailLoginParams {
  email: string;
  password: string;
}

const requestEmailLogin = async (params: EmailLoginParams): Promise<Email> => {
  try {
    const isValidParams = authValidation.emailLoginValidation(params);

    if (isValidParams.error) {
      return {
        error: true,
        code: 'INVALID_REQUEST_PARAMS',
        token: null,
        user: null
      }
    }

    const { email, password } = params;

    const user = await userRepo().getUserByEmail(email) || null;

    // 이메일이 조회되지 않을때
    if (user === null) {
      return {
        error: true,
        code: 'NOT_FOUND_EMAIL',
        token: null,
        user: null
      };
    }

    // password 암호화 모듈
    const cipherPassword = cipher.encryptPassword(password);

    if (cipherPassword !== user.password) {
      // 비밀번호가 일치하지 않을때
      return {
        error: true,
        code: 'INVALID_PASSWORD',
        token: null,
        user: null
      };
    }

    const accessToken = await token.generateAccessToken({ user: { id: user.id, name: user.name } });
    const refreshToken = await token.generateRefreshToken({ user: { id: user.id, name: user.name } });

    return {
      error: false,
      code: 'SUCCESS_EMAIL_LOGIN',
      token: {
        accessToken,
        refreshToken,
      },
      user: {
        email,
        name: user.name,
      },
    };
  } catch (error) {
    console.log('error: ', error);
    return {
      error: true,
      code: 'SERVER_ERROR',
      token: null,
      user: null
    }
  }
};


interface EmailRegisterParams {
  email: string;
  password: string;
  name: string;
};

const requestEmailRegister = async (params: EmailRegisterParams): Promise<Email> => {
  try {
    // validation 검증
    // 이메일이 이미 존재하는지 확인
    // 비밀번호가 양식에 맞는지
    return {
      error: false,
      code: 'SUCCESS_EMAIL_REGISTER',
      token: {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      },
      user: {
        email: 'test@gmail.com',
        name: 'younghoon',
      }
    }
  } catch (error) {
    return {
      error: true,
      code: 'SERVER_ERROR',
      token: null,
      user: null
    }
  }
};

export {
  requestEmailLogin,
  requestEmailRegister
};
