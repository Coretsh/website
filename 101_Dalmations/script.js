const audio = document.getElementById('audio-track');
let currentPage = 1; // Start on page 1

// Audio markers for each page
const audioMarkers = {
    1: { start: 0, end: 10 },
    2: { start: 10, end: 20 },
};

// Play audio for the current page
function playAudioForPage(pageNumber) {
    const { start, end } = audioMarkers[pageNumber];
    audio.currentTime = start; // Start audio at the correct marker
    audio.play();

    audio.ontimeupdate = () => {
        if (audio.currentTime >= end) {
            audio.pause();
        }
    };
}

// Go to the next page
function nextPage() {
    if (currentPage === 1) {
        document.getElementById('page1').style.display = 'none';
        document.getElementById('page2').style.display = 'block';
        document.getElementById('prev-page').style.display = 'block'; // Show previous button
        currentPage = 2;
        playAudioForPage(currentPage); // Play audio for Page 2
    }
}

// Go to the previous page
function previousPage() {
    if (currentPage === 2) {
        document.getElementById('page2').style.display = 'none';
        document.getElementById('page1').style.display = 'block';
        document.getElementById('prev-page').style.display = 'none'; // Hide previous button
        currentPage = 1;
        playAudioForPage(currentPage); // Play audio for Page 1
    }
}

// Replay the current page's audio
function replayAudio() {
    playAudioForPage(currentPage);
}

// Add audio playback on the first page when clicked
document.getElementById('page1').addEventListener('click', function () {
    if (audio.paused) {
        playAudioForPage(currentPage);
    }
});

// Ensure that the audio starts when the page loads
window.onload = function () {
    // Ensure the first page's audio starts when the page loads
    if (audio.readyState >= 3) { // Check if audio is ready to play
        playAudioForPage(currentPage);
    }

    // Initialize Hammer.js for swipe gestures
    const bookContainer = document.getElementById('book-container');
    const hammer = new Hammer(bookContainer);

    // Detect swipe gestures
    hammer.on('swipeleft', () => {
        if (currentPage === 1) {
            nextPage(); // Go to the next page on swipe left
        }
    });

    hammer.on('swiperight', () => {
        if (currentPage === 2) {
            previousPage(); // Go to the previous page on swipe right
        }
    });
};
