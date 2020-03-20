function eval() {
  // Do not use eval!!!
  return;
}

function calc(expr) {
  const object = {
    "-": 1,
    "+": 1,
    "/": 2,
    "*": 2,
    ")": '(',
  };
  let symbol = [];
  let number = [];
  //let str = expr.match(/\d{1,}|\*|\(|\)|\+|\/|\-/g, "");
  let str = expr;

  function eva(element) {
    let a = Number(number.pop());
    let b = Number(number.pop());
    let result;
    switch (element) {
      case "*":
        result = b * a;
        number.push(result);
        break;
      case "/":
        result = b / a;
        if (result == "Infinity")
          throw new TypeError("TypeError: Division by zero.");
        number.push(result);
        break;
      case "+":
        result = b + a;
        number.push(result);
        break;
      case "-":
        result = b - a;
        number.push(result);
    }
  }

  function operandOne(item, element) {
    if (symbol.length === 0) {
      symbol.push(item);
      str.splice(0, 1);
      callback();
    } else if (object[item] === object[element]) {
      eva(element);
      symbol.pop();
      callback();
    } else if (object[element] == 2) {
      eva(element);
      symbol.pop();
      callback();
    } else {
      symbol.push(item);
      str.splice(0, 1);
      callback();
    }
  }

  function operandTwo(item, element) {
    if (object[item] === object[element]) {
      eva(element);
      symbol.pop();
      callback();
    } else {
      symbol.push(item);
      str.splice(0, 1);
      callback();
    }
  }

  function callback() {
    let item = str[0];
    let element = symbol[symbol.length - 1];
    if (/\d/g.test(item)) {
      number.push(item);
      str.splice(0, 1);
      callback();
    } else if (object[item] == 1) {
      operandOne(item, element);
    } else if (object[item] == 2) {
      operandTwo(item, element);
    } else if (item == '(') {
      symbol.push(item);
      str.splice(0, 1);
      callback();
    } else if (item == ')') {
      if (object[item] === element) {
        str.splice(0, 1);
        symbol.pop();
        callback();
      } else {
      eva(element);
      symbol.pop();
      callback();
    }
    } else if (str.length === 0 && number.length > 1) {
      eva(element);
      symbol.pop();
      callback();
    } else if (str.length === 0 && number.length === 1) return number[0];
  }

  callback();

  return number[0];
}

function expressionCalculator(expr) {
  str = expr.match(/\d{1,}|\*|\(|\)|\+|\/|\-/g, "");
  let open = 0;
  let close = 0;

  for (const item of str) {
    if (item === "(") open++;
    if (item == ")") close++;
  }
  if (open !== close)
    throw new Error("ExpressionError: Brackets must be paired.");
  return calc(str);
}

module.exports = {
  expressionCalculator
};
