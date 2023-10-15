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
  return a / b;
};
const operate = (operator, a, b) => {
  return operator(a, b);
};

let isInitialising = true;
const updateDisplayArray = (item) => {
  if (item) {
    if (isInitialising) {
      calculatorDisplayArray[0] = item;
      isInitialising = false;
    } else {
      calculatorDisplayArray.push(item);
    }
  }
  calculatorScreen.textContent = calculatorDisplayArray.join("");
};

buttons.forEach((button) =>
  button.addEventListener("click", (e) => {
    let input = e.target.value;
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
          updateDisplayArray();
        } else {
          calculatorDisplayArray.pop();
          updateDisplayArray(0);
        }
        break;
      default:
        updateDisplayArray(input);
        break;
    }
  })
);
