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
    const songs = Store.getSongs();

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

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.style.color = "white";
    div.className = `alert alert-${className} text-center mt-4 mb-4`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#song-form");
    container.insertBefore(div, form);
    //Make alert vanish
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#genre").value = "";
  }
}

//Store Class: Handles Local Storage
class Store {
  static getSongs() {
    let songs;
    if (localStorage.getItem("songs") === null) {
      songs = [];
    } else {
      songs = JSON.parse(localStorage.getItem("songs"));
    }
    return songs;
  }
  static addSong(song) {
    const songs = Store.getSongs();
    songs.push(song);
    localStorage.setItem("songs", JSON.stringify(songs));
  }
  static removeBook(title) {
    const songs = Store.getSongs();
    // songs.filter(song => song.title !== title);
    songs.forEach((song, index) => {
      if (song.title === title) {
        songs.splice(index, 1);
      }
    });
    localStorage.setItem("songs", JSON.stringify(songs));
  }
}

//EVENT: SHOW SONGS
document.addEventListener("DOMContentLoaded", UI.displaySongs);

//EVENT: ADD SONG
document.querySelector("#song-form").addEventListener("submit", e => {
  e.preventDefault();
  //get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const genre = document.querySelector("#genre").value;

  //Validate
  if (title === "" || author === "" || genre === "") {
    UI.showAlert("Please Fill Out All Fields", "danger");
  } else {
    //instantiate song
    const song = new Song(title, author, genre);

    //Add Song to UI
    UI.addSongToList(song);

    //Add Song To Store
    Store.addSong(song);

    //Show success message
    UI.showAlert("Song Successfully Added", "success");

    //Clear Fields
    UI.clearFields();
  }
});

//EVENT: DELETE SONG
document.querySelector("#song-list").addEventListener("click", e => {
  UI.deleteSong(e.target);
  Store.removeBook(
    e.target.parentElement.parentElement.firstElementChild.innerText
  );
  UI.showAlert("Song Deleted!", "warning");
});
