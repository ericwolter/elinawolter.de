const board = document.querySelector("#board");
const colorsBox = document.querySelector("#colors");
const secretCodeBox = document.querySelector("#secretCode");
const statusBox = document.querySelector("#status");
const newGameButton = document.querySelector("#newGameButton");
const checkButton = document.querySelector("#checkButton");
const clearButton = document.querySelector("#clearButton");

const emptyColor = "#eeeeee";
const codeLength = 4;
const maxGuesses = 8;

const colors = [
  { name: "Rot", value: "#ff4d6d" },
  { name: "Orange", value: "#ffa94d" },
  { name: "Gelb", value: "#ffe66d" },
  { name: "Grün", value: "#69db7c" },
  { name: "Blau", value: "#4dabf7" },
  { name: "Lila", value: "#b197fc" },
];

let currentColor = colors[0].value;
let secretCode = [];
let currentRow = 0;
let gameIsRunning = false;

function createColorButtons() {
  colors.forEach(function (color) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "color-button";
    button.dataset.color = color.value;
    button.setAttribute("aria-label", color.name);

    const dot = document.createElement("span");
    dot.className = "color-dot";
    dot.style.backgroundColor = color.value;

    const name = document.createElement("span");
    name.className = "color-name";
    name.textContent = color.name;

    button.append(dot, name);

    button.addEventListener("click", function () {
      currentColor = color.value;
      showActiveColor();
    });

    colorsBox.append(button);
  });
}

function createSecretHoles() {
  secretCodeBox.innerHTML = "";

  for (let i = 0; i < codeLength; i++) {
    const hole = document.createElement("div");
    hole.className = "secret-hole";
    hole.textContent = "?";
    hole.setAttribute("aria-label", "Geheime Farbe");
    secretCodeBox.append(hole);
  }
}

function createBoard() {
  board.innerHTML = "";

  for (let rowIndex = 0; rowIndex < maxGuesses; rowIndex++) {
    const row = document.createElement("div");
    row.className = "guess-row";
    row.dataset.row = rowIndex;

    for (let columnIndex = 0; columnIndex < codeLength; columnIndex++) {
      const field = document.createElement("button");
      field.type = "button";
      field.className = "field";
      field.dataset.row = rowIndex;
      field.dataset.column = columnIndex;
      field.setAttribute("aria-label", "Leeres Feld");

      field.addEventListener("click", function () {
        setFieldColor(field);
      });

      row.append(field);
    }

    const feedback = document.createElement("div");
    feedback.className = "feedback";
    feedback.setAttribute("aria-label", "Hinweise");

    for (let i = 0; i < codeLength; i++) {
      const pin = document.createElement("span");
      pin.className = "pin";
      feedback.append(pin);
    }

    row.append(feedback);
    board.append(row);
  }
}

function showActiveColor() {
  const colorButtons = document.querySelectorAll(".color-button");

  colorButtons.forEach(function (button) {
    button.classList.toggle("active", button.dataset.color === currentColor);
  });
}

function setFieldColor(field) {
  const rowIndex = Number(field.dataset.row);

  if (!gameIsRunning || rowIndex !== currentRow) {
    return;
  }

  field.style.backgroundColor = currentColor;
  field.dataset.color = currentColor;
  field.setAttribute("aria-label", "Ausgewählte Farbe");
}

function startNewGame() {
  secretCode = chooseSecretCode();
  currentRow = 0;
  gameIsRunning = true;

  createSecretHoles();
  clearBoard();
  setLockedRows();
  updateButtons();
  statusBox.textContent = "Der geheime Code ist bereit.";
}

function chooseSecretCode() {
  const availableColors = colors.map(function (color) {
    return color.value;
  });

  const code = [];

  while (code.length < codeLength) {
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const color = availableColors.splice(randomIndex, 1)[0];
    code.push(color);
  }

  return code;
}

function clearBoard() {
  const fields = document.querySelectorAll(".field");
  const pins = document.querySelectorAll(".pin");

  fields.forEach(function (field) {
    field.style.backgroundColor = emptyColor;
    delete field.dataset.color;
    field.classList.remove("locked");
    field.setAttribute("aria-label", "Leeres Feld");
  });

  pins.forEach(function (pin) {
    pin.className = "pin";
  });
}

function clearCurrentRow() {
  if (!gameIsRunning) {
    return;
  }

  const fields = getCurrentFields();

  fields.forEach(function (field) {
    field.style.backgroundColor = emptyColor;
    delete field.dataset.color;
    field.setAttribute("aria-label", "Leeres Feld");
  });

  statusBox.textContent = "Die aktuelle Reihe ist wieder leer.";
}

function checkGuess() {
  if (!gameIsRunning) {
    statusBox.textContent = "Starte zuerst ein neues Spiel.";
    return;
  }

  const fields = getCurrentFields();
  const guess = fields.map(function (field) {
    return field.dataset.color;
  });

  if (guess.some(function (color) { return !color; })) {
    statusBox.textContent = "Fülle erst alle vier Felder.";
    return;
  }

  if (new Set(guess).size !== codeLength) {
    statusBox.textContent = "Nimm vier unterschiedliche Farben.";
    return;
  }

  const result = rateGuess(guess);
  showFeedback(result);
  lockCurrentRow();

  if (result.black === codeLength) {
    gameIsRunning = false;
    revealSecretCode();
    statusBox.textContent = "Geschafft! Du hast den Code geknackt.";
  } else if (currentRow === maxGuesses - 1) {
    gameIsRunning = false;
    revealSecretCode();
    statusBox.textContent = "Der Code ist aufgedeckt. Versuch es nochmal!";
  } else {
    currentRow += 1;
    setLockedRows();
    statusBox.textContent = "Weiter geht's mit der nächsten Reihe.";
  }

  updateButtons();
}

function getCurrentFields() {
  return Array.from(
    document.querySelectorAll('.field[data-row="' + currentRow + '"]')
  );
}

function rateGuess(guess) {
  let black = 0;
  let white = 0;

  guess.forEach(function (color, index) {
    if (secretCode[index] === color) {
      black += 1;
    } else if (secretCode.includes(color)) {
      white += 1;
    }
  });

  return { black: black, white: white };
}

function showFeedback(result) {
  const row = document.querySelector('.guess-row[data-row="' + currentRow + '"]');
  const pins = Array.from(row.querySelectorAll(".pin"));
  const pinColors = [];

  for (let i = 0; i < result.black; i++) {
    pinColors.push("black");
  }

  for (let i = 0; i < result.white; i++) {
    pinColors.push("white");
  }

  pins.forEach(function (pin, index) {
    pin.className = "pin";

    if (pinColors[index]) {
      pin.classList.add(pinColors[index]);
    }
  });
}

function lockCurrentRow() {
  getCurrentFields().forEach(function (field) {
    field.classList.add("locked");
  });
}

function setLockedRows() {
  const fields = document.querySelectorAll(".field");

  fields.forEach(function (field) {
    const isCurrentRow = Number(field.dataset.row) === currentRow;
    field.disabled = !gameIsRunning || !isCurrentRow;
    field.classList.toggle("locked", !isCurrentRow);
  });
}

function revealSecretCode() {
  const holes = document.querySelectorAll(".secret-hole");

  holes.forEach(function (hole, index) {
    hole.textContent = "";
    hole.style.backgroundColor = secretCode[index];
    hole.classList.add("solved");
    hole.setAttribute("aria-label", "Aufgedeckte geheime Farbe");
  });
}

function updateButtons() {
  checkButton.disabled = !gameIsRunning;
  clearButton.disabled = !gameIsRunning;
}

newGameButton.addEventListener("click", startNewGame);
checkButton.addEventListener("click", checkGuess);
clearButton.addEventListener("click", clearCurrentRow);

createColorButtons();
createSecretHoles();
createBoard();
showActiveColor();
setLockedRows();
updateButtons();
