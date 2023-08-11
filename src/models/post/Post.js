/* eslint-disable class-methods-use-this */

export default class Post {
  constructor({
    id = null,
    userId,
    title,
    descriptionText,
    deleted,
  }) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.descriptionText = descriptionText;
    this.deleted = deleted;
  }

  postedBy(user) {
    return this.userId === user.id;
  }

  notActive() {
    return this.deleted;
  }

  modify({
    title,
    descriptionText,
  }) {
    this.title = title;
    this.descriptionText = descriptionText;
  }
}
