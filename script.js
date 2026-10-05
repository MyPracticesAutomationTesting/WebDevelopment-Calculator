

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
    maximumFractionDigits: 12  //12 is a temporary solution, it doesn't solve all the edge cases relating to how many digits of decimal points to display
});
let isFinalResult = false;
let isConverted = false;



numberKeys.forEach((button) => {
    button.addEventListener('click', (event) => {
        
        numberInputs(event.target.textContent);
 
    });
     
});



function numberInputs(numberText) {
    isFinalResult = false;
    isConverted = false;
    enableKeys();

    if (firstNumber === null) {
        displayEntered.textContent = "";
    }
       
    if (isOperatorKeyClicked) {
        rawInput = "";
        isOperatorKeyClicked = false;

    }
        
    if (numberText === ".") {
        if (rawInput.includes(".")) {
            return;
        }

    }
    else {
        if (rawInput === "0") {
            rawInput = "";
        }
            
    }

    if (rawInput.replace(".",'').length < 16) { //limit to only 16 digits excluding decimal point, like the Windows calculator
        rawInput += numberText;
    }
    else {
        return;
    }

    formatRawInput(rawInput);
    

}



function formatRawInput(rawInput) {
    
    const [wholeNumber, decimal] = rawInput.split('.');
    
     if (rawInput.includes(".")) {
        const formattedWholeNumber = formatter.format(wholeNumber); 
        inputText.value = `${formattedWholeNumber}.${decimal}`;
            
          
    }
    else {
        inputText.value = formatter.format(rawInput); 
    }
 
    adjustFontSize(inputText.value.length);
    
}



operatorKey.forEach((button) => {

    button.addEventListener('click', (event) => {
        operatorInputs(event.target.textContent);

    });

});


function operatorInputs(operator) {
    isFinalResult = false;
    const currentInput = Number(inputText.value.replaceAll(',',''));
        
    if (firstNumber === null) {
        firstNumber = currentInput;
            
    }
    else if (!isOperatorKeyClicked) {
        secondNumber = currentInput;
            
        if (currentOperator === "÷" && secondNumber === 0) {
            cannotDivideByZero();
        }
        else {
            result = mathOperations(currentOperator, firstNumber, secondNumber);
            firstNumber = result;
            inputText.value = formatMassiveNumberResult(result);
            
                
        }
            
    }
        
    adjustFontSize(inputText.value.length);
    currentOperator = operator;
    displayEntered.textContent = `${firstNumber} ${currentOperator}`;
    isOperatorKeyClicked = true;
    

}



equalsKey.addEventListener('click', () => {
    equalsOperator();
    

});


function equalsOperator() {
    if (firstNumber !== null && currentOperator !== "") {
        //firstNumber and currentOperator are already saved in memory
        secondNumber = Number(inputText.value.replaceAll(',',''));
        if (currentOperator === "÷" && secondNumber === 0) {
            cannotDivideByZero();
        }
        else {
            result = mathOperations(currentOperator, firstNumber, secondNumber);
            inputText.value = formatMassiveNumberResult(result);
            
            
        }

        adjustFontSize(inputText.value.length);
        displayEntered.textContent = `${firstNumber} ${currentOperator} ${secondNumber} =`;
        resetEverything(); 
        isOperatorKeyClicked = true;
        isFinalResult = true;
        

     }
     

}



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


function adjustFontSize(length) {
    
    if (length >= 16) {
        inputText.style.fontSize = "28px";
        
    }
    else {
        inputText.style.fontSize = "38px";
        
    }
               
    
}

//disable keys just like in Windows calculator
function cannotDivideByZero() {
    inputText.value = "Heh, cannot divide by zero";
    operatorKey.forEach(key => {
        key.disabled = true;
    });
    
    flipNumberSign.disabled = true;
    percentOf.disabled = true;
    oneOverNumber.disabled = true;
    squareOf.disabled = true;
    squareRoot.disabled = true;
    document.querySelector(".decimal").disabled = true;


}


function enableKeys() {
    operatorKey.forEach(key => {
        key.disabled = false;
    });
    
    flipNumberSign.disabled = false;
    percentOf.disabled = false;
    oneOverNumber.disabled = false;
    squareOf.disabled = false;
    squareRoot.disabled = false;
    document.querySelector(".decimal").disabled = false;
}


flipNumberSign.addEventListener('click', () => {
    if (inputText.value === "0") {
        return;
    }
    else {
        let currentValue = inputText.value.replaceAll(',','');
        currentValue = currentValue * -1;
        rawInput = String(currentValue);
        inputText.value = formatMassiveNumberResult(currentValue);
    }
    
    
});



//this is actually a bit different vs the % behavior of Windows calculator, NOT sure IF Windows calculator is intended to work the way it works now, OR maybe they have a bug?
//e.g. in Windows calculator, click a number and next click %, it results in 0
percentOf.addEventListener('click', () => {
    percentToDecimal();
    
});


function percentToDecimal() {
    let currentValue = inputText.value.replaceAll(',','');
    currentValue = currentValue / 100;
    inputText.value = formatMassiveNumberResult(currentValue);
    isConverted = true;


}



oneOverNumber.addEventListener('click', () => {
    let currentValue = inputText.value.replaceAll(',','');
    displayEntered.textContent = `1/(${currentValue})`;
    currentValue = 1 / currentValue;
    inputText.value = formatMassiveNumberResult(currentValue);
    isConverted = true;

});


squareOf.addEventListener('click', () => {
    let currentValue = inputText.value.replaceAll(',','');
    displayEntered.textContent = `sqr(${currentValue})`;
    currentValue = currentValue ** 2;
    inputText.value = formatMassiveNumberResult(currentValue);
    isConverted = true;


});


squareRoot.addEventListener('click', () => {
    let currentValue = inputText.value.replaceAll(',','');
    displayEntered.textContent = `√(${currentValue})`;
    currentValue = Math.sqrt(currentValue);
    inputText.value = formatMassiveNumberResult(currentValue);
    isConverted = true;

});



clearEntry.addEventListener('click', () => {
    enableKeys();
    if (isFinalResult) {    
        displayEntered.textContent = "";
        resetEverything();
        
    }
    //reset only these for the current entry
    inputText.value = "0";
    rawInput = "0";
    
    
});


clearAll.addEventListener('click', () => {
    enableKeys();
    inputText.style.fontSize = "38px"; //temporary plug-in
    clearCalculator();

});


function clearCalculator() {
    inputText.value = "0";
    displayEntered.textContent = "";
    resetEverything();

}


backspaceKey.addEventListener('click', () => {  
    backspace();

});


function backspace() {
    
    if (isFinalResult) {
        displayEntered.textContent = "";
        return; //do NOT backspace for final result of operations, just like how it works in Windows calculator

     }
     else if (isConverted) {
        return; //do NOT backspace for results of %, squared, and square root of, just like how it works in Windows calculator
     }
     
     else { 
        if (inputText.value.length > 0) {     
            rawInput = rawInput.slice(0, -1);  
            
        } 

        if (rawInput === "" || rawInput === "-") {
            rawInput = "0";
            
        }
    
        formatRawInput(rawInput);
        

     }

     
}


function resetEverything() {  
    rawInput = "0";
    firstNumber = null;
    secondNumber = 0;
    currentOperator = "";
    result = 0;
    
    

}

//keyboard support
window.addEventListener('keydown', (event) => {
    
    const key = event.key;

    if (key >= "0" && key <= "9" || key === ".") {
        numberInputs(key);

    }

    else if (key === "/") operatorInputs("÷");
    else if (key === "*") operatorInputs("×");
    else if (key === "-") operatorInputs("−");
    else if (key === "+") operatorInputs("+");
    else if (key === "%") percentToDecimal();

    else if (key === "Enter" || key === "=") {
        event.preventDefault();
        equalsOperator();
    }

    else if (key === "Backspace") {
        backspace();
    }

    else if (key === "Escape") {
        clearCalculator();
    }


});

