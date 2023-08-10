/* eslint-disable class-methods-use-this */

import { userRepository } from '../../repositories/UserRepository';
import { jwtUtil } from '../../utils/JwtUtil';

import UserNotFound from '../../exceptions/user/UserNotFound';
import IncorrectPassword from '../../exceptions/login/IncorrectPassword';

export default class LoginService {
  async login({
    email,
    password,
  }) {
    const user = await userRepository.findBy(email);

    if (!user) {
      throw new UserNotFound();
    }

    if (!await user.passwordMatches(password)) {
      throw new IncorrectPassword();
    }

    const accessToken = jwtUtil.encode(user.id);

    return { accessToken };
  }
}

export const loginService = new LoginService();
