export default class EmptyLoginInput extends Error {
  constructor() {
    super('아이디나 비밀번호를 입력하지 않았습니다.');
  }
}
