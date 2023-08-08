import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
class Post {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  }) id;

  @Column({
    type: 'varchar',
    name: 'title',
    length: 255,
  }) title;

  @Column({
    type: 'varchar',
    name: 'description_text',
    length: 4095,
  }) descriptionText;
}

export default Post;
