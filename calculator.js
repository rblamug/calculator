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
            if (secondNumber === 0) {
                return "Lol no..";
            } else {
                return cal.div(num1, num2);
            }
        default:
    }
}

// Event Listeners for each calculator button
const numberButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.operator');
const displayScreen = document.querySelector('#display');
const equalButton = document.querySelector('.equal');
const topButtons = document.querySelectorAll('.topRow');
const decimalButton = document.querySelector('#decimal');

function handleEvent(e) {
    return e.type == 'click' ? e.target.textContent : e.key;
}

// Make sure the buttons clicked does not go over 10
let buttonsClicked = 0;
function clickDaButton() {
    if (buttonsClicked < 10) {
        buttonsClicked++;
    } else {
        return;
    }
}

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
            if (buttonsClicked > 0) {
                buttonsClicked--;
            }
            break;
        default:
    }
};

topButtons.forEach(button => {
    button.addEventListener("click", topRowFunction);
})

function getNum(e) {
    if (buttonsClicked < 10 && hasFirstNumber == false) {
        if (displayScreen.textContent == 0 || displayScreen.textContent == answer) {
            displayScreen.textContent = e.type == 'click' ? e.target.textContent : e.key;
        } else {
            displayScreen.textContent += e.type == 'click' ? e.target.textContent : e.key;
        }
    } else if (buttonsClicked < 10 && hasFirstNumber == true) {
        if(displayScreen.textContent == firstNumber) {
            displayScreen.textContent = e.type == 'click' ? e.target.textContent : e.key;
        } else {
            displayScreen.textContent += e.type == 'click' ? e.target.textContent : e.key;
        }
    }
    clickDaButton();
}

function checkForDecimal(e) {
    if (!(displayScreen.textContent.includes('.'))) {
        displayScreen.textContent += e.target.textContent;
        clickDaButton();
    } else {
        return;
    }
}

decimalButton.addEventListener('click', checkForDecimal);

function getNumber() {
    numberButtons.forEach(button => {
        button.addEventListener('click', getNum);
    });
}

// Start getNumber function if calculator shows 0
if(displayScreen.textContent == 0) {
    getNumber();
}

function handleOperator(e) {
    if (hasFirstNumber == false) {
        firstNumber = Number(displayScreen.textContent);
        op = handleEvent(e);
        console.log(op); // finish fixing operator handling function
        hasFirstNumber = true;
        buttonsClicked = 0;
    } else if (hasFirstNumber == true && buttonsClicked > 0) {
        secondNumber = Number(displayScreen.textContent);
        firstNumber = operate(firstNumber, secondNumber, op);
        op = handleEvent(e);
        displayScreen.textContent = firstNumber;
        buttonsClicked = 0;
    } else {
        return;
    }
}

// Event Listener for operator buttons --- need to seperate function by itself and input depending on click or keydown
operatorButtons.forEach(button => {
    button.addEventListener('click', handleOperator);
})

// Stop overflowing... hopefully
function checkDecimalAndDisplay(number) {
    let numberLength = String(number).length;
    console.log(numberLength);
    if (!(Number.isInteger(number))) {
        if (numberLength > 10) {
            displayScreen.textContent = number.toFixed(2);
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
function equalEventHandler() {
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
}

equalButton.addEventListener('click', equalEventHandler);

// Adding keyboard support 
function readKeyboard(e) {
    console.log(e.key);
    const availableNumberInputs = ["1","2","3","4","5","6","7","8","9","0"];
    const availableOperatorInputs = ["+","-","*","/"];
    if (availableNumberInputs.includes(e.key)) {
        getNum(e);
    } else if (availableOperatorInputs.includes(e.key)) {
        handleOperator(e);
    } else if (e.key == "Backspace") {
        displayScreen.textContent = displayScreen.textContent.slice(0, -1);
            if (buttonsClicked > 0) {
                buttonsClicked--;
            }
    } else if (e.key == "Enter") {
        equalEventHandler();
    }
}

document.addEventListener('keydown', readKeyboard);