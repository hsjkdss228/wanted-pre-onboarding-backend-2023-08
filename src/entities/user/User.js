import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  }) id;

  @Column({
    type: 'varchar',
    name: 'name',
    length: 255,
  }) name;

  @Column({
    type: 'varchar',
    name: 'username',
    length: 255,
  }) username;
}

export default User;
