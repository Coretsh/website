// Function to show book covers for the selected section
function showBookCovers(section) {
    const overlay = document.getElementById("book-covers-overlay");
    const grid = overlay.querySelector(".book-covers-grid");
    grid.innerHTML = ""; // Clear any existing book covers

    // Example covers for the selected section
    const covers = {
        "1": ["101dalmations.jpg"],
        "A": ["aliceinwonderland.png", "book2.jpg"],
        "B": ["book3.jpg"],
        "C": ["book4.jpg"],
        "D": ["book5.jpg"],
        "E": ["book6.jpg"],
        "F": ["book7.jpg"],
        "G": ["book8.jpg"],
        "H": ["book9.jpg"],
        "I": ["book10.jpg"],
        "J": ["book11.jpg"],
        "K": ["book12.jpg"],
        "L": ["book13.jpg"],
        "M": ["book14.jpg"],
        "N": ["book15.jpg"],
        "O": ["book16.jpg"],
        "P": ["book17.jpg"],
        "Q": ["book18.jpg"],
        "R": ["book19.jpg"],
        "S": ["book20.jpg"],
        "T": ["book21.jpg"],
        "U": ["book22.jpg"],
        "V": ["book23.jpg"],
        "W": ["book24.jpg"],
        "X": ["book25.jpg"],
        "Y": ["book26.jpg"],
        "Z": ["book27.jpg"],
        "F0": ["book28.jpg"],
        "K1": ["book29.jpg"],
        "K2": ["book30.jpg"]
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
            // Update the link to reflect the new folder structure
            const bookName = cover.replace(".jpg", ""); // Extract book name without extension
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
