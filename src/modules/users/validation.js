import Joi, { custom } from '@hapi/joi';

const constraints = {};

constraints.postLogin = {
    username: Joi.string().required(),
    password: Joi.string().required(),
};

constraints.postAddUser = {
    username: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
};

export default constraints;
