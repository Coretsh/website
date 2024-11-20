let recording = false;
const keyLog = [];
const USER_ACTION_DELAY = 100; // Define the delay time in milliseconds

// Handle the recording button toggle
document.getElementById('recordButton').addEventListener('click', () => {
    recording = !recording; // Toggle recording state

    if (recording) {
        document.getElementById('recordButton').textContent = 'Stop Recording';
        keyLog.length = 0; // Clear the key log when recording starts
        document.getElementById('typingBox').value = ''; // Clear the text box
    } else {
        document.getElementById('recordButton').textContent = 'Start Recording';
    }
});

// Handle typing events in the text area
document.getElementById('typingBox').addEventListener('keydown', (event) => {
    if (recording) {
        let keyName = event.key;
        const textarea = event.target;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        // Handle special arrow keys
        switch (keyName) {
            case 'ArrowLeft':
                keyName = '<left_arrow>';
                insertTextAtCaret(textarea, keyName, start, end);
                break;
            case 'ArrowRight':
                keyName = '<right_arrow>';
                insertTextAtCaret(textarea, keyName, start, end);
                break;
            case 'ArrowUp':
                keyName = '<up_arrow>';
                insertTextAtCaret(textarea, keyName, start, end);
                break;
            case 'ArrowDown':
                keyName = '<down_arrow>';
                insertTextAtCaret(textarea, keyName, start, end);
                break;
            case 'Tab': // Handle Tab key
                event.preventDefault();
                keyName = '<tab>';
                insertTextAtCaret(textarea, keyName, start, end);
                break;
            case ' ': // Handle Space key
                keyName = ' ';
                break;
            default:
                break;
        }

        // Log the key press for Arduino code generation
        keyLog.push(`Key Pressed: ${keyName}`);
    }
});

// Helper function to insert text at caret position
function insertTextAtCaret(textarea, text, start, end) {
    textarea.value = textarea.value.substring(0, start) + text + textarea.value.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + text.length;
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
    const tabSpaces = '\t'.repeat(tabIndent); // Generate tab spaces based on user input

    let i = 0;
    while (i < text.length) {
        // Check for arrow keys or <tab> tokens
        if (text.substr(i, 12) === '<left_arrow>') {
            code += `${tabSpaces}bleKeyboard.write(KEY_LEFT_ARROW);\n`;
            code += `${tabSpaces}delay(USER_ACTION_DELAY);\n`;
            code += `${tabSpaces}bleKeyboard.releaseAll();\n\n`;
            i += 12;
        } else if (text.substr(i, 13) === '<right_arrow>') {
            code += `${tabSpaces}bleKeyboard.write(KEY_RIGHT_ARROW);\n`;
            code += `${tabSpaces}delay(USER_ACTION_DELAY);\n`;
            code += `${tabSpaces}bleKeyboard.releaseAll();\n\n`;
            i += 13;
        } else if (text.substr(i, 10) === '<up_arrow>') {
            code += `${tabSpaces}bleKeyboard.write(KEY_UP_ARROW);\n`;
            code += `${tabSpaces}delay(USER_ACTION_DELAY);\n`;
            code += `${tabSpaces}bleKeyboard.releaseAll();\n\n`;
            i += 10;
        } else if (text.substr(i, 12) === '<down_arrow>') {
            code += `${tabSpaces}bleKeyboard.write(KEY_DOWN_ARROW);\n`;
            code += `${tabSpaces}delay(USER_ACTION_DELAY);\n`;
            code += `${tabSpaces}bleKeyboard.releaseAll();\n\n`;
            i += 12;
        } else if (text.substr(i, 5) === '<tab>') {
            code += `${tabSpaces}bleKeyboard.write(KEY_TAB);\n`;
            code += `${tabSpaces}delay(USER_ACTION_DELAY);\n`;
            code += `${tabSpaces}bleKeyboard.releaseAll();\n\n`;
            i += 5;
        } else if (text[i] === '\n') {
            code += `${tabSpaces}bleKeyboard.write(KEY_RETURN);\n`;
            code += `${tabSpaces}delay(USER_ACTION_DELAY);\n`;
            code += `${tabSpaces}bleKeyboard.releaseAll();\n\n`;
            i++;
        } else {
            const char = text[i];
            code += `${tabSpaces}bleKeyboard.print('${char}');\n`;
            code += `${tabSpaces}delay(USER_ACTION_DELAY);\n`;
            code += `${tabSpaces}bleKeyboard.releaseAll();\n\n`;
            i++;
        }
    }
    return code;
}
