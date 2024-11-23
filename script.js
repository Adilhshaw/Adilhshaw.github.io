document.addEventListener('DOMContentLoaded', function() {
    const files = [
        { name: "Track 1 - Chamak Sample", file: "track1.mp3" },
        { name: "Track 2 - Sample 2", file: "track2.mp3" },
    ];

    const fileList = document.getElementById("file-list");
    const audioPlayer = new Audio(); // Create a new Audio object for custom control
    const playPauseBtn = document.getElementById("play-pause-btn");
    const progressBar = document.getElementById("progress-bar");
    const volumeBar = document.getElementById("volume-bar");
    const currentTrackDisplay = document.getElementById("current-track");
    const trackDuration = document.getElementById("track-duration");

    // Update the progress bar as the audio plays
    audioPlayer.addEventListener("timeupdate", function() {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;

        // Update track duration display
        const minutes = Math.floor(audioPlayer.currentTime / 60);
        const seconds = Math.floor(audioPlayer.currentTime % 60);
        trackDuration.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    });

    // Handle play/pause button
    playPauseBtn.addEventListener("click", function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.textContent = "❚❚"; // Change to pause icon
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = "►"; // Change to play icon
        }
    });

    // Handle volume change
    volumeBar.addEventListener("input", function() {
        audioPlayer.volume = volumeBar.value / 100;
    });

    // Dynamically populate file list
    files.forEach(file => {
        const fileItem = document.createElement("li");
        fileItem.textContent = file.name;
        fileItem.dataset.file = file.file;

        // Event listener for clicking on track
        fileItem.addEventListener("click", function() {
            // Remove 'selected' class from all items
            const allItems = fileList.querySelectorAll("li");
            allItems.forEach(item => item.classList.remove("selected"));

            // Add 'selected' class to the clicked item
            fileItem.classList.add("selected");

            // Update audio source and play
            audioPlayer.src = fileItem.dataset.file; // Set new file source
            audioPlayer.play(); // Play the audio
            playPauseBtn.textContent = "❚❚"; // Change to pause icon
            currentTrackDisplay.textContent = file.name; // Update track name
            trackDuration.textContent = "0:00"; // Reset duration
        });

        fileList.appendChild(fileItem);
    });

    // Update progress bar when clicked
    progressBar.addEventListener("input", function() {
        audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
    });
});
