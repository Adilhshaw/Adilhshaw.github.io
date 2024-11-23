document.addEventListener('DOMContentLoaded', function() {
    const files = [
        { name: "Track 1 - Chill Beats", file: "Track1.mp3" },
        { name: "Track 2 - Smooth Jazz", file: "Track2.mp3" }
    ];

    const fileList = document.getElementById("file-list");
    const audioPlayer = document.getElementById("audio-player");
    const audioSource = document.getElementById("audio-source");
    const currentTrackDisplay = document.getElementById("current-track");

    // Dynamically populate file list
    files.forEach(file => {
        const fileItem = document.createElement("li");
        fileItem.textContent = file.name;
        fileItem.dataset.file = file.file;

        // Event listener for clicking on track
        fileItem.addEventListener("click", function() {
            audioSource.src = fileItem.dataset.file; // Update audio source
            audioPlayer.load(); // Reload the audio element with the new source
            audioPlayer.play(); // Automatically start playing
            currentTrackDisplay.textContent = file.name; // Update "Now Playing"
        });

        fileList.appendChild(fileItem);
    });
});
