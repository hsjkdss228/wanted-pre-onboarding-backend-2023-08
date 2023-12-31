import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  }) id = undefined;

  @Column({
    type: 'varchar',
    name: 'email',
    length: 255,
  }) email = undefined;

  @Column({
    type: 'varchar',
    name: 'password',
    length: 255,
  }) encodedPassword = undefined;

  static create({
    email,
    encodedPassword,
  }) {
    const userEntity = new UserEntity();

    userEntity.email = email;
    userEntity.encodedPassword = encodedPassword;

    return userEntity;
  }
}

export default UserEntity;
