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
        case "/":
            return cal.div(num1, num2);
        default:
    }
}

// Event Listeners for each calculator button
const numberButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.operator');
const displayScreen = document.querySelector('#display');
const equalButton = document.querySelector('.equal');
const topButtons = document.querySelectorAll('.topRow');

let buttonsClicked = 0;
let hasFirstNumber = false;
let hasSecondNumber = false;
let answer = 0;

function topRowFunction(e) {
    let tempNumber = Number(displayScreen.textContent);
    switch (e.target.textContent) {
        case "AC": 
            hasFirstNumber, hasSecondNumber = false;
            displayScreen.textContent = 0;
            buttonsClicked = 0;
            getNumber();
            break;
        case "+/-":
            displayScreen.textContent = -(tempNumber); // need to test this out
            break;
        case "%":
            displayScreen.textContent = tempNumber / 100; // this one also
            break;
        case "back":
            displayScreen.textContent = displayScreen.textContent.slice(0, -1);
            buttonsClicked--;
    }
};

topButtons.forEach(button => {
    button.addEventListener("click", topRowFunction);
})

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

function checkDecimalAndDisplay(number) {
    let numberLength = String(number).length;
    console.log(numberLength);
    if (!(Number.isInteger(number))) {
        console.log(!(Number.isInteger(number)));
        console.log(numberLength > 10);
        if (numberLength > 10) {
            displayScreen.textContent = number.toFixed(2);
            console.log(number.toFixed(10));
        } else {
            displayScreen.textContent = number;
        }
    } else {
        if (numberLength > 10) {
            displayScreen.textContent = "Error";
        } else {
            displayScreen.textContent = number;
        }
    }
}

// Making the equal button to perform operation
equalButton.addEventListener('click', () => {
    if (hasFirstNumber == true) {
        secondNumber = Number(displayScreen.textContent);
        answer = operate(firstNumber, secondNumber, op);
        checkDecimalAndDisplay(answer);
        hasFirstNumber = false;
        buttonsClicked = 0;
    } else if (hasFirstNumber == false && op !== "") {
        secondNumber = Number(displayScreen.textContent);
        answer = operate(firstNumber, secondNumber, op);
        checkDecimalAndDisplay(answer);
        buttonsClicked = 0;
    } else {
        return;
    }
});

// next step: make a function that checks if number is over 10 characters and fix it if so. then call in the equal button function