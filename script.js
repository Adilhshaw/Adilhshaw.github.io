// Array of audio files with their names and direct links
const files = [
    { name: "Right Now", link: "https://drive.google.com/uc?export=download&id=1LKPuCvTp-6_OQPhN8Uq0wW9dyv-8fMtz" },
    { name: "Chamak Challo", link: "https://drive.google.com/uc?export=download&id=1oHsDN2A8jt2QJOy-c9pwz_NLbOOWlSWv" }];

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
