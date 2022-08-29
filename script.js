let expression = "";

function parser(){
    //let expression = document.querySelector('#output').innerHTML;
    let lastExprSymbol = expression[expression.length - 1];
    if(lastExprSymbol == '+' || lastExprSymbol == '-' || lastExprSymbol == '*' || lastExprSymbol == '/'){
        expression = expression.slice(0, -1);
    }
    let operators = [];
    let operands = [];
    let lastIndex = 0;
    for(let i = 0; i < expression.length; i++){
        if(expression[i] == '+' || expression[i] == '-' || expression[i] == '*' || expression[i] == '/'){
            operands.push(Number(expression.slice(lastIndex, i)))
            operators.push(expression[i]);
            lastIndex = i + 1;
        }
    }
    operands.push(Number(expression.slice(lastIndex)));
    console.log(operands);
    console.log(operators);
    //1-й проход: ищу операторы / и * и выполняю их для своих операндов. Затем эти операнды удаляю, а на их место ставлю получившееся значение. Оператор тоже удаляю.
    for(let i = 0; i < operators.length;){
        if(operators[i] == '*'){
            let firstValue = operands.splice(i, 1);
            let secondValue = operands.splice(i, 1);
            operands.splice(i, 0, Number(firstValue) * Number(secondValue));
            operators.splice(i, 1);
        }
        else if(operators[i] == '/'){
            let firstValue = operands.splice(i, 1);
            let secondValue = operands.splice(i, 1);
            operands.splice(i, 0, Number(firstValue) / Number(secondValue));
            operators.splice(i, 1);
        }
        else{
            i++;
        }
    }
    //2-й проход: ищу операторы + и - и выполняю их для своих операндов. Затем эти операнды удаляю, а на их место ставлю получившееся значение. Оператор тоже удаляю.
    for(let i = 0; i < operators.length;){
        if(operators[i] == '+'){
            let firstValue = operands.splice(i, 1);
            let secondValue = operands.splice(i, 1);
            operands.splice(i, 0, Number(firstValue) + Number(secondValue));
            operators.splice(i, 1);
        }
        else if(operators[i] == '-'){
            let firstValue = operands.splice(i, 1);
            let secondValue = operands.splice(i, 1);
            operands.splice(i, 0, Number(firstValue) - Number(secondValue));
            operators.splice(i, 1);
        }
        else{
            i++;
        }
    }
    console.log(operands);
    console.log(operators);
    document.querySelector('#output').value = operands[0];
    expression = "";
}

String.prototype.replaceAt = function(index, replacement){ 
    let first = this.slice(0, index) + replacement;
    let second = this.slice(index + replacement.length);
    return this.slice(0, index) + replacement + this.slice(index + replacement.length);
}

function addSymbol(symbol){
    //let expression = document.querySelector('#output').innerHTML;
    if(symbol == 'C'){
        if(expression != ""){
            expression = expression.slice(0, -1);
        }
    }
    else if((symbol == '+' || symbol == '-' || symbol == '*' || symbol == '/' || symbol == '.') && expression.length == 0){
        return;
    }
    else if(symbol == '.'){
        let isPointExist = false;
        for(let i = expression.length - 1; i >= 0; i--){
            if(expression[i] == '+' || expression[i] == '-' || expression[i] == '*' || expression[i] == '/'){
                break;
            }
            else if(expression[i] == '.'){
                isPointExist = true;
            }
        }
        if(isPointExist){
            return;
        }
        else{
            if(expression[expression.length - 1] == '+' || expression[expression.length - 1] == '-' || expression[expression.length - 1] == '*' || expression[expression.length - 1] == '/'){
                return;
            }
            else{
                expression += symbol;
            }
        }
    }
    else if(expression == ''){
        expression += symbol;
    }
    else if(isCorrectSymbol(symbol, expression)){
        expression += symbol;
    }
    else{
        expression = expression.replaceAt(expression.length-1, symbol);
    }
    document.querySelector('#output').value = expression;
}

function isCorrectSymbol(symbol, expression){
    if(symbol == '+' || symbol == '-' || symbol == '*' || symbol == '/'){
        let exprSymbol = expression[expression.length - 1];
        if(exprSymbol == '+' || exprSymbol == '-' || exprSymbol == '/' || exprSymbol == '*'){
            return false;
        }
    }
    //проверка на первый ноль
    else if((expression.length == 1 && expression[0] == '0') || (expression.length > 1 && expression[expression.length - 1] == '0' && (expression[expression.length - 2] == '+' || expression[expression.length - 2] == '-' || expression[expression.length - 2] == '*' || expression[expression.length - 2] == '/'))){
        return false;
    }
    //Проверка на двойной 0.
    else if(symbol == '0' && expression[expression.length - 1] == '0'){
        if(expression.length >= 2){
            let penultimate = expression[expression.length - 2];
            if(penultimate != '+' && penultimate != '-' && penultimate != '*' && penultimate != '/'){
                return true;
            }
        }
        else{
            return false;
        }
    }
    return true;
}

let isLight = true; 

function changeTheme(){
    if(isLight){
        document.querySelector(".container").style.background = "black";
        document.body.style.background = "rgb(36, 36, 36)";
        document.querySelector("#output").style.background = "black";
        let buttons = document.querySelectorAll(".box");
        for(let button of buttons){
            button.style.color = "white";
            button.style.background = "black";
            button.addEventListener("mouseover", (event)=>{
                event.target.style.background = "rgb(75, 75, 75)";
            });
            button.addEventListener("mouseout", (event)=>{
                event.target.style.background = "black";
            });
        }
        document.querySelector(".box-5").style.background = "orange";
        document.querySelector(".box-9").style.background = "rgba(255, 166, 0, 0.808)";
        document.querySelector(".box-13").style.background = "rgba(255, 166, 0, 0.568)";
        document.querySelector(".box-16").style.background = "rgba(255, 166, 0, 0.322)";
        document.querySelector(".box-5").addEventListener("mouseout", (event)=>{
            event.target.style.background = "orange";
        });
        document.querySelector(".box-9").addEventListener("mouseout", (event)=>{
            event.target.style.background = "rgba(255, 166, 0, 0.808)";
        });
        document.querySelector(".box-13").addEventListener("mouseout", (event)=>{
            event.target.style.background = "rgba(255, 166, 0, 0.568)";
        });
        document.querySelector(".box-16").addEventListener("mouseout", (event)=>{
            event.target.style.background = "rgba(255, 166, 0, 0.322)";
        });
        document.querySelector(".box-1").addEventListener("mouseover", (event)=>{
            event.target.style.background = "black";
        })
        document.querySelector("#output").style.color = "white";

        document.querySelector(".switch-button").style.background = "rgb(172, 172, 172)"
        document.querySelector(".switch-button").style.color = "black";
    }
    else{
        document.querySelector(".container").style.background = "white";
        document.body.style.background = "white";
        document.querySelector("#output").style.background = "white";
        let buttons = document.querySelectorAll(".box");
        for(let button of buttons){
            button.style.color = "black";
            button.style.background = "white";
            button.addEventListener("mouseover", (event)=>{
                event.target.style.background = "rgb(194, 194, 194)";
            });
            button.addEventListener("mouseout", (event)=>{
                event.target.style.background = "white";
            });
        }
        document.querySelector(".box-1").addEventListener("mouseover", (event)=>{
            event.target.style.background = "white";
        });
        document.querySelector(".box-5").style.background = "orange";
        document.querySelector(".box-9").style.background = "rgba(255, 166, 0, 0.808)";
        document.querySelector(".box-13").style.background = "rgba(255, 166, 0, 0.568)";
        document.querySelector(".box-16").style.background = "rgba(255, 166, 0, 0.322)";
        document.querySelector(".box-5").addEventListener("mouseout", (event)=>{
            event.target.style.background = "orange";
        });
        document.querySelector(".box-9").addEventListener("mouseout", (event)=>{
            event.target.style.background = "rgba(255, 166, 0, 0.808)";
        });
        document.querySelector(".box-13").addEventListener("mouseout", (event)=>{
            event.target.style.background = "rgba(255, 166, 0, 0.568)";
        });
        document.querySelector(".box-16").addEventListener("mouseout", (event)=>{
            event.target.style.background = "rgba(255, 166, 0, 0.322)";
        });
        document.querySelector("#output").style.color = "black";
        document.querySelector(".switch-button").style.background = "black";
        document.querySelector(".switch-button").style.color = "white";
    }
    isLight = !isLight;
}
