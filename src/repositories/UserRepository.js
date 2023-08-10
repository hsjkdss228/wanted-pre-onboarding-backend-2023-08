/* eslint-disable class-methods-use-this */

import appDataSource from '../data-source';
import User from '../entities/user/User';
import UserEntity from '../entities/user/UserEntity';

export default class UserRepository {
  async findBy(email) {
    const userRepository = appDataSource.getRepository(UserEntity);

    const userEntity = await userRepository.findOneBy({ email });

    return !userEntity ? null : new User({
      id: userEntity.id,
      email: userEntity.email,
      encodedPassword: userEntity.encodedPassword,
    });
  }

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
