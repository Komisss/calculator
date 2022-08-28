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
    else if((symbol == '+' || symbol == '-' || symbol == '*' || symbol == '/') && expression.length == 0){
        return;
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