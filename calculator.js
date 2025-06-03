const cal = {
    add: (a, b) => { return (a + b); },
    sub: (a, b) => { return (a - b); },
    mul: (a, b) => { return (a * b); },
    div: (a, b) => { return (a / b); }
};

let firstNumber = 0;
let secondNumber = 0;
let op = "";

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return cal.add(num1, num2);
        case "-":
            return cal.sub(num1, num2);
        case "x":
            return cal.mul(num1, num2);
        case " / ":
            return cal.div(num1, num2);
        default:
    }
}

// Event Listeners for each calculator button
const numberButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.operator');
const displayScreen = document.querySelector('#display');
const equalButton = document.querySelector('.equal');
let buttonsClicked = 0;
let hasFirstNumber = false;
let hasSecondNumber = false;

function getNum(e) {
    if (buttonsClicked < 10 && hasFirstNumber == false) {
        if (displayScreen.textContent == 0) {
            displayScreen.textContent = e.target.textContent;
        } else {
            displayScreen.textContent += e.target.textContent;
        }
        buttonsClicked++;
    } else if (buttonsClicked < 10 && hasFirstNumber == true) {
        if(displayScreen.textContent == firstNumber) {
            displayScreen.textContent = e.target.textContent;
        } else {
            displayScreen.textContent += e.target.textContent;
        }
        buttonsClicked++;
    }
}

function getNumber() {
    numberButtons.forEach(button => {
        button.addEventListener('click', getNum);
    });
}

// Start getNumber function if calculator shows 0
if(displayScreen.textContent == 0) {
    getNumber();
}

// Event Listeners for operator buttons 
operatorButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (hasFirstNumber == false) {
            firstNumber = Number(displayScreen.textContent);
            op = e.target.textContent;
            hasFirstNumber = true;
            buttonsClicked = 0;
        } else if (hasFirstNumber == true && buttonsClicked > 0) {
            secondNumber = Number(displayScreen.textContent);
            firstNumber = operate(firstNumber, secondNumber, op);
            op = e.target.textContent;
            displayScreen.textContent = firstNumber;
            buttonsClicked = 0;
        } else {
            return;
        }
    })
});

// Making the equal button to perform operation
equalButton.addEventListener('click', () => {
    if (hasFirstNumber == true) {
        secondNumber = Number(displayScreen.textContent);
        displayScreen.textContent = operate(firstNumber, secondNumber, op);
        hasFirstNumber = false;
    } else if (hasFirstNumber == false && op !== "") {
        secondNumber = Number(displayScreen.textContent);
        displayScreen.textContent = operate(firstNumber, secondNumber, op);
    } else {
        return;
    }
});