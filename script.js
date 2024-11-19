const display = document.getElementById('display');
const keys = document.querySelectorAll('.calculator-keys button');

let currentInput = '';
let operator = '';
let previousInput = '';

keys.forEach(key => {
    key.addEventListener('click', () => {
        const value = key.value;

        if (value === 'clear') {
            currentInput = '';
            previousInput = '';
            operator = '';
            display.value = '';
        } else if (value === 'backspace') {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
        } else if (value === '=') {
            if (currentInput && previousInput) {
                display.value = calculate(previousInput, operator, currentInput);
                previousInput = display.value; // Keep the result for further calculations
                currentInput = '';
                operator = '';
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput) {
                if (previousInput) {
                    previousInput = calculate(previousInput, operator, currentInput);
                } else {
                    previousInput = currentInput;
                }
                operator = value;
                currentInput = '';
            }
            updateDisplay(); // Update display to show the operation
        } else {
            currentInput += value;
            updateDisplay(); // Update display to show current input
        }
    });
});

function calculate(prev, operator, curr) {
    prev = parseFloat(prev);
    curr = parseFloat(curr);
    switch (operator) {
        case '+':
            return prev + curr;
        case '-':
            return prev - curr;
        case '*':
            return prev * curr;
        case '/':
            return prev / curr;
        default:
            return curr;
    }
}

function updateDisplay() {
    // Display the current operation
    if (previousInput && operator) {
        display.value = `${previousInput} ${operator} ${currentInput}`;
    } else {
        display.value = currentInput;
    }
}