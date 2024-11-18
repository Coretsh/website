const audio = document.getElementById('audio-track');
let currentPage = 1; // Start at page 1

// Audio markers for each page (adjust to fit your audio timings)
const audioMarkers = {
    1: { start: 0, end: 16 },  // Audio for Page 1
    2: { start: 16, end: 40 }  // Audio for Page 2
};

// Function to play audio for the current page
function playAudioForPage(pageNumber) {
    const { start, end } = audioMarkers[pageNumber];
    audio.currentTime = start;  // Set the start time
    audio.play();  // Play the audio

    // Stop audio when the end of the segment is reached
    audio.ontimeupdate = () => {
        if (audio.currentTime >= end) {
            audio.pause();
        }
    };
}

// Function to switch to the next page
function nextPage() {
    if (currentPage === 1) {
        // Hide Page 1 and show Page 2
        document.getElementById('page1').style.display = 'none';  // Hide page 1
        document.getElementById('page2').style.display = 'block'; // Show page 2
        document.getElementById('prev-page').style.display = 'block'; // Show previous page button

        currentPage = 2; // Update the current page to 2
        playAudioForPage(currentPage); // Play the audio for page 2
    }
}

// Function to switch to the previous page
function previousPage() {
    if (currentPage === 2) {
        // Hide Page 2 and show Page 1
        document.getElementById('page2').style.display = 'none'; // Hide page 2
        document.getElementById('page1').style.display = 'block'; // Show page 1
        document.getElementById('prev-page').style.display = 'none'; // Hide previous page button

        currentPage = 1; // Update the current page to 1
        playAudioForPage(currentPage); // Play the audio for page 1
    }
}

// Replay the audio of the current page
function replayAudio() {
    playAudioForPage(currentPage);
}

// Start audio on first page click
document.getElementById('page1').addEventListener('click', function () {
    if (audio.paused) {
        playAudioForPage(currentPage);  // Start audio when page 1 is clicked
    }
});

// Ensure that the audio starts when the page loads
window.onload = function () {
    // Ensure the first page's audio starts when the page loads
    if (audio.readyState >= 3) { // Check if audio is ready to play
        playAudioForPage(currentPage);
    }
};
