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
            console.log(cal.add(num1, num2))
            console.log(firstNumber);
            console.log(secondNumber);
            console.log(op);
            break;
        case "-":
            cal.sub(num1, num2);
            break;
        case "x":
            cal.mul(num1, num2);
            break;
        case " / ":
            cal.div(num1, num2);
            break;
        default:
    }
}

// Event Listeners for each calculator button
const numberButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.operator');
const displayScreen = document.querySelector('#display');
let buttonsClicked = 0;
let hasFirstNumber = false;
let hasSecondNumber = false;

function getFirstNumber() {
    numberButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            if (buttonsClicked < 10 && hasFirstNumber == false) {
                if (displayScreen.textContent == 0) {
                    displayScreen.textContent = e.target.textContent;
                } else {
                    displayScreen.textContent += e.target.textContent;
                }
                buttonsClicked++;
            }
        })
    })
}

function getSecondNumber() {
    numberButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            if (buttonsClicked < 10 && secondNumber == false) {
                if (displayScreen.textContent == firstNumber) {
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
            firstNumber = displayScreen.textContent;
            op = e.target.textContent;
            hasFirstNumber = true;
            buttonsClicked = 0;
            getSecondNumber();
        } else if (hasFirstNumber == true && hasSecondNumber == false) {
            hasSecondNumber = true;
            secondNumber = displayScreen.textContent;
            buttonsClicked = 0;
        } else if (hasFirstNumber == true && hasSecondNumber == true) {
            firstNumber = operate(firstNumber, secondNumber, op);
            op = e.target.textContent;
            hasSecondNumber = false;
            buttonsClicked = 0;
            getSecondNumber();
        }
    })
});
