let recording = false;
const keyLog = [];

// Handle the recording button toggle
document.getElementById('recordButton').addEventListener('click', () => {
    recording = !recording; // Toggle recording state

    if (recording) {
        document.getElementById('recordButton').textContent = 'Stop Recording';
        keyLog.length = 0;  // Clear the key log when recording starts
        document.getElementById('keyLog').innerHTML = '';  // Clear displayed log
    } else {
        document.getElementById('recordButton').textContent = 'Start Recording';
    }
});

// Handle typing events in the text area
document.getElementById('typingBox').addEventListener('keydown', (event) => {
    if (recording) {
        let keyName = event.key;

        // Handle special keys like Tab and Space
        if (keyName === ' ') {
            keyName = 'Space';
        } else if (keyName === 'Tab') {
            event.preventDefault(); // Prevent tabbing out of the textarea
            keyName = 'Tab';

            // Insert "<tab>" text at the caret position inside the text area
            const textarea = event.target;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            // Insert "<tab>" at the current caret position
            const tabText = "<tab>";
            textarea.value = textarea.value.substring(0, start) + tabText + textarea.value.substring(end);

            // Move the caret after the inserted text
            textarea.selectionStart = textarea.selectionEnd = start + tabText.length;
        }

        // Log the key press in the keyLog array
        keyLog.push(`Key Pressed: ${keyName}`);
        updateLog();
    }
});

// Update the displayed key log
function updateLog() {
    const logContainer = document.getElementById('keyLog');
    logContainer.innerHTML = keyLog.join('\n');
}

// Analyze button to generate Arduino code from the typed text
document.getElementById('analyzeButton').addEventListener('click', () => {
    const typedText = document.getElementById('typingBox').value;
    const tabIndent = parseInt(document.getElementById('tabIndent').value); // Get the indentation value
    const arduinoCode = generateArduinoCode(typedText, tabIndent);
    document.getElementById('codeOutput').textContent = arduinoCode;
});

// Copy code button to copy Arduino code to clipboard
document.getElementById('copyButton').addEventListener('click', () => {
    const codeOutput = document.getElementById('codeOutput').textContent;
    if (codeOutput) {
        navigator.clipboard.writeText(codeOutput)
            .then(() => {
                alert('Code copied to clipboard!');
            })
            .catch(err => {
                alert('Failed to copy code. Error: ' + err);
            });
    } else {
        alert('No code to copy!');
    }
});

// Generate Arduino code from the typed text
function generateArduinoCode(text, tabIndent) {
    let code = '';
    const keydelay = 'keydelay';  // Placeholder for key delay
    const tabSpaces = '\t'.repeat(tabIndent); // Generate tab spaces based on user input

    let i = 0;
    while (i < text.length) {
        // Check if the substring starting at index `i` matches '<tab>'
        if (text.substr(i, 5) === '<tab>') {
            code += `${tabSpaces}Keyboard.write(KEY_TAB);\n`;
            code += `${tabSpaces}delay(${keydelay});\n`;
            code += `${tabSpaces}Keyboard.releaseAll();\n\n`;
            i += 5; // Skip the 5 characters corresponding to '<tab>'
        } 
        // Check for newlines to handle the Enter key
        else if (text[i] === '\n') {
            code += `${tabSpaces}Keyboard.write(KEY_RETURN);\n`;
            code += `${tabSpaces}delay(${keydelay});\n`;
            code += `${tabSpaces}Keyboard.releaseAll();\n\n`;
            i++; // Move to the next character
        } 
        // For regular characters, output `Keyboard.print()` as usual
        else {
            const char = text[i];
            code += `${tabSpaces}Keyboard.print('${char}');\n`;
            code += `${tabSpaces}delay(${keydelay});\n`;
            code += `${tabSpaces}Keyboard.releaseAll();\n\n`;
            i++; // Move to the next character
        }
    }
    return code;
}
