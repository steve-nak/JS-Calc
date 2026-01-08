// Get DOM elements
const expressionInput = document.getElementById('expression');
const calculateBtn = document.getElementById('calculateBtn');
const resultDiv = document.getElementById('result');

// Calculate function
function calculate() {
    const expression = expressionInput.value.trim();
    
    // Clear previous result
    resultDiv.textContent = '';
    resultDiv.className = 'result';
    
    // Check if expression is empty
    if (!expression) {
        resultDiv.textContent = 'Please enter an expression';
        resultDiv.classList.add('error');
        return;
    }
    
    try {
        // Validate expression - only allow numbers, operators, parentheses, dots, and spaces
        const validPattern = /^[0-9+\-*/.() ]+$/;
        if (!validPattern.test(expression)) {
            throw new Error('Invalid characters in expression');
        }
        
        // Evaluate the expression using Function constructor (safer than eval)
        const result = Function('"use strict"; return (' + expression + ')')();
        
        // Check if result is a valid number
        if (typeof result !== 'number' || !isFinite(result)) {
            throw new Error('Invalid result');
        }
        
        // Display result
        resultDiv.textContent = `= ${result}`;
        resultDiv.classList.add('success');
    } catch (error) {
        // Display error message
        resultDiv.textContent = `Error: Invalid expression`;
        resultDiv.classList.add('error');
    }
}

// Event listeners
calculateBtn.addEventListener('click', calculate);

// Allow Enter key to calculate
expressionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calculate();
    }
});

// Focus on input when page loads
window.addEventListener('load', () => {
    expressionInput.focus();
});
