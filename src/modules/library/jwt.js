import jwt from 'jsonwebtoken';
import cfg from '../../../config';

const jwtCfg = cfg.jwt;

export async function createToken(data) {
  const token = await jwt.sign({ id:data._id, name: data.name, username:data.username  }, jwtCfg.secret, {
    expiresIn: 86400
  });

  return token;
}

export async function verifyToken(token) {
  try {
    const verify = await jwt.verify(token, jwtCfg.secret);
    const result = {
      status: true,
      data: verify,
    }
    
    return result;
  } catch(err) {
    return {
      status: false,
      message: 'invalid token' 
    }
  }
}
