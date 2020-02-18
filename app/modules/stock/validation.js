import Joi from 'joi';

export default {
  ticker: {
    query: {
      symbolFilter: Joi.string()
        .max(10)
        .default('AA'),
      limit: Joi.number()
        .integer()
        .max(200)
        .default(100),
    },
  },
  priceHistory: {
    query: {
      fromDate: Joi.date(),
      toDate: Joi.date(),
      daysAgo: Joi.number().integer(),
      weeksAgo: Joi.number().integer(),
      monthsAgo: Joi.number().integer(),
      yearsAgo: Joi.number().integer(),
    },
    params: {
      symbol: Joi.string()
        .max(10)
        .default('AAPL'),
    },
  },
};
