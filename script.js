const calculatorScreen = document.querySelector(".calculator-screen");
const buttons = document.querySelectorAll("button");
const calculatorDisplayArray = [0];

calculatorScreen.textContent = calculatorDisplayArray;
buttons.forEach((button) =>
  button.addEventListener("click", (e) => {
    let input = e.target.textContent;
    calculatorDisplayArray.push(input);
    calculatorScreen.textContent = calculatorDisplayArray.join("");
    console.log(input);
  })
);
