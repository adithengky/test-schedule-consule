import express from 'express';
import { SchedulesController } from './controller';
import { 
  validateAddSchedulePost
} from './middleware';

import {
  verifyToken
} from '../users/middleware'

const routes = express.Router();

routes.get(`/schedules`,
  verifyToken(),
  SchedulesController.listSchedules);

routes.post(`/schedules`,
  verifyToken(),
  validateAddSchedulePost(),
  SchedulesController.addSchedules);

export default routes;