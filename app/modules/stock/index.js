'use strict';
import { Router } from 'express';
import * as controller from './controller';
import validate from 'express-validation';
import validation from './validation';

const route = new Router();
route.get(
  '/history/:symbol',
  validate(validation.priceHistory),
  controller.priceHistory
);
route.get('/tickers', validate(validation.ticker), controller.ticker);
export default route;
