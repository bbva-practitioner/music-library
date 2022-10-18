/* eslint-disable prefer-destructuring */
import { css, html, LitElement } from 'lit';
import { Artist } from '../models/Artist.js';
import { ArtistService } from '../services/ArtistService.js';

export class MusicLibrary extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      headerTitle: { type: String },
      artist: {
        type: Artist,
      },
      artistId: {
        type: Number,
      },
      songs: { type: Array },
      loading: {
        type: Boolean,
      },
      songModalHidden: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.title = 'Libreria Musical';
    this.headerTitle = 'Duracion';
    this.loading = true;
    this.songModalHidden = true;
    this.artistId = 1;
  }

  async connectedCallback() {
    super.connectedCallback();
    const promises = await Promise.all([
      ArtistService.getArtistData(this.artistId),
      ArtistService.getSongOf(this.artistId),
    ]);
    this.artist = promises[0];
    this.songs = promises[1];
    this.loading = false;
  }

  static get styles() {
    return css`
      #main-app {
        font-size: 16px;
      }

      #add-song-modal {
        display: none;
      }

      .show {
        display: inline-block;
      }

      td,
      th {
        padding: 1em;
      }
    `;
  }

  showModal() {
    console.log('Mostrar Modal');
    this.songModalHidden = !this.songModalHidden;
  }

  async saveNewSong(event) {
    event.preventDefault();
    const form = this.shadowRoot.querySelector('form');
    const dataForm = new FormData(form);
    const newSong = await ArtistService.saveNewSong(this.artistId, {
      title: dataForm.get('song-title'),
      duration: dataForm.get('song-duration'),
    });
    this.songs = [...this.songs, newSong];
    console.log(this.songs);
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
        crossorigin="anonymous"
      />
      <div id="main-app">
        <div id="side-bar">Side Bar</div>

        <div id="main-content">
          ${this.loading
            ? html`<span>Cargando...</span>`
            : html`<div id="header">
          <img id="profile-image" src="${
            this.artist.profilePicture
          }" alt="profile" ></img>
          <div id="artist-name">${this.artist.name}</div>
        </div>  
        <hr />
        <div id="songs-section">
          <div>
            <span>Canciones creadas</span>
            <table>
              <tr> 
                <th>Título</th>
                <th>Duracion</th>
                <th></th>
                <th></th>
              </tr>
              ${this.songs.map(
                song => html`
                  <tr>
                    <td>${song.title}</td>
                    <td>${song.duration}</td>
                    <td>Editar</td>
                    <td>Borrar</td>
                  </tr>
                `
              )}
            </table>
            <button @click="${this.showModal}">Agregar cancion</button>
          </div>
        </div>`}
        </div>
        <div>
          <div
            id="add-song-modal"
            class="modal-dialog ${this.songModalHidden ? '' : 'show'}"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Agregar cancion
                </h5>
              </div>
              <div class="modal-body">
                <form @submit=${this.saveNewSong}>
                  <div class="form-row">
                    <label for="name-field">Titulo:</label>
                    <input type="text" name="song-title" id="title-field" />
                  </div>
                  <div class="form-row">
                    <label for="surname-field">Duracion (segundos):</label>
                    <input
                      type="number"
                      name="song-duration"
                      id="duration-field"
                    />
                  </div>
                  <div class="modal-footer">
                    <button
                      type="reset"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
