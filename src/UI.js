import Store from "./Store.js";

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

export default UI;
