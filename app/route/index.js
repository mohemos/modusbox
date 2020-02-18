import { errorMessage } from 'iyasunday';
import Stock from '../modules/stock';
import Company from '../modules/company';

export default app => {
  const apiVersion = '/api/' + process.env.API_VERSION;
  app.use(`${apiVersion}/stocks/`, Stock);
  app.use(`${apiVersion}/companies/`, Company);

  app.use((err, req, res, next) => {
    if (err) {
      let message;
      if (err.errors && err.errors[0].messages[0]) {
        message = err.errors[0].messages[0];
      } else if (err.message) {
        message = err.message;
      } else if (typeof err === 'string') {
        message = err;
      } else {
        message = 'Something went wrong';
      }
      res.status(400).json(errorMessage(message, "VALIDATION_ERROR"));
    } else {
      res.status(404).json(errorMessage('Requested route not found'));
    }
  });
};
