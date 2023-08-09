export default class PostNotFound extends Error {
  constructor() {
    super('존재하지 않는 게시글입니다.');
    this.name = 'PostNotFound';
  }
}
