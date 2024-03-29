const calculatorScreen = document.querySelector(".calculator-screen");
const buttons = document.querySelectorAll("button");

const calculatorDisplayArray = [0];
calculatorScreen.textContent = calculatorDisplayArray;

const add = (a, b) => {
  return a + b;
};
const substract = (a, b) => {
  return a - b;
};
const multiply = (a, b) => {
  return a * b;
};
const divide = (a, b) => {
  let quotient = Math.round((+a / +b) * 100) / 100;
  return quotient;
};

const operatorObject = {
  "+": add,
  "-": substract,
  x: multiply,
  "÷": divide,
};
const operate = (operator, a, b) => {
  return operatorObject[operator](a, b);
};

let isInitialising = true;
const updateDisplayArray = (item) => {
  if (item !== undefined) {
    if (isInitialising) {
      calculatorDisplayArray[0] = item;
      isInitialising = false;
    } else {
      if (typeof item === "object") {
        if (item.total === Infinity || item.total === -Infinity) {
          calculatorDisplayArray[0] = "ERROR: can't divide by 0.";
        } else {
          calculatorDisplayArray[0] = item.total;
        }
        isInitialising = true;
      } else {
        if (calculatorDisplayArray[0] !== 0) {
          calculatorDisplayArray.push(item);
        }
      }
    }
  }
  calculatorScreen.textContent = calculatorDisplayArray.join("");
};
const findResult = (numArr, opArr) => {
  let result;

  for (let i = 0; i < numArr.length - 1; i++) {
    if (result !== undefined) {
      let secondNum = numArr[i + 1];
      let oldResult = result;
      result = operate(opArr[i], +oldResult, +secondNum);
    } else {
      let firstNum = numArr[i];
      let secondNum = numArr[i + 1];
      result = operate(opArr[i], +firstNum, +secondNum);
    }
  }
  return result;
};

buttons.forEach((button) =>
  button.addEventListener("click", (e) => {
    let input = e.target.value;
    if (isFinite(+input)) {
      updateDisplayArray(+input);
    } else {
      switch (input) {
        case "ac":
          calculatorDisplayArray.length = 0;
          calculatorDisplayArray[0] = 0;
          isInitialising = true;
          updateDisplayArray();
          break;
        case "c":
          if (calculatorDisplayArray.length === 1) {
            calculatorDisplayArray[0] = 0;
            isInitialising = true;
            updateDisplayArray();
          } else {
            calculatorDisplayArray.pop();
            updateDisplayArray();
          }
          break;
        case "equals":
          let operators = calculatorDisplayArray
            .join("")
            .split(/[0-9]+/)
            .filter((operator) => {
              if (operator !== " ") {
                return operator;
              }
            });
          let operands = calculatorDisplayArray.join("").split(/[-+÷x]+/);
          let total = findResult(operands, operators);
          calculatorDisplayArray.length = 0;
          updateDisplayArray({ total: total });
          break;
        default:
          updateDisplayArray(input);
          break;
      }
    }
  })
);
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      updateDisplayArray(+e.key);
      break;
    case "+":
    case "-":
      updateDisplayArray(e.key);
      break;
    case "/":
      updateDisplayArray("÷");
      break;
    case "*":
      updateDisplayArray("x");
      break;
    case "Backspace":
      if (e.shiftKey) {
        calculatorDisplayArray.length = 0;
        calculatorDisplayArray[0] = 0;
        isInitialising = true;
        updateDisplayArray();
      } else {
        if (calculatorDisplayArray.length === 1) {
          calculatorDisplayArray[0] = 0;
          isInitialising = true;
          updateDisplayArray();
        } else {
          calculatorDisplayArray.pop();
          updateDisplayArray();
        }
      }
      break;
    case "=":
    case "Enter":
      let operators = calculatorDisplayArray
        .join("")
        .split(/[0-9]+/)
        .filter((operator) => {
          if (operator !== " ") {
            return operator;
          }
        });
      let operands = calculatorDisplayArray.join("").split(/[-+÷x]+/);
      let total = findResult(operands, operators);
      calculatorDisplayArray.length = 0;
      updateDisplayArray({ total: total });
      break;
  }
});
