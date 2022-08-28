function parser(){
    let expression = document.querySelector('#output').innerHTML;
    let lastExprSymbol = expression[expression.length - 1];
    if(lastExprSymbol == '+' || lastExprSymbol == '-' || lastExprSymbol == '*' || lastExprSymbol == '/'){
        expression = expression.slice(0, -1);
    }
    let operators = [];
    let operands = [];
    let lastIndex = 0;
    for(let i = 0; i < expression.length; i++){
        if(expression[i] == '+' || expression[i] == '-' || expression[i] == '*' || expression[i] == '/'){
            operands.push(expression.slice(lastIndex, i))
            operators.push(expression[i]);
            lastIndex = i + 1;
        }
    }
    operands.push(expression.slice(lastIndex));
    console.log(expression);
    console.log(operands);
    console.log(operators);
    //1-й проход: ищу операторы / и * и выполняю их для своих операндов. Затем эти операнды удаляю, а на их место ставлю получившееся значение. Оператор тоже удаляю.
    for(let i = 0; i < operators.length; i++){
        if(operators[i] == '*'){
            //доделать
        }
    }
}

String.prototype.replaceAt = function(index, replacement){
    let first = this.slice(0, index) + replacement;
    let second = this.slice(index + replacement.length);
    return this.slice(0, index) + replacement + this.slice(index + replacement.length);
}

function addSymbol(symbol){
    let expression = document.querySelector('#output').innerHTML;
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
    document.querySelector('#output').innerHTML = expression;
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