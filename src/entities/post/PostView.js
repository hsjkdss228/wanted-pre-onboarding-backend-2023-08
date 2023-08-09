import { ViewColumn, ViewEntity } from 'typeorm';

import Post from './Post';

@ViewEntity({
  expression: (dataSource) => dataSource
    .createQueryBuilder()
    .select('posts.id', 'id')
    .addSelect('posts.title', 'title')
    .addSelect('posts.description_text', 'descriptionText')
    .from(Post, 'posts'),
})
class PostView {
  @ViewColumn() id = undefined;

  @ViewColumn() title = undefined;

  @ViewColumn() descriptionText = undefined;
}

export default PostView;
