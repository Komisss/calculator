function parser(){
    let expression = document.querySelector('#output').innerHTML;
    
}

String.prototype.replaceAt = function(index, replacement){
    let first = this.slice(0, index) + replacement;
    let second = this.slice(index + replacement.length);
    return this.slice(0, index) + replacement + this.slice(index + replacement.length);
}

console.log("012345".replaceAt(2, "999"));

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
    console.log(expression);
    document.querySelector('#output').innerHTML = expression;
}

function isCorrectSymbol(symbol, expression){
    console.log(symbol);
    if(symbol == '+' || symbol == '-' || symbol == '*' || symbol == '/'){
        let exprSymbol = expression[expression.length - 1];
        console.log(exprSymbol); 
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