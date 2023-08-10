/* eslint-disable class-methods-use-this */

import { userRepository } from '../../repositories/UserRepository';

import User from '../../entities/user/User';

export default class SignUpService {
  async signUp({
    email,
    password,
  }) {
    const user = new User(email);

    await user.changePassword(password);

    const userId = await userRepository.save(user);

    return { userId };
  }
}

export const signUpService = new SignUpService();
