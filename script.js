let firstNumber = "";
let operator = "";
let secondNumber = "";
let equalResult = "";

let equalIsPressed = false;

let screenResult = document.querySelector(".screen-result-text");
let screenInput = document.querySelector(".screen-input-text");

const equal = document.querySelector("#equal");
const clear = document.querySelector("#clear");
const backspace = document.querySelector("#backspace");
const positiveNegative = document.querySelector("#positive-negative");
const decimal = document.querySelector("#decimal");

const buttons = document.querySelectorAll("button");


buttons.forEach(button => button.addEventListener("mousedown", () => {
    button.classList.add("button-clicked");
    button.addEventListener("mouseup", () => {
        button.classList.remove("button-clicked")
    });
}));


buttons.forEach(button => button.addEventListener("click", () => {
    if (button === decimal) {
        if (screenInput.textContent.match(".") === ".") {
            return;
        } else {
            if (operator !== "") {
                if (secondNumber === "") {
                    secondNumber += "0."
                    screenInput.textContent += "0."
                } else {
                    secondNumber += "."
                    screenInput.textContent += "."
                }
            } else {
                if (screenInput.textContent === "") {
                    firstNumber += "0."
                    screenInput.textContent += "0."
                } else {
                    firstNumber += "."
                    screenInput.textContent += "."
                }
            }
        }

    } if (button === positiveNegative) {
        let num = screenInput.textContent * (-1);
        screenInput.textContent = num;
        if (operator !== "") {
            secondNumber = num.toString();
        } else {
            firstNumber = num.toString();
        }
    } if (button === backspace) {
        let initialInputText = screenInput.textContent;
        let textLength = initialInputText.length - 1;
        let newText = initialInputText.substring(0, textLength);
        screenInput.textContent = newText;
    } if (button === clear) {
        firstNumber = "";
        operator = "";
        secondNumber = "";
        screenInput.textContent = "";
        screenResult.textContent = "";
        equalIsPressed = false;
        equalResult = "";
    } if (button === equal) {
        if (firstNumber == "" && operator == "" && secondNumber == "") {
            return;
        } else {
            equalIsPressed = true;
            let result = roundResult(operate(+firstNumber, operator, +secondNumber));
            screenResult.textContent = result;
            firstNumber = result.toString();
            equalResult = result.toString();
            // operator = "";
            secondNumber = "";
            screenInput.textContent = "";
        }
    } else if (firstNumber !== "" && operator !== "" && secondNumber !== "" && button.className == "operator math") {
        let result = roundResult(operate(+firstNumber, operator, +secondNumber));
        operator = button.textContent;
        screenResult.textContent = `${result} ${operator}`;
        firstNumber = result.toString();
        equalResult = result.toString();
        screenInput.textContent = "";
        secondNumber = "";
    } else if (button.className == "operator math" && button != equal) {
        operator = button.textContent;
        screenInput.textContent = "";
        if (firstNumber != "") {
            screenResult.textContent = `${firstNumber} ${operator}`;
            equalIsPressed = false;
        }


    } else if (button.className == "number") { //BUTTON IS A NUMBER
        if (screenInput.textContent.length === 17) {
            return;
        } else if (operator !== "" && equalResult !== "" && equalIsPressed === true) {
            firstNumber = button.textContent;
            screenInput.textContent += button.textContent;
            equalIsPressed = false;
            equalResult = "";
            operator = "";
        } else if (operator !== "" && equalResult !== "") {
            firstNumber = equalResult;
            secondNumber = button.textContent;
            screenInput.textContent += button.textContent;
            equalResult = "";
            equalIsPressed = false;
        } else if (equalIsPressed === true && operator != "") {
            equalIsPressed = false;
            firstNumber = button.textContent;
            screenInput.textContent = button.textContent;
        } else if (firstNumber == "") {
            firstNumber += button.textContent;
            screenInput.textContent = "";
            screenInput.textContent += button.textContent;
        } else if (operator == "") {
            firstNumber += button.textContent;
            screenInput.textContent += button.textContent;
        } else {
            secondNumber += button.textContent;
            screenInput.textContent += button.textContent;
        }

    }

}));

function operate(firstNumber, operator, secondNumber) {
    if (operator == "+") {
        return firstNumber + secondNumber;
    } else if (operator == "-") {
        return firstNumber - secondNumber
    } else if (operator == "×") {
        return firstNumber * secondNumber
    } else if (operator == "÷") {
        return firstNumber / secondNumber;
    }
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
  }