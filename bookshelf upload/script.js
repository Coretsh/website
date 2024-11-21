function showBookCovers(section) {
    const overlay = document.getElementById("book-covers-overlay");
    const grid = overlay.querySelector(".book-covers-grid");
    grid.innerHTML = ""; // Clear any existing book covers

    // Example covers for the selected section
    const covers = {
        "1": ["101dalmations.jpg"],
        "A": ["book1.jpg", "book2.jpg"],
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
            const img = document.createElement("img");
            img.src = `covers/${section}/${cover}`;
            img.alt = "Book Cover";
            grid.appendChild(img);
        });
    }

    // Show the overlay
    overlay.style.display = "flex";
}

function returnToBookshelf() {
    document.getElementById("book-covers-overlay").style.display = "none";
}

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