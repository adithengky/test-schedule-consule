import Joi, { custom } from '@hapi/joi';

const constraints = {};

constraints.postLogin = {
    username: Joi.string().required(),
    password: Joi.string().required(),
};

constraints.postAddSchedule = {
    consult_date: Joi.date().required(),
    start_date_range: Joi.date().min(Joi.ref('consult_date')).required(),
    end_date_range: Joi.date().min(Joi.ref('start_date_range')).required(),
    start_time: Joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    duration: Joi.number().required(),
    type_consult: Joi.string().valid('chat', 'videocall', 'call').required(),
    type_repeat: Joi.string().valid('weekly', 'monthly').required(),
};

export default constraints;
