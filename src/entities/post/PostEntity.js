import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
class Post {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  }) id = undefined;

  @Column({
    type: 'bigint',
    name: 'user_id',
  }) userId = undefined;

  @Column({
    type: 'varchar',
    name: 'title',
    length: 255,
  }) title = undefined;

  @Column({
    type: 'varchar',
    name: 'description_text',
    length: 4095,
  }) descriptionText = undefined;
}

export default Post;
