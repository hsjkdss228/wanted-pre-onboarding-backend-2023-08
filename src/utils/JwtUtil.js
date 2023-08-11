/* eslint-disable class-methods-use-this */

import jwt from 'jsonwebtoken';

import config from '../../config';

const { secret } = config;

export default class JwtUtil {
  encode(userId) {
    return jwt.sign(
      { userId },
      secret,
      { algorithm: 'HS256' },
    );
  }

  decode(accessToken) {
    const { userId } = jwt.verify(
      accessToken,
      secret,
    );
    return userId;
  }
}

export const jwtUtil = new JwtUtil();
