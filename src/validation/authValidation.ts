import * as Joi from "joi";

interface LoginSchema {
  email: string;
  password: string;
};

const emailLoginValidation = (schema: LoginSchema) => {
  const loginSchema = {
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
  };

  const validate = Joi.validate(schema, loginSchema);
  return validate;
};

interface RegisterSchema {
  email: string;
  password: string;
  name: string;
}

const emailRegisterValidation = (schema: RegisterSchema) => {
  const registerSchema = {
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
    name: Joi.string().required(),
  };

  const validate = Joi.validate(schema, registerSchema);
  return validate;
};

export {
  emailLoginValidation,
  emailRegisterValidation,
};