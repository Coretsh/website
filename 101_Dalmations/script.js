const audio = document.getElementById('audio-track');
let currentPage = 1;
const totalPages = 3;

// Audio markers for each page
const audioMarkers = {
    1: { start: 0, end: 16 },
    2: { start: 16, end: 39 },
    3: { start: 39, end: 60 },
};

// Play audio for the current page
function playAudioForPage(pageNumber) {
    const { start, end } = audioMarkers[pageNumber];
    audio.currentTime = start;
    audio.play();

    audio.ontimeupdate = () => {
        if (audio.currentTime >= end) {
            audio.pause();
        }
    };
}

// Show the page based on the current page number
function showPage(pageNumber) {
    for (let i = 1; i <= totalPages; i++) {
        const page = document.getElementById(`page${i}`);
        page.style.display = (i === pageNumber) ? 'block' : 'none';
    }

    updatePageButtons(); // Update buttons visibility
}

// Update navigation buttons visibility
function updatePageButtons() {
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');

    prevButton.style.display = (currentPage === 1) ? 'none' : 'inline-block';
    nextButton.style.display = (currentPage === totalPages) ? 'none' : 'inline-block';
}

// Go to the next page
function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
        playAudioForPage(currentPage);
    }
}

// Go to the previous page
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
        playAudioForPage(currentPage);
    }
}

// Add audio playback on each page when clicked
document.querySelectorAll('.page').forEach(page => {
    page.addEventListener('click', function () {
        if (audio.paused) {
            playAudioForPage(currentPage);
        }
    });
});

// Initialize Hammer.js for swipe gestures
window.onload = function () {
    if (audio.readyState >= 3) {
        playAudioForPage(currentPage);
    }

    const bookContainer = document.getElementById('book-container');
    const hammer = new Hammer(bookContainer);

    hammer.on('swipeleft', () => {
        if (currentPage < totalPages) {
            nextPage();
        }
    });

    hammer.on('swiperight', () => {
        if (currentPage > 1) {
            previousPage();
        }
    });

    showPage(currentPage);
};
