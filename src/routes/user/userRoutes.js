import express from 'express';

import { body, validationResult } from 'express-validator';

import { signUpService } from '../../services/user/SignUpService';

import InvalidSignUpInput from '../../exceptions/signup/InvalidSignUpInput';

const router = express.Router();

const has = (array) => array.length > 0;

router.post(
  '/users',
  [
    body('email').contains('@'),
    body('password').isLength({ min: 8 }),
  ],
  async (request, response) => {
    try {
      const { errors } = validationResult(request);

      if (has(errors)) {
        throw new InvalidSignUpInput();
      }

      const signUpResultDto = await signUpService.signUp(request.body);

      response.status(201)
        .type('application/json')
        .send(signUpResultDto);
    } catch (error) {
      if (error instanceof InvalidSignUpInput) {
        response.status(400)
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
