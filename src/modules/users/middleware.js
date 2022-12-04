import Joi from '@hapi/joi';
import libraryModule from './../library';
import constraints from './validation';

const jwt = libraryModule.jwt;

export function validateLoginPost() {
  return async (req, res, next) => {
    const schema = Joi.object(constraints.postLogin);
    const result = schema.validate(req.body, { abortEarly: false, allowUnknown: true });
    if (result.error) {
      return res.API.error(result.error, 400);
    }
    return next();
  }
}

export function validateAddUserPost() {
  return async (req, res, next) => {
    const schema = Joi.object(constraints.postAddUser);
    const result = schema.validate(req.body, { abortEarly: false, allowUnknown: true });
    if (result.error) {
      return res.API.error(result.error, 400);
    }
    return next();
  }
}

export function verifyToken() {
  return async (req, res, next) => {
      let token = req.headers["authorization"];

      if (!token) {
        return res.API.error({ message: "No token provided!" }, 401);
      }

      const bearer = token.split(' ');
      const bearerToken = bearer[1];

      const verify = await jwt.verifyToken(bearerToken);
      req.user = verify.data;

      if (verify && verify.status) {
        return next();
      } else {
        return res.API.error(verify, 401);
      }
  }
}