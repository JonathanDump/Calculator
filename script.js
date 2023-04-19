let firstNumber = "";
let operator = "";
let secondNumber = "";

let screenResult = document.querySelector(".screen-result-text");
let screenInput = document.querySelector(".screen-input-text");

const buttons = document.querySelectorAll("button")


function operate(firstNumber, operator, secondNumber){
    if (operator == "+"){
        return firstNumber + secondNumber;
    } else if (operator == "-"){
        return firstNumber - secondNumber
    } else if (operator == "*") {
        return firstNumber * secondNumber
    } else if (operator == "/") {
        return firstNumber / secondNumber;
    }
}

// console.log(operate(firstNumber, operator, secondNumber));

buttons.forEach(button => button.addEventListener("click", () => {
    if (button.getAttribute(".operator")){
        operator = button.textContent;
        if (firstNumber != ""){
            screenResult.textContent = `${firstNumber} ${operator}`;
        }
    } else {
        if (firstNumber == ""){
            firstNumber += button.textContent;
            // screenInput = "";
            screenInput.textContent += button.textContent;
        } else if (operator == ""){
            firstNumber += button.textContent;
            screenInput.textContent += button.textContent;
        }else {
            secondNumber += button.textContent;
                // screenInput = "";
            screenInput.textContent += button.textContent;
            
        }
    }
    
}));