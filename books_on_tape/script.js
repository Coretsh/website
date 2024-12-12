// Function to show book covers for the selected section
function showBookCovers(section) {
    const overlay = document.getElementById("book-covers-overlay");
    const grid = overlay.querySelector(".book-covers-grid");
    grid.innerHTML = ""; // Clear any existing book covers

    // Example covers for the selected section
    const covers = {
        "1": ["101dalmations.jpg"],
        "A": ["aliceinwonderland.png"],
        "B": ["nobookshere.jpg"],
        "C": ["nobookshere.jpg"],
        "D": ["nobookshere.jpg"],
        "E": ["nobookshere.jpg"],
        "F": ["nobookshere.jpg"],
        "G": ["nobookshere.jpg"],
        "H": ["nobookshere.jpg"],
        "I": ["nobookshere.jpg"],
        "J": ["nobookshere.jpg"],
        "K": ["nobookshere.jpg"],
        "L": ["nobookshere.jpg"],
        "M": ["nobookshere.jpg"],
        "N": ["nobookshere.jpg"],
        "O": ["nobookshere.jpg"],
        "P": ["nobookshere.jpg"],
        "Q": ["nobookshere.jpg"],
        "R": ["nobookshere.jpg"],
        "S": ["nobookshere.jpg"],
        "T": ["nobookshere.jpg"],
        "U": ["nobookshere.jpg"],
        "V": ["nobookshere.jpg"],
        "W": ["nobookshere.jpg"],
        "X": ["nobookshere.jpg"],
        "Y": ["nobookshere.jpg"],
        "Z": ["nobookshere.jpg"],
        "F0": ["kenzochineseclass1.jpg"],
        "K1": ["nobookshere.jpg"],
        "K2": ["nobookshere.jpg"]
    };

    // Load book covers for the selected section
    if (covers[section]) {
        covers[section].forEach((cover) => {
            // Create a container for each book cover
            const coverContainer = document.createElement("div");
            coverContainer.classList.add("cover-container");

            // Create an image element for the cover
            const img = document.createElement("img");
            img.src = `covers/${section}/${cover}`;
            img.alt = "Book Cover";

            // Create a link that points to the book's HTML page
            const link = document.createElement("a");
            const bookName = cover.substring(0, cover.lastIndexOf(".")); // Extract book name without extension
            link.href = `books/${section}/${bookName}/${bookName}.html`; // New link structure
            link.target = "_blank"; // Open in a new tab
            link.appendChild(img);

            // Append the link to the cover container
            coverContainer.appendChild(link);

            // Append the cover container to the grid
            grid.appendChild(coverContainer);
        });
    }

    // Show the overlay
    overlay.style.display = "flex";
}

// Function to return to the bookshelf view
function returnToBookshelf() {
    document.getElementById("book-covers-overlay").style.display = "none";
}

// Function to scale the map for responsiveness
function scaleMap() {
    const img = document.querySelector(".responsive-bookshelf");
    const map = document.querySelector("map");
    const originalWidth = 1180; // Original width of the bookshelf image
    const scale = img.offsetWidth / originalWidth;

    const areas = map.querySelectorAll("area");
    areas.forEach((area) => {
        const originalCoords = area.dataset.originalCoords.split(",").map(Number);
        const scaledCoords = originalCoords.map((coord) => Math.round(coord * scale));
        area.coords = scaledCoords.join(",");
    });
}

window.addEventListener("resize", scaleMap);
window.addEventListener("load", scaleMap);
