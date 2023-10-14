const calculatorScreen = document.querySelector(".calculator-screen");
const buttons = document.querySelectorAll("button");

const calculatorDisplayArray = [0];
calculatorScreen.textContent = calculatorDisplayArray;

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
        calculatorDisplayArray.pop();
        updateDisplayArray();
        break;
      default:
        updateDisplayArray(input);
        break;
    }
  })
);
