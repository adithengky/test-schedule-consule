import bcrypt from 'bcryptjs';
import moment from 'moment';
import  libraryModule from './../library';
import { Users } from './model';

export const UsersController = {};
export default { UsersController };

const jwt = libraryModule.jwt;

UsersController.login = async (req, res) =>{
  try {
    const { username, password } = req.body;

    const users = await Users.findOne({
      username,
    });
  
    if (!users) {
      return res.API.error({message: 'User not Found'}, 404);
    }

    const compare = await bcrypt.compare(password, users.password);

    if (!compare) {
      return res.API.error({message: 'Invalid Password'}, 401);
    }
  
    const response = {
      token: await jwt.createToken(users),
      users
    };  
    return res.API.success('success', response);
  } catch(err) {
    return res.API.error(err);
  }
};

UsersController.listUsers = async (req, res) =>{
  try {
    const users = await Users.find({});
  
    return res.API.success('success', users);
  } catch(err) {
    return res.API.error(err);
  }
};


UsersController.addUsers = async (req, res) =>{
  try {
    const { username, name, password } = req.body;
    const findUser = await Users.findOne({
      username: req.body.username,
    });

    if (findUser) {
      return res.API.error({ message: "user already exist"}, 400);
    }

    const create = {
      username,
      name,
      password: await bcrypt.hash(password, 12),
    };

    Users.create(create);
  
    return await res.API.success('success', 'user already created');
  } catch(err) {
    return res.API.error(err);
  }
};


