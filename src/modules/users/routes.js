import express from 'express';
import { UsersController } from './controller';
import {
  verifyToken,
  validateLoginPost, 
  validateAddUserPost
} from './middleware';

const routes = express.Router();

routes.post(`/users/login`,
  validateLoginPost(),
  UsersController.login);

routes.get(`/users`,
  verifyToken(),
  UsersController.listUsers);

routes.post(`/users`,
  // verifyToken(),
  validateAddUserPost(),
  UsersController.addUsers);

export default routes;