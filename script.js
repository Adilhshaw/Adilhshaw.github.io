// Initialize the player and variables
let audio = new Audio();
let currentTrackIndex = 0;
let isPlaying = false;

let progressBar = document.getElementById('progress-bar');
let playPauseBtn = document.getElementById('play-pause-btn');
let backwardBtn = document.getElementById('backward-btn');
let forwardBtn = document.getElementById('forward-btn');
let currentTrackElement = document.getElementById('current-track');
let trackDurationElement = document.getElementById('track-duration');
let volumeBar = document.getElementById('volume-bar');

// Function to format time as MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}

// Function to load a track
function loadTrack(file, name) {
    audio.src = file; // Set audio source
    audio.load(); // Load the audio file
    currentTrackElement.textContent = name; // Display the track name
    audio.onloadedmetadata = function () {
        updateTrackDuration(); // Update duration once metadata is loaded
    };
}

// Function to update track duration
function updateTrackDuration() {
    const totalTime = formatTime(audio.duration || 0);
    trackDurationElement.textContent = `0:00 / ${totalTime}`;
}

// Function to toggle play/pause
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = "Play";
    } else {
        audio.play();
        playPauseBtn.textContent = "Pause";
    }
    isPlaying = !isPlaying;
}

// Function to update progress bar and time
function updateProgress() {
    const currentTime = audio.currentTime;
    const duration = audio.duration || 1; // Avoid NaN

    progressBar.value = (currentTime / duration) * 100; // Update progress bar
    trackDurationElement.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
}

// Function to jump backward
function jumpBackward() {
    audio.currentTime = Math.max(0, audio.currentTime - 20);
}

// Function to jump forward
function jumpForward() {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
}

// Function to handle volume control
volumeBar.addEventListener('input', function () {
    audio.volume = this.value / 100; // Convert [0, 100] to [0.0, 1.0]
});

// Event listeners for player controls
playPauseBtn.addEventListener('click', togglePlayPause);
backwardBtn.addEventListener('click', jumpBackward);
forwardBtn.addEventListener('click', jumpForward);

// Handle track selection from the list
const fileListItems = document.querySelectorAll('#file-list li');
fileListItems.forEach((item, index) => {
    item.addEventListener('click', function () {
        // Highlight the selected track
        fileListItems.forEach((fileItem) => fileItem.classList.remove('selected'));
        item.classList.add('selected');

        // Load the selected track
        const file = item.getAttribute('data-file');
        const name = item.getAttribute('data-name');
        loadTrack(file, name);

        currentTrackIndex = index;
        
        // Play the newly loaded track immediately
        audio.play();
        playPauseBtn.textContent = "Pause"; // Update the button text
        isPlaying = true;
    });
});

// Update progress bar during playback
audio.addEventListener('timeupdate', updateProgress);

// Play the next track automatically when the current one ends
audio.addEventListener('ended', function () {
    currentTrackIndex = (currentTrackIndex + 1) % fileListItems.length; // Loop back to the start
    fileListItems[currentTrackIndex].click(); // Trigger click on the next track
});

// Allow user to seek with the progress bar
progressBar.addEventListener('input', function () {
    audio.currentTime = (this.value / 100) * audio.duration;
});

// Load the first track on page load
loadTrack(fileListItems[0].getAttribute('data-file'), fileListItems[0].getAttribute('data-name'));
