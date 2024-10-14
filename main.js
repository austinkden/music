const audio = new Audio(); // Create an Audio object
audio.addEventListener('error', () => {
  alert('Failed to load the song. Please try again.');
});


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
  { name: "Stars", artist: "VIZE", src: "songs/StarsVIZE.mp3" },
  { name: "Through and Through", artist: "khai dreams", src: "songs/ThroughAndThroughkhaidreams.mp3" },
  { name: "Bulletproof", artist: "La Roux", src: "songs/BulletproofLaRoux.mp3" },
  { name: "Nevada", artist: "Vicetone", src: "songs/NevadaVicetone.mp3" },
  { name: "Lullaby", artist: "Sigala", src: "songs/LullabySigala.mp3" },
  { name: "Glad You Came", artist: "VIZE", src: "songs/GladYouCameVIZE.mp3" },
  { name: "Can You Feel It", artist: "BoyWithUke", src: "songs/CanYouFeelItBoyWithUke.mp3" },
  { name: "Under My Breath", artist: "NOTD", src: "songs/UnderMyBreathNOTD.mp3" },
  { name: "All For Love (Luca Schreiner Remix)", artist: "Tungevaag & Raaban", src: "songs/AllForLoveLucaSchreinerRemix.mp3" }, 
  { name: "Born For This", artist: "The Score", src: "songs/BornForThisTheScore.mp3" },
  { name: "Keep You Mine", artist: "NOTD", src: "songs/KeepYouMineNOTD.mp3" },
  { name: "Panic", artist: "NOTD", src: "songs/PanicNOTD.mp3" },
  { name: "Revolution", artist: "The Score", src: "songs/RevolutionTheScore.mp3" },
  { name: "Rise", artist: "Jonas Blue", src: "songs/RiseJonasBlue.mp3" },
  { name: "Show Me Love (EDX Remix, Radio Edit)", artist: "Sam Feldt", src: "songs/ShowMeLoveEDXRemixRadioEdit.mp3" },
  { name: "So Close", artist: "NOTD", src: "songs/SoCloseNOTD.mp3" },
  { name: "Young & Foolish", artist: "Loud Luxury", src: "songs/YoungFoolishLoudLuxury.mp3" },
  { name: "Head Down", artist: "Lost Frequencies", src: "songs/HeadDownLostFrequencies.mp3" },

];

let currentSongIndex = 0;

// Load the first song
loadSong(songs[currentSongIndex]);

function loadSong(song) {
  audio.src = song.src;
  songName.textContent = song.name;
  songArtist.textContent = song.artist;
}

function playSong() {
  audio.play();
  playButton.innerHTML = '<i class="fas fa-pause"></i>';
  document.querySelector('.now-playing').classList.add('playing'); // Add the class to start the animation
}

function pauseSong() {
  audio.pause();
  playButton.innerHTML = '<i class="fas fa-play"></i>';
  document.querySelector('.now-playing').classList.remove('playing'); // Remove the class to stop the animation
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

// Update progress bar as the song plays
audio.addEventListener('timeupdate', () => {
  const progressBar = document.getElementById('progress-bar');
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;
});

// Seek the song when the progress bar is changed
document.getElementById('progress-bar').addEventListener('input', (event) => {
  const seekTime = (event.target.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});
function updateProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  const progress = (audio.currentTime / audio.duration) * 100;

  // Set the background gradient to fill behind the dot
  progressBar.style.backgroundImage = `linear-gradient(to right, var(--color-heading) ${progress}%, var(--color-tile) ${progress}%)`;

  progressBar.value = progress;

  // Continuously update the progress bar as the song plays
  requestAnimationFrame(updateProgressBar);
}

// Ensure the progress bar updates while the song is playing
audio.addEventListener('play', () => {
  requestAnimationFrame(updateProgressBar);
});

// Seek the song when the progress bar is manually adjusted
document.getElementById('progress-bar').addEventListener('input', (event) => {
  const seekTime = (event.target.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});
