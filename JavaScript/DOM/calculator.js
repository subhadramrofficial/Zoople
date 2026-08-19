const display = document.getElementById("display");
function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, display.value.length - 1);
}

function calculate() {
  let expression = display.value;

  if (expression === "") return;
  let lastChar = expression[expression.length - 1];
  if ((["+", "-", "*", "/", "%"].includes(lastChar))) {
    alert("Invalid Expression");
    return;
  }
  try {
    let result = eval(expression);
    if (!isFinite(result)) {
      display.value = "Error";
      return;
    }
    display.value = result;
  } catch {
    display.value = "Error";
  }
}
