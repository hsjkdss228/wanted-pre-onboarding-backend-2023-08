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
}
