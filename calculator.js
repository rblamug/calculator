const cal = {
    add: (a, b) => { return (a + b) },
    sub: (a, b) => { return (a - b) },
    mul: (a, b) => { return (a * b) },
    div: (a, b) => { return (a / b) }
};

let firstNumber = 0;
let secondNumber = 0;
let op = "";

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            cal.add(num1, num2);
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

// function getFirstNumber() {
//     numberButtons.forEach(button => {
//         button.addEventListener("click", (e) => {
//             if (buttonsClicked < 10) {
//                 if (displayScreen.textContent == 0) {
//                     displayScreen.textContent = e.target.textContent;
//                     buttonsClicked++;
//                 } else {
//                     displayScreen.TextContent += e.target.textContent;
//                     buttonsClicked++;
//                 }
//             }
//         })
//     })
// }

// getFirstNumber();

numberButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (buttonsClicked < 10) {
            if (displayScreen.textContent == 0) {
                displayScreen.textContent = e.target.textContent;
                buttonsClicked++;
            } else {
                displayScreen.textContent += e.target.textContent;
                buttonsClicked++;
            }
        }
    })
})