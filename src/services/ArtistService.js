import { Artist } from '../models/Artist';
import { Song } from '../models/Song';
export class ArtistService {
  static baseUrl = 'https://634827500b382d796c6acadd.mockapi.io/music';

  static artistSongs = `${this.baseUrl}/artists`;
  static getAllArtists() {
    /* Consigue todos los artistas */
    console.log('TO DO');
  }

  static async getArtistData(artistId) {
    const urlApi = `${this.baseUrl}/artists/${artistId}`;
    let artistResponse = await fetch(urlApi, { method: 'Get' });
    let artistInfo = await artistResponse.json();
    return new Artist(artistInfo);
  }

  static async getSongOf(artistId) {
    const urlApi = `${this.artistSongs}/${artistId}/songs`;
    let songsResponse = await fetch(urlApi, { method: 'Get' });
    let songsInfo = await songsResponse.json();
    let songs = songsInfo.map(jsonData => new Song(jsonData));
    return songs;
  }

  static async saveNewSong(artistId, songData) {
    const urlApi = `${this.artistSongs}/${artistId}/songs/`;
    let songsResponse = await fetch(urlApi, {
      method: 'put',
      body: songData,
    });
    let songJson = await songsResponse.json();
    console.log(songJson);
    return new Song(songJson);
  }
}
