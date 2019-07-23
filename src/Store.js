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

export default Store;
