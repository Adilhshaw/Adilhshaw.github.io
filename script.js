// Initialize the player and variables
let audio = new Audio();
let currentTrackIndex = 0;
let tracks = [];
let isPlaying = false;
let progressBar = document.getElementById('progress-bar');
let playPauseBtn = document.getElementById('play-pause-btn');
let backwardBtn = document.getElementById('backward-btn');
let forwardBtn = document.getElementById('forward-btn');
let currentTrackElement = document.getElementById('current-track');
let trackDurationElement = document.getElementById('track-duration');

// Function to load a track
function loadTrack(file) {
    audio.src = file;
    audio.load();
    currentTrackElement.textContent = file.split('/').pop();  // Display track name
    audio.onloadedmetadata = function() {
        updateTrackDuration();  // Update the duration when track is loaded
    };
}

// Function to play or pause the audio
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = "Play";  // Change text to "Play" when paused
    } else {
        audio.play();
        playPauseBtn.textContent = "Pause";  // Change text to "Pause" when playing
    }
    isPlaying = !isPlaying;
}

// Function to update progress bar and track duration
function updateProgress() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    progressBar.value = (currentTime / duration) * 100;  // Update progress bar

    // Convert time to minutes and seconds for display
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);

    // Update track duration display (current time / total time)
    trackDurationElement.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds} / ${totalMinutes}:${totalSeconds < 10 ? '0' + totalSeconds : totalSeconds}`;
}

// Function to skip 20 seconds back
function jumpBackward() {
    audio.currentTime = Math.max(0, audio.currentTime - 20);  // Ensure it doesn't go below 0
}

// Function to skip 10 seconds forward
function jumpForward() {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);  // Ensure it doesn't go beyond track duration
}

// Event listeners for the buttons
playPauseBtn.addEventListener('click', togglePlayPause);
backwardBtn.addEventListener('click', jumpBackward);
forwardBtn.addEventListener('click', jumpForward);

// Handle track selection from the list
const fileListItems = document.querySelectorAll('#file-list li');
fileListItems.forEach((item, index) => {
    item.addEventListener('click', function() {
        loadTrack(item.getAttribute('data-file'));  // Load the selected track
        item.classList.add('selected');  // Highlight the selected track in the list
        currentTrackIndex = index;  // Set current track index
        togglePlayPause();  // Toggle play/pause when a track is selected
    });
});

// Update the progress bar while the audio is playing
audio.addEventListener('timeupdate', updateProgress);

// Load the first track on page load
loadTrack(fileListItems[0].getAttribute('data-file'));
