// Mengambil elemen-elemen yang dibutuhkan dari DOM
const displayInput = document.getElementById("inputBox");
const allButtons = document.querySelectorAll("button"); 

let expression = "";

// Mengubah NodeList button menjadi array agar bisa menggunakan forEach
const buttonsArray = Array.from(allButtons);


function clearAll() {
    expression = "";
    updateDisplay();
}


function deleteLastCharacter() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function calculateResult() {
    try {
        expression = eval(expression).toString(); //eval(): fungsi JavaScript yang menghitung string ekspresi matematika
        updateDisplay();
    } catch (error) {
        expression = "Error";
        updateDisplay();
    }
}


function updateDisplay() {
    displayInput.value = expression;
}


function handleOperator(operator) {
    switch(operator) {
        case "÷":
            expression += "/";
            break;
        case "x":
            expression += "*";
            break;
        default:
            expression += operator;
    }
    updateDisplay();
}


function handleInput(value) {
    expression += value;
    updateDisplay();
}

// Menambahkan event listener ke setiap tombol
buttonsArray.forEach((button) => {
    button.addEventListener("click", (event) => {
        const buttonValue = event.target.innerHTML;


        switch(buttonValue) {
            case "=":
                calculateResult();
                break;
            case "AC":
                clearAll();
                break;
            case "DEL":
                deleteLastCharacter();
                break;
            case "÷":
            case "x":
            case "+":
            case "-":
            case "%":
                handleOperator(buttonValue);
                break;
            default:
                handleInput(buttonValue);
        }
    });
});