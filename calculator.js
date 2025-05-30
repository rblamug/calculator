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