export class Artist {
  constructor(data) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.name = data.name;
    this.profilePicture = data.profile_picture;
  }
}
