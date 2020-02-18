'use strict';
import { Router } from 'express';
import * as controller from './controller';
import validate from 'express-validation';
import validation from './validation';

const route = new Router();
route.get('/profile/:symbol', validate(validation.symbol), controller.profile);
route.get(
  '/recommended-trend/:symbol',
  validate(validation.symbol),
  controller.recommendationTrend
);
route.get('/earnings/:symbol', validate(validation.symbol), controller.earning);
route.get(
  '/statistics/:symbol',
  validate(validation.symbol),
  controller.statistics
);
export default route;
