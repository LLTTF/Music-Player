// List of songs with their names, artists, and audio file paths
let songs = [
    { name: "Back in Black", artist: "ACDC", audioFile: "./music/2.mp3" },
    { name: "Intro", artist: "Ariana Grande", audioFile: "./music/1.mp3" },
    { name: "Stuck with U", artist: "Ariana Grande", audioFile: "./music/3.mp3" },
    { name: "Stairway to Heaven", artist: "Led Zeppelin", audioFile: "./music/4.mp3" },
    { name: "Beat It", artist: "Michael Jackson", audioFile: "./music/5.mp3" },
    { name: "Chicago", artist: "Michael Jackson", audioFile: "./music/6.mp3" },
    { name: "While My Guitar Gently Weeps", artist: "Santana", audioFile: "./music/7.mp3" },
    { name: "Cardigan", artist: "Taylor Swift", audioFile: "./music/8.mp3" }
];

let currentSongIndex = 0;  // Current song index
const songNameElement = document.getElementById('song-name');
const artistNameElement = songNameElement.querySelector('span');
const backButton = document.getElementById('back');
const nextButton = document.getElementById('next');
const pausePlayButton = document.querySelector('.pause-play i'); // Updated this line

// Get references to the audio player and the progress bar elements
const audioPlayer = document.getElementById('audio-player');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');

// Function to update the current song
function updateSong() {
    const currentSong = songs[currentSongIndex];
    songNameElement.innerHTML = `${currentSong.name} ~ <span>${currentSong.artist}</span>`;

    // Enable/Disable buttons based on the current song index
    if (currentSongIndex === 0) {
        backButton.classList.add('disabled');  // Disable back button if at the start
    } else {
        backButton.classList.remove('disabled');
    }

    if (currentSongIndex === songs.length - 1) {
        nextButton.classList.add('disabled');  // Disable next button if at the end
    } else {
        nextButton.classList.remove('disabled');
    }

    // Set the audio source to the current song's audio file
    audioPlayer.src = currentSong.audioFile;
    audioPlayer.play();

    // Update the album image randomly
    setRandomImage();
    setPausePlayButton();  // Ensure correct play/pause button
}

// Play/Pause button functionality
pausePlayButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();  // Play the audio if it is paused
        pausePlayButton.classList.remove('fa-play');  // Remove play icon
        pausePlayButton.classList.add('fa-pause');   // Add pause icon
    } else {
        audioPlayer.pause();  // Pause the audio if it is playing
        pausePlayButton.classList.remove('fa-pause'); // Remove pause icon
        pausePlayButton.classList.add('fa-play');     // Add play icon
    }
});

// Back button event listener
backButton.addEventListener('click', () => {
    if (currentSongIndex > 0) {
        currentSongIndex--;  // Go to the previous song
        updateSong();
    }
});

// Next button event listener
nextButton.addEventListener('click', () => {
    if (currentSongIndex < songs.length - 1) {
        currentSongIndex++;  // Go to the next song
        updateSong();
    }
});

// Function to pick a random image from the images array
const images = ["chill.jpg", "lofi-girl.jpg", "minecraft-house.jpg", "pretty.jpg", "rainy.jpg", "window.jpg"];

function setRandomImage() {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const albumImageElement = document.getElementById('album-image');
    albumImageElement.src = `./images/${randomImage}`;
}

// Function to update the progress bar and time displays
function updateProgress() {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;

    // Update the progress bar value
    progressBar.value = (currentTime / duration) * 100;

    // Update the current time and total time displays
    currentTimeDisplay.textContent = formatTime(currentTime);
    totalTimeDisplay.textContent = formatTime(duration);
}

// Function to format time in MM:SS format
function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Event listener to update the progress bar as the song plays
audioPlayer.addEventListener('timeupdate', updateProgress);

// Event listener to change the audio current time when the progress bar is clicked
progressBar.addEventListener('input', () => {
    const duration = audioPlayer.duration;
    const newTime = (progressBar.value / 100) * duration;
    audioPlayer.currentTime = newTime;
});

// Event listener to change the song when it ends
audioPlayer.addEventListener('ended', () => {
    if (currentSongIndex < songs.length - 1) {
        currentSongIndex++;  // Move to the next song
        updateSong();
    }
});

// Function to set the play/pause button icon based on the audio player state
function setPausePlayButton() {
    if (audioPlayer.paused) {
        pausePlayButton.classList.remove('fa-pause');
        pausePlayButton.classList.add('fa-play');
    } else {
        pausePlayButton.classList.remove('fa-play');
        pausePlayButton.classList.add('fa-pause');
    }
}

// Start playing the audio automatically when the page loads
window.onload = () => {
    updateSong();
};
