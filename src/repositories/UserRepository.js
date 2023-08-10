/* eslint-disable class-methods-use-this */

import appDataSource from '../data-source';
import UserEntity from '../entities/user/UserEntity';

export default class UserRepository {
  async save({
    email,
    encodedPassword,
  }) {
    const userRepository = appDataSource.getRepository(UserEntity);

    const userEntity = UserEntity.create({
      email,
      encodedPassword,
    });

    const savedUserEntity = await userRepository.save(userEntity);

    return savedUserEntity.id;
  }
}

export const userRepository = new UserRepository();
