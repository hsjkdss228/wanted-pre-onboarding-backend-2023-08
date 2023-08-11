export default class PostAlreadyDeleted extends Error {
  constructor() {
    super('이미 삭제된 게시글입니다.');
  }
}
