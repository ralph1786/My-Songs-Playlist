//Song Class: Represents a Song
class Song {
  constructor(title, author, genre) {
    this.title = title;
    this.author = author;
    this.genre = genre;
  }
}

//UI Class: Handles UI tasks
class UI {
  static displaySongs() {
    const listSongs = [
      {
        title: "Play Rock",
        author: "Someone",
        genre: "Rock"
      },
      {
        title: "Play Hip-Hop",
        author: "Someone Else",
        genre: "Hip-Hop"
      }
    ];
    const songs = listSongs;

    songs.forEach(song => UI.addSongToList(song));
  }

  static addSongToList(song) {
    const list = document.querySelector("#song-list");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${song.title}</td>
        <td>${song.author}</td>
        <td>${song.genre}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

    list.appendChild(row);
  }

  static deleteSong(element) {
    if (element.classList.contains("delete")) {
      element.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#genre").value = "";
  }
}

//Store Class: Handles Local Storage

//Event: Show Songs
document.addEventListener("DOMContentLoaded", UI.displaySongs);

//Event: Add Song
document.querySelector("#song-form").addEventListener("submit", e => {
  e.preventDefault();
  //get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const genre = document.querySelector("#genre").value;

  //instantiate song
  const song = new Song(title, author, genre);

  //Add Song to UI
  UI.addSongToList(song);

  //Clear Fields
  UI.clearFields();
});

//Event: Delete Song
document.querySelector("#song-list").addEventListener("click", e => {
  UI.deleteSong(e.target);
});
