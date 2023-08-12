import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
class PostEntity {
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

  @Column({
    type: 'boolean',
    name: 'deleted',
    default: false,
  }) deleted = undefined;

  static create({
    userId,
    title,
    descriptionText,
  }) {
    const postEntity = new PostEntity();

    postEntity.userId = userId;
    postEntity.title = title;
    postEntity.descriptionText = descriptionText;

    return postEntity;
  }
}

export default PostEntity;
