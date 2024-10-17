const buttons = document.querySelector(".calculator-keys")
const monitor = document.querySelector(".calculator-input")
const operatorShowInput = document.querySelector(".operatorShowInput")

let displayValue = "0";
let firstValue = null;
let waiting = false;
let secondValue = null;

updateDisplay();

function updateDisplay(){
    monitor.value = displayValue
}

buttons.addEventListener("click", (e)=>{
    const element = e.target;
    
    if(!element.matches("button")) return;
    
    if(element.classList.contains("operator")){
         handleOperation(element.value);
         updateDisplay();
    return;}
    
    if(element.classList.contains("decimal")){ 
        inputDecimal();
        updateDisplay();
    return;}

    if(element.classList.contains("clear")){
        clear(); 
        updateDisplay();
    return;}

    console.log("number", element.value);
    inputNumber(element.value);
    updateDisplay();
})

function handleOperation(mainOperator){
    const value = parseFloat(displayValue);

    if (firstValue === null) {
        firstValue = value;
    } else{
        const result = calculate(firstValue, operatorShowInput.value, value);
        displayValue = String(result);
        firstValue = result;
    }

    waiting = true;
    operatorShowInput.value = mainOperator;
    return;
}
function calculate(first, operator, second){
    if(operator === "+"){
        return first + second
    }else if(operator === "-"){
        return first - second
    }else if(operator === "*"){
        return first * second
    }else if(operator === "/"){
        return first / second
    }
    operatorShowInput.value = null
    return second;
    

}

function inputNumber(number){
    if(waiting){
        displayValue = number;
        waiting = false
    }else{
        displayValue = displayValue === "0" ? number : displayValue + number;
    }
    
}

function inputDecimal(displayValue){
    if(!displayValue.includes(".")){
        displayValue += "."
    }
}

function clear(){
    displayValue = "0"
    firstValue = null
    secondValue = null
    waiting = false
    operatorShowInput.value = null
}