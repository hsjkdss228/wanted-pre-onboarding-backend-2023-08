export default class PostIsDeleted extends Error {
  constructor() {
    super('삭제된 게시글입니다.');
  }
}
