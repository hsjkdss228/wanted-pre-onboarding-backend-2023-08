export default class InvalidPageOrCount extends Error {
  constructor() {
    super('잘못된 페이지 또는 게시글 개수 값입니다.');
  }
}
