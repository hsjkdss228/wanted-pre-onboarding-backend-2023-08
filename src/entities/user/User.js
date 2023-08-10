import argon2 from 'argon2';

export default class User {
  constructor(email) {
    this.email = email;
    this.encodedPassword = '';
  }

  async changePassword(password) {
    this.encodedPassword = await argon2.hash(password);
  }
}
