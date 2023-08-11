/* eslint-disable class-methods-use-this */

import appDataSource from '../data-source';

import UserEntity from '../entities/user/UserEntity';

import User from '../entities/user/User';

export default class UserRepository {
  async findBy({
    userId = null,
    email = null,
  }) {
    const userRepository = appDataSource.getRepository(UserEntity);

    const userEntity = userId
      ? await userRepository.findOneBy({ id: userId })
      : await userRepository.findOneBy({ email });

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
