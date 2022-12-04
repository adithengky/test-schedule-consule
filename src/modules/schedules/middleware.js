import Joi from '@hapi/joi';
import constraints from './validation';

export function validateAddSchedulePost() {
  return async (req, res, next) => {
    const schema = Joi.object(constraints.postAddSchedule);
    const result = schema.validate(req.body, { abortEarly: false, allowUnknown: true });
    if (result.error) {
      return res.API.error(result.error, 400);
    }
    return next();
  }
}