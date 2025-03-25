document.addEventListener("DOMContentLoaded", function () {
    const resultInput = document.getElementById("result");
    const buttons = document.querySelectorAll(".btn");

    let currentInput = "";
    let operator = "";
    let previousInput = "";

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const value = button.getAttribute("data-value");

            if (!isNaN(value) || value === ".") {
                handleNumber(value);
            } else if (value === "C") {
                clearCalculator();
            } else if (value === "=") {
                calculateResult();
            } else {
                handleOperator(value);
            }

            updateDisplay();
        });
    });

    function handleNumber(value) {
        if (currentInput.includes(".") && value === ".") return; // Evita múltiples puntos decimales
        currentInput += value;
    }

    function handleOperator(value) {
        if (currentInput === "") return; // Evita operadores sin número previo
        if (previousInput !== "") {
            calculateResult();
        }
        operator = value;
        previousInput = currentInput;
        currentInput = "";
    }

    function calculateResult() {
        if (previousInput === "" || currentInput === "") return;
        let result;
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);

        switch (operator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = num2 !== 0 ? num1 / num2 : "Error"; // Evita la división por cero
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = "";
        previousInput = "";
    }

    function clearCalculator() {
        currentInput = "";
        previousInput = "";
        operator = "";
    }

    function updateDisplay() {
        resultInput.value = currentInput || previousInput || "0";
    }
});
