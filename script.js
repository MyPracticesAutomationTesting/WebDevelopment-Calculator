

const numberKeys = document.querySelectorAll(".number");
const inputText = document.getElementById("input-text");
const operatorKey = document.querySelectorAll(".operator");
const displayEntered = document.querySelector(".display-as-entered");
const equalsKey = document.querySelector(".equals");
const clearEntry = document.querySelector(".clear-entry");
const clearAll = document.querySelector(".clear-all");
const backspaceKey = document.querySelector(".back-space");


inputText.value = "0";
let rawInput = "0";
let isOperatorKeyClicked = false;
let firstNumber = null;
let secondNumber = 0;
let currentOperator = "";
let result = 0;
const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 16
});


numberKeys.forEach((button) => {
    button.addEventListener('click', () => {
    
        if (firstNumber === null) {
            displayEntered.textContent = "";
        }
        
        /*if (isOperatorKeyClicked) {
            inputText.value = "";
            isOperatorKeyClicked = false;

        }
        
        if (button.textContent === ".") {
            if (inputText.value.includes(".")) {
                return;
            }

            if (inputText.value === "" || inputText.value === "0") {
                inputText.value = "0."
            }
            
        }
        else {
            if (inputText.value === "0") {
                inputText.value = "";
            }
            
        }

        inputText.value += button.textContent;*/


        /*if (inputText.value.length <= 16) {
            let rawNumber = inputText.value.replaceAll(',','');
            if (rawNumber.endsWith(".")) {
                inputText.value = rawNumber;
            }
            else {
                rawNumber += button.textContent;
                inputText.value = formatter.format(parseFloat(rawNumber));
            } 
            
        }*/

        if (isOperatorKeyClicked) {
            rawInput = "";
            isOperatorKeyClicked = false;

        }
        
        if (button.textContent === ".") {
            if (rawInput.includes(".")) {
                return;
            }

            /*if (rawInput === "" || rawInput === "0") {
                rawInput = "0."
            }*/
            
        }
        else {
            if (rawInput === "0") {
                rawInput = "";
            }
            
        }

        rawInput += button.textContent;

        formatRawInput();

 
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
                inputText.value = formatter.format(result);
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
        secondNumber = Number(inputText.value.replaceAll(',',''));
        if (currentOperator === "÷" && secondNumber === 0) {
            inputText.value = "Heh, cannot divide by zero"
        }
        else {
            result = mathOperations(currentOperator, Number(firstNumber), secondNumber);
            //inputText.value = Number(result).toLocaleString('en-US');
            inputText.value = formatter.format(result);
           
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
    rawInput = "0";
    
    
});


clearAll.addEventListener('click', () => {
    inputText.value = "0";
    displayEntered.textContent = "";
    resetEverything();

});


backspaceKey.addEventListener('click', () => {
    /*if (inputText.value.length > 0) {
        inputText.value = inputText.value.slice(0,-1);
    }
    
    if (inputText.value === "") {
        inputText.value = "0";
    }*/

    if (inputText.value.length > 0) {
        rawInput = rawInput.slice(0, -1);
    } 

    if (rawInput === "") {
        rawInput = "0";
    }

    formatRawInput();


});


function formatRawInput() {
    if (rawInput.includes(".")) {
        //inputText.value = rawInput;
        
        const [wholeNumber, decimal] = rawInput.split('.');
        const formattedWholeNumber = formatter.format(parseFloat(wholeNumber) || 0);
        inputText.value = `${formattedWholeNumber}.${decimal}`;
        
    }
    else {
        inputText.value = formatter.format(parseFloat(rawInput));
    }

}



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


/*function inputTextResult(currentOperator, secondNumber, result) {
    
    if (currentOperator === "÷" && secondNumber === 0) {
        return "Cannot divide by zero";
    }
    else {
        return result;

    }


}*/



function resetEverything() {  
    rawInput = "0";
    firstNumber = null;
    secondNumber = 0;
    currentOperator = "";
    result = 0;
    

}