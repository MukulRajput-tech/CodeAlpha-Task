const display = document.getElementById('display');

function append(char) {
  display.value += char;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = 'Error';
  }
}

document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (!isNaN(key) || "+-*/.".includes(key)) append(key);
  else if (key === 'Enter') calculate();
  else if (key === 'Backspace') deleteLast();
  else if (key === 'Escape') clearDisplay();
});
