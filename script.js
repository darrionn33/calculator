const calculatorScreen = document.querySelector(".calculator-screen");
const buttons = document.querySelectorAll("button");

const calculatorDisplayArray = [0];
calculatorScreen.textContent = calculatorDisplayArray;

const updateDisplayArray = (item) => {
  calculatorDisplayArray.push(item);
  calculatorScreen.textContent = calculatorDisplayArray.join("");
};

buttons.forEach((button) =>
  button.addEventListener("click", (e) => {
    let input = e.target.value;
    updateDisplayArray(input);
  })
);
