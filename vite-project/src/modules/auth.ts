import firebase from 'firebase';
import { auth } from '../config/firebase';
import IUser from '../interfaces/user';
import axios from 'axios';
import config from '../config/config';
import logging from '../config/logging';

export const SignInWithSocialMedia = (provider: firebase.auth.AuthProvider) =>
  new Promise<firebase.auth.UserCredential>((resolve, reject) => {
    auth
      .signInWithPopup(provider)
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });

export const Authenticate = async (
  uid: string,
  name: string,
  fire_token: string,
  callback: (error: string | null, user: IUser | null) => void
) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${config.server.url}/users/login`,
      data: {
        uid,
        name,
      },
      headers: { Authorization: `Bearer ${fire_token}` },
    });
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 304
    ) {
      logging.info('Successfully logged');
      callback(null, response.data.user);
    } else {
      logging.warn('Failed to log');
      callback('Unable to log', null);
    }
  } catch (error) {
    logging.error(error);
    callback('Failed to log', null);
  }
};

export const Validate = async (
  fire_token: string,
  callback: (error: string | null, user: IUser | null) => void
) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${config.server.url}/users/validate`,
      headers: { Authorization: `Bearer ${fire_token}` },
    });

    if (response.status === 200 || response.status === 304) {
      logging.info('Successfully validated.');
      callback(null, response.data.user);
    } else {
      logging.warn('Unable to validate');
      callback('Unable to validate.', null);
    }
  } catch (error) {
    logging.error(error);
    callback('Unable to validate.', null);
  }
};
