export default class UserNotCreatedPost extends Error {
  constructor() {
    super('게시글 작성자가 아닙니다.');
  }
}
