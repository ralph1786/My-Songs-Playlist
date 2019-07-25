import Song from "./Song.js";
import UI from "./UI.js";
import Store from "./Store.js";

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
