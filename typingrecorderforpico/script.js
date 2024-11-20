let isRecording = false;
let recordedKeys = [];
const typingBox = document.getElementById("typingBox");
const tabIndentInput = document.getElementById("tabIndent");
const outputBox = document.getElementById("outputBox");

document.getElementById("recordButton").addEventListener("click", () => {
    isRecording = true;
    recordedKeys = []; // Reset recorded keys
    typingBox.value = ""; // Clear the text area
});

document.getElementById("analyzeButton").addEventListener("click", () => {
    let tabSpaces = " ".repeat(tabIndentInput.value * 4); // Convert tab spaces to actual spaces
    let arduinoCode = recordedKeys
        .map((key) => {
            if (key === "<tab>") return `${tabSpaces}Keyboard.write(KEY_TAB);\n${tabSpaces}delay(keydelay);\n${tabSpaces}Keyboard.releaseAll();`;
            if (key === "<enter>") return `${tabSpaces}Keyboard.write(KEY_RETURN);\n${tabSpaces}delay(keydelay);\n${tabSpaces}Keyboard.releaseAll();`;
            if (key === "<left_arrow>") return `${tabSpaces}Keyboard.write(KEY_LEFT_ARROW);\n${tabSpaces}delay(keydelay);\n${tabSpaces}Keyboard.releaseAll();`;
            if (key === "<up_arrow>") return `${tabSpaces}Keyboard.write(KEY_UP_ARROW);\n${tabSpaces}delay(keydelay);\n${tabSpaces}Keyboard.releaseAll();`;
            if (key === "<down_arrow>") return `${tabSpaces}Keyboard.write(KEY_DOWN_ARROW);\n${tabSpaces}delay(keydelay);\n${tabSpaces}Keyboard.releaseAll();`;
            if (key === "<right_arrow>") return `${tabSpaces}Keyboard.write(KEY_RIGHT_ARROW);\n${tabSpaces}delay(keydelay);\n${tabSpaces}Keyboard.releaseAll();`;
            return `${tabSpaces}Keyboard.print('${key}');\n${tabSpaces}delay(keydelay);\n${tabSpaces}Keyboard.releaseAll();`;
        })
        .join("\n");
    outputBox.textContent = arduinoCode; // Display the Arduino code
});

document.getElementById("copyButton").addEventListener("click", () => {
    navigator.clipboard.writeText(outputBox.textContent).then(() => {
        alert("Arduino code copied to clipboard!");
    });
});

// Handle key presses
typingBox.addEventListener("keydown", (event) => {
    if (!isRecording) return;

    event.preventDefault(); // Prevent default browser actions like Tab navigation
    const key = event.key;

    if (key === "Tab") {
        recordedKeys.push("<tab>");
        typingBox.value += "<tab>";
    } else if (key === "Enter") {
        recordedKeys.push("<enter>");
        typingBox.value += "<enter>\n";
    } else if (key === "ArrowLeft") {
        recordedKeys.push("<left_arrow>");
        typingBox.value += "<left_arrow>";
    } else if (key === "ArrowUp") {
        recordedKeys.push("<up_arrow>");
        typingBox.value += "<up_arrow>";
    } else if (key === "ArrowDown") {
        recordedKeys.push("<down_arrow>");
        typingBox.value += "<down_arrow>";
    } else if (key === "ArrowRight") {
        recordedKeys.push("<right_arrow>");
        typingBox.value += "<right_arrow>";
    } else {
        recordedKeys.push(key);
        typingBox.value += key;
    }
});
