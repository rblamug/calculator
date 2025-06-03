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
            //displayScreen.textContent = cal.add(num1, num2);
            return cal.add(num1, num2, operator);
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

function getFirstNumber() {
    hasFirstNumber = false;
    numberButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            if (buttonsClicked < 10 && hasFirstNumber == false) {
                if (displayScreen.textContent == 0) {
                    displayScreen.textContent = e.target.textContent;
                } else {
                    displayScreen.textContent += e.target.textContent;
                }
                buttonsClicked++;
                firstNumber = Number(displayScreen.textContent);
                console.log(firstNumber);
            }
        })
    })
}

function getSecondNumber() {
    hasSecondNumber = false;
    numberButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            if (buttonsClicked < 10 && hasSecondNumber == false) {
                if (displayScreen.textContent == firstNumber) {
                    console.log(displayScreen.textContent == firstNumber); // <--- stop the function when a second oeprator is clicked
                    displayScreen.textContent = e.target.textContent;
                } else {
                    displayScreen.textContent += e.target.textContent;
                }
                buttonsClicked++;
            }
        })
    })
}

if(displayScreen.textContent == 0) {
    getFirstNumber();
}

operatorButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (hasFirstNumber == false) {
            op = e.target.textContent;
            console.log(op);
            hasFirstNumber = true;
            buttonsClicked = 0;
            getSecondNumber();
        } else if (hasFirstNumber == true && buttonsClicked > 0) {
            secondNumber = Number(displayScreen.textContent);
            console.log(secondNumber);
            firstNumber = operate(firstNumber, secondNumber, op);
            op = e.target.textContent;
            displayScreen.textContent = firstNumber;
            buttonsClicked = 0;
        }
    })
});

// Making the equal button to perform operation
equalButton.addEventListener('click', () => {
    if (hasFirstNumber == true) {
        secondNumber = Number(displayScreen.textContent);
        console.log(secondNumber);
        displayScreen.textContent = operate(firstNumber, secondNumber, op);
    }
});