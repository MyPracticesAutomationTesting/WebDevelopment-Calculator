

const numberKeys = document.querySelectorAll(".number");
const inputText = document.getElementById("input-text");
const operatorKey = document.querySelectorAll(".operator");
const displayEntered = document.querySelector(".display-as-entered");
const equalsKey = document.querySelector(".equals");
const clearEntry = document.querySelector(".clear-entry");
const clearAll = document.querySelector(".clear-all");
const backspaceKey = document.querySelector(".back-space");


inputText.value = "0";
let isOperatorKeyClicked = false;
let firstNumber = null;
let secondNumber = 0;
let currentOperator = "";
let result = 0;



numberKeys.forEach((button) => {
    button.addEventListener('click', () => {
    
        if (firstNumber === null) {
            displayEntered.textContent = "";
        }
        
        if (isOperatorKeyClicked) {
            inputText.value = "";
            isOperatorKeyClicked = false;

        }
        
        if (inputText.value === "0") {
            inputText.value = "";
        }
         
        if (inputText.value.length <= 16) {
            let rawNumber = inputText.value.replaceAll(',','');   
            rawNumber += button.textContent;
            inputText.value = Number(rawNumber).toLocaleString('en-US');
        }

 
    });
     
});


operatorKey.forEach((button) => {

    button.addEventListener('click', () => {
        
        const currentInput = Number(inputText.value.replaceAll(',',''));
        
        if (firstNumber === null) {
            firstNumber = currentInput;
            
        }
        else if (!isOperatorKeyClicked) {
            secondNumber = currentInput;
            
            if (currentOperator === "÷" && secondNumber === 0) {
                inputText.value = "Heh, cannot divide by zero"
            }
            else {
                result = mathOperations(currentOperator, firstNumber, secondNumber);
                firstNumber = result;
                inputText.value = result;
            }
            
            /*inputText.value = inputTextResult(currentOperator, secondNumber, result);*/

        }
        
        currentOperator = button.textContent;
        displayEntered.textContent = `${firstNumber} ${currentOperator}`;
        isOperatorKeyClicked = true;


    });

});


equalsKey.addEventListener('click', () => {
     
    if (firstNumber !== null && currentOperator !== "") {
        //firstNumber and currentOperator are already saved in memory
        secondNumber = Number(inputText.value);
        if (currentOperator === "÷" && secondNumber === 0) {
            inputText.value = "Heh, cannot divide by zero"
        }
        else {
            result = mathOperations(currentOperator, Number(firstNumber), secondNumber);
            inputText.value = Number(result).toLocaleString('en-US');
           
        }

        /*inputText.value = Number(inputTextResult(currentOperator, secondNumber, result)).toLocaleString('en-US');*/
        
        displayEntered.textContent = `${firstNumber} ${currentOperator} ${secondNumber} =`;
        resetEverything(); 
        isOperatorKeyClicked = true;

     }

});


clearEntry.addEventListener('click', () => {
    if (displayEntered.textContent.includes("=")) {    
        displayEntered.textContent = "";
        resetEverything();

    }

    inputText.value = "0";

});


clearAll.addEventListener('click', () => {
    inputText.value = "0";
    displayEntered.textContent = "";
    resetEverything();

});


backspaceKey.addEventListener('click', () => {
    if (inputText.value.length > 0) {
        inputText.value = inputText.value.slice(0,-1);
    }
    
    if (inputText.value === "") {
        inputText.value = "0";
    }

});



function mathOperations(operator, firstNumber, secondNumber) {
    
    switch(operator) {
        case "÷" :
            result = firstNumber / secondNumber;
            break;
        case "x" :
            result = firstNumber * secondNumber;
            break;
        case "-" :
            result = firstNumber - secondNumber;
            break;
        case "+" :
            result = firstNumber + secondNumber;
            break;

    }

    return result;

}


function inputTextResult(currentOperator, secondNumber, result) {
    
    if (currentOperator === "÷" && secondNumber === 0) {
        return "Cannot divide by zero";
    }
    else {
        return result;

    }


}



function resetEverything() {
    firstNumber = null;
    secondNumber = 0;
    currentOperator = "";
    result = 0;

}