const audio = document.getElementById('audio-track');
let currentPage = 1;
const totalPages = 21;

// Audio markers for each page
const audioMarkers = {
    1: { },
    2: { start: 16, end: 39 },
    3: { start: 39, end: 1 * 60 + 53 },
    4: { start: 1 * 60 + 53, end: 2 * 60 + 57 },
    5: { start: 2 * 60 + 57, end: 3 * 60 + 33 },
    6: { start: 3 * 60 + 33, end: 4 * 60 + 10 },
    7: { start: 4 * 60 + 10, end: 5 * 60 + 02 },
    8: { start: 5 * 60 + 02, end: 5 * 60 + 44 },
    9: { start: 5 * 60 + 44, end: 6 * 60 + 32 },
    10: { start: 6 * 60 + 32, end: 7 * 60 + 13 },
    11: { start: 7 * 60 + 13, end: 8 * 60 + 37 },
    12: { start: 8 * 60 + 37, end: 9 * 60 + 21 },
    13: { },
    14: { },
    15: {},
    16: {},
    17: {},
    18: {},
    19: {},
    20: {},
    21: {},
    
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