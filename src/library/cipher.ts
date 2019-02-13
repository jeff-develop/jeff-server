import crypto from 'crypto';

const { ENCRYPT_KEY } = process.env;

const encryptPassword = (plainPassword: string) => {
  const cipherPassword = crypto.createHmac('sha512', ENCRYPT_KEY)
    .update(plainPassword)
    .digest('hex');
  
  return cipherPassword;
};

export { encryptPassword };
