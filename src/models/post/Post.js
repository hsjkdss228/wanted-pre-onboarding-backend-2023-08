/* eslint-disable class-methods-use-this */

export default class Post {
  constructor({
    id = null,
    userId,
    title,
    descriptionText,
  }) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.descriptionText = descriptionText;
  }

  postedBy(user) {
    return this.userId === user.id;
  }

  modify({
    title,
    descriptionText,
  }) {
    this.title = title;
    this.descriptionText = descriptionText;
  }
}
