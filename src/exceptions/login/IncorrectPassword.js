export default class IncorrectPassword extends Error {
  constructor() {
    super('비밀번호가 올바르지 않습니다.');
  }
}
