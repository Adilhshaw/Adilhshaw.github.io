// Array of audio files with their names and direct links
const files = [
    { name: "Right Now", link: "Track1.mp3" },
    { name: "Chamak Challo", link: "Track2.mp3" }];

const fileList = document.getElementById("fileList");
const audioPlayer = document.getElementById("audioPlayer");
const audioSource = document.getElementById("audioSource");
const nowPlaying = document.getElementById("nowPlaying");

// Populate the file list dynamically
files.forEach((file, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = file.name;
    listItem.dataset.link = file.link;
    listItem.dataset.index = index;

    // Add click event listener for each file
    listItem.addEventListener("click", (e) => {
        e.preventDefault();
        const activeItem = document.querySelector(".file-list li.active");
        if (activeItem) activeItem.classList.remove("active"); // Remove active class from previous item

        listItem.classList.add("active"); // Highlight the selected item
        audioSource.src = file.link; // Set the audio source
        nowPlaying.textContent = `Now Playing: ${file.name}`; // Update now playing text
        audioPlayer.load(); // Load the new audio
        audioPlayer.play(); // Play the audio
    });

    fileList.appendChild(listItem); // Append to file list
});

// Set the first track as default (optional)
if (files.length > 0) {
    fileList.children[0].click();
}
