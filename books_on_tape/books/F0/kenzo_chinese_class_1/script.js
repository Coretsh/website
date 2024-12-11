const audio = document.getElementById('audio-track');
let currentPage = 1;
const totalPages = 21;

// Audio markers for each page
const audioMarkers = {
    
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
    window.location.href = 'file:///D:/Coretsh/Coretsh%20website/Books_on_tape/books_on_tape/bookshelf.html#'; // Redirect to bookshelf page
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
