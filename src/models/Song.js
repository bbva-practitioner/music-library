export class Song {
  constructor(data) {
    this.id = data.id;
    this.artistId = data.artistId;
    this.createdAt = data.createdAt;
    this.durationInSeconds = data.duration_in_seconds;
    this.title = data.title;
  }

  get duration() {
    return this.durationInSeconds;
  }
}
