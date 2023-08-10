export default class InvalidSignUpInput extends Error {
  constructor() {
    super('유효하지 않은 이메일 혹은 비밀번호입니다.');
  }
}
