import logging from '../config/logging';
import firebaseAdmin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

const extractFirebaseInfo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info('Validating Firebase token ...');

  let token = req.headers.authorization?.split(' ')[1];

  if (token) {
    firebaseAdmin
      .auth()
      .verifyIdToken(token)
      .then((result) => {
        if (result) {
          res.locals.firebase = result;
          res.locals.fire_token = token;
          next();
        } else {
          logging.warn('Invalid Firebase token');
          return res.status(404).json({ message: 'unauthorized' });
        }
      })
      .catch((error) => {
        logging.error(error);

        return res.status(404).json({ error, message: 'unauthorized' });
      });
  } else {
    return res.status(404).json({ message: 'unauthorized' });
  }
};

export default extractFirebaseInfo;
