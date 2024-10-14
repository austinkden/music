const audio = new Audio(); // Create an Audio object
const playButton = document.getElementById("play");
const backButton = document.getElementById("back");
const nextButton = document.getElementById("next");
const songName = document.querySelector(".song-name");
const songArtist = document.querySelector(".song-artist");
const searchBar = document.getElementById("search-bar");
const searchResultsContainer = document.querySelector(".search-results");

const songs = [
    { name: "MVA Structure Involved", artist: "South Metro Fire Rescue", src: "songs/StructureInvolvedMVA.mp3" },
    { name: "Low Tones", artist: "South Metro Fire Rescue", src: "songs/LowTones.mp3" },
    { name: "Goosebumps", artist: "HVME", src: "songs/GoosebumpsHVME.mp3" },
    // Add more songs as needed
  ];

let currentSongIndex = 0;

// Load the first song
loadSong(songs[currentSongIndex]);

function loadSong(song) {
  audio.src = song.src;
  songName.textContent = song.name;
  songArtist.textContent = song.artist;
}

// Function to play the song
function playSong() {
  audio.play();
  playButton.innerHTML = '<i class="fas fa-pause"></i>';
}

// Function to pause the song
function pauseSong() {
  audio.pause();
  playButton.innerHTML = '<i class="fas fa-play"></i>';
}

// Function to display search results
function displaySearchResults(searchTerm) {
  searchResultsContainer.innerHTML = ""; // Clear previous results

  const filteredSongs = songs.filter(song =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filteredSongs.forEach(song => {
    const searchItem = document.createElement("div");
    searchItem.className = "tile search-item";
    searchItem.innerHTML = `
      <h1 class="name">${song.name}</h1>
      <p class="artist">${song.artist}</p>
    `;
    searchItem.addEventListener("click", () => {
      currentSongIndex = songs.indexOf(song);
      loadSong(song);
      playSong();
    });

    searchResultsContainer.appendChild(searchItem);
  });
}

// Event Listeners
playButton.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
});

backButton.addEventListener("click", () => {
  currentSongIndex =
    (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
});

// Search functionality
searchBar.addEventListener("input", (event) => {
  const searchTerm = event.target.value;
  displaySearchResults(searchTerm);
});

// Display all songs on initial load
displaySearchResults("");
