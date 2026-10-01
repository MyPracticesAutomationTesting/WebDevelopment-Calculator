

const numberKeys = document.querySelectorAll(".number");
const inputText = document.getElementById("input-text");
const operatorKey = document.querySelectorAll(".operator");
const displayEntered = document.querySelector(".display-as-entered");
const equalsKey = document.querySelector(".equals");
const clearEntry = document.querySelector(".clear-entry");
const clearAll = document.querySelector(".clear-all");
const backspaceKey = document.querySelector(".back-space");
const flipNumberSign = document.querySelector(".sign");
const percentOf = document.querySelector(".percent");
const oneOverNumber = document.querySelector(".one-over-input");
const squareOf = document.querySelector(".squared");
const squareRoot = document.querySelector(".square-root");


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
        
       
        if (isOperatorKeyClicked) {
            rawInput = "";
            isOperatorKeyClicked = false;

        }
        
        if (button.textContent === ".") {
            if (rawInput.includes(".")) {
                return;
            }

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




function formatRawInput() {
    
    const [wholeNumber, decimal] = rawInput.split('.');
    
    if (wholeNumber.length <= 16) { //limit to only 16 digits like the Windows calculator
        if (rawInput.includes(".")) {
            if (decimal.length <= 16) { //limit to only 16 digits like the Windows calculator
                const formattedWholeNumber = formatter.format(parseFloat(wholeNumber) || 0);
                inputText.value = `${formattedWholeNumber}.${decimal}`;
            }
            
        }
        else {
            inputText.value = formatter.format(parseFloat(rawInput));
        }

    }
    
}


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
                inputText.value = formatMassiveNumberResult(result);
                
            }
            
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
            inputText.value = formatMassiveNumberResult(result);
           
        }

        displayEntered.textContent = `${firstNumber} ${currentOperator} ${secondNumber} =`;
        resetEverything(); 
        isOperatorKeyClicked = true;

     }

});


function mathOperations(operator, firstNumber, secondNumber) {
    
    switch(operator) {
        case "÷" :
            result = firstNumber / secondNumber;
            break;
        case "×" :
            result = firstNumber * secondNumber;
            break;
        case "−" :
            result = firstNumber - secondNumber;
            break;
        case "+" :
            result = firstNumber + secondNumber;
            break;

    }

    return result;

}


function formatMassiveNumberResult(result) {
    if (Math.abs(result) >= 1e15) { //to take care of massive results just like in Windows calculator
        return result.toExponential(15);
    }
    else {
        return formatter.format(result);
    }
    
}


flipNumberSign.addEventListener('click', () => {
    let currentValue = inputText.value.replaceAll(',','');
    currentValue = currentValue * -1;
    inputText.value = formatMassiveNumberResult(currentValue);
    
});


//this is actually a bit different vs the % behavior of Windows calculator, NOT sure IF Windows calculator is intended to work the way it works now, OR maybe they have a bug?
//e.g. in Windows calculator, try clicking a number and clicking %
percentOf.addEventListener('click', () => {
    let currentValue = inputText.value.replaceAll(',','');
    currentValue = currentValue / 100;
    inputText.value = formatMassiveNumberResult(currentValue);
    

});


oneOverNumber.addEventListener('click', () => {
    let currentValue = inputText.value.replaceAll(',','');
    displayEntered.textContent = `1/(${currentValue})`;
    currentValue = 1 / currentValue;
    inputText.value = formatMassiveNumberResult(currentValue);
    

});


squareOf.addEventListener('click', () => {
    let currentValue = inputText.value.replaceAll(',','');
    displayEntered.textContent = `sqr(${currentValue})`;
    currentValue = currentValue ** 2;
    inputText.value = formatMassiveNumberResult(currentValue);


});


squareRoot.addEventListener('click', () => {
    let currentValue = inputText.value.replaceAll(',','');
    displayEntered.textContent = `√(${currentValue})`;
    currentValue = Math.sqrt(currentValue);
    inputText.value = formatMassiveNumberResult(currentValue);

});



clearEntry.addEventListener('click', () => {
    if (displayEntered.textContent.includes("=")) {    
        displayEntered.textContent = "";
        resetEverything();
        
    }
    //reset only these for the current entry
    inputText.value = "0";
    rawInput = "0";
    
    
});


clearAll.addEventListener('click', () => {
    inputText.value = "0";
    displayEntered.textContent = "";
    resetEverything();

});


backspaceKey.addEventListener('click', () => {
    if (inputText.value.length > 0) {
        rawInput = rawInput.slice(0, -1);
    } 

    if (rawInput === "") {
        rawInput = "0";
    }

    formatRawInput();


});


function resetEverything() {  
    rawInput = "0";
    firstNumber = null;
    secondNumber = 0;
    currentOperator = "";
    result = 0;
    

}




