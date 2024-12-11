const audio = document.getElementById('audio-track');
let currentPage = 1;
const totalPages = 21;

// Audio markers for each page
const audioMarkers = {
    1: { start: 0, end: 0 },
    2: { start: 0, end: 0 },
    3: { start: 0, end: 0 },
    4: { start: 0, end: 0 },
    5: { start: 0, end: 0 },
    6: { start: 0, end: 0 },
    7: { start: 0, end: 0 },
    8: { start: 0, end: 0 },
    9: { start: 0, end: 0 },
    10: { start: 0, end: 0 },
    11: { start: 0, end: 0 },
    12: { start: 0, end: 0 },
    13: { start: 0, end: 0 },
    14: { start: 0, end: 0 },
    15: { start: 0, end: 0 },
    16: { start: 0, end: 0 },
    17: { start: 0, end: 0 },
    18: { start: 0, end: 0 },
    19: { start: 0, end: 0 },
    20: { start: 0, end: 0 },
    21: { start: 0, end: 0 },

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

    updateNavigationButtons(); // Update buttons visibility
}

function updateNavigationButtons() {
    document.getElementById('prev-page').style.visibility = currentPage === 1 ? 'hidden' : 'visible';
    document.getElementById('next-page').style.visibility = currentPage === totalPages ? 'hidden' : 'visible';
}

// Go to the next page
function nextPage() {
    if (currentPage < totalPages) {
        document.getElementById(`page${currentPage}`).style.display = 'none';
        currentPage++;
        document.getElementById(`page${currentPage}`).style.display = 'block';
        playAudioForPage(currentPage);
        updateNavigationButtons();
    }
}

// Go to the previous page
function previousPage() {
    if (currentPage > 1) {
        document.getElementById(`page${currentPage}`).style.display = 'none';
        currentPage--;
        document.getElementById(`page${currentPage}`).style.display = 'block';
        playAudioForPage(currentPage);
        updateNavigationButtons();
    }
}

// Navigate back to the bookshelf
function goBackToBookshelf() {
    window.location.href = 'https://coretsh.github.io/website/books_on_tape/bookshelf.html#'; // Redirect to bookshelf page
}

// Call this function when the page loads
window.onload = function () {
    playAudioForPage(currentPage);
    updateNavigationButtons();

    // Initialize Hammer.js for swipe gestures
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
