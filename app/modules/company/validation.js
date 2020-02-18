import Joi from 'joi';

export default {
  symbol: {
    params: {
      symbol: Joi.string()
        .max(10)
        .required(),
    },
  },
};
