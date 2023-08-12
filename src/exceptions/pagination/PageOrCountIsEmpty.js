export default class PageOrCountIsEmpty extends Error {
  constructor() {
    super('페이지 또는 게시글 개수 값이 주어지지 않았습니다.');
  }
}
