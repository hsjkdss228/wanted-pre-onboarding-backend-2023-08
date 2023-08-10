import express from 'express';

import { body, validationResult } from 'express-validator';

import { loginService } from '../../services/session/LoginService';

import EmptyLoginInput from '../../exceptions/login/EmptyLoginInput';
import UserNotFound from '../../exceptions/user/UserNotFound';
import IncorrectPassword from '../../exceptions/login/IncorrectPassword';

const router = express.Router();

const has = (array) => array.length > 0;

router.post(
  '/session',
  [
    body('email').notEmpty(),
    body('password').notEmpty(),
  ],
  async (request, response) => {
    try {
      const { errors } = validationResult(request);

      if (has(errors)) {
        throw new EmptyLoginInput();
      }

      const loginResultDto = await loginService.login(request.body);

      response.status(201)
        .type('application/json')
        .send(loginResultDto);
    } catch (error) {
      if (error instanceof (EmptyLoginInput || IncorrectPassword)) {
        response.status(400)
          .type('text/html')
          .send(error.message);
      } else if (error instanceof UserNotFound) {
        response.status(404)
          .type('text/html')
          .send(error.message);
      } else {
        response.status(500)
          .type('text/html')
          .send('Internal Server Error');
      }
    }
  },
);

export default router;
