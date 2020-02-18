'use strict';
import bodyParser from 'body-parser';
import cors from 'cors';

export default app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
      console.log(`${req.method} >> ${req.get('HOST')}${req.originalUrl}`);
      if (['POST', 'PUT', 'PATCH'].includes(req.method))
        console.log('========Request body==========\n', req.body);
      if (
        ['GET', 'DELETE'].includes(req.method) &&
        Object.keys(req.params).length > 0
      )
        console.log('========Request params==========\n', req.params);

      if (req.method === 'GET' && Object.keys(req.query).length > 0)
        console.log('========Request query string==========\n', req.query);
      console.log('====Auth token====\n', req.headers.authorization);

      next();
    });
  }
};
