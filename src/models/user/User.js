import argon2 from 'argon2';

export default class User {
  constructor({
    id = null,
    email,
    encodedPassword = '',
  }) {
    this.id = id;
    this.email = email;
    this.encodedPassword = encodedPassword;
  }

  async changePassword(password) {
    this.encodedPassword = await argon2.hash(password);
  }

  async passwordMatches(password) {
    return argon2.verify(this.encodedPassword, password);
  }
}
