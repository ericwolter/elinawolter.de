const grid = document.querySelector("#grid");
const colorsBox = document.querySelector("#colors");
const eraserButton = document.querySelector("#eraserButton");
const randomButton = document.querySelector("#randomButton");
const clearButton = document.querySelector("#clearButton");

const emptyColor = "#eeeeee";
const rows = 8;
const columns = 12;

const colors = [
  { name: "Rot", value: "#ff4d6d" },
  { name: "Blau", value: "#4dabf7" },
  { name: "Gelb", value: "#ffe66d" },
  { name: "Grün", value: "#69db7c" },
  { name: "Lila", value: "#b197fc" },
  { name: "Orange", value: "#ffa94d" },
  { name: "Rosa", value: "#f783ac" },
  { name: "Weiß", value: "#ffffff" },
];

let currentColor = colors[0].value;
let eraserIsOn = false;

// Hier entstehen die Knöpfe für die Farben.
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

    // Wenn man eine Farbe auswählt, merken wir uns diese Farbe.
    button.addEventListener("click", function () {
      currentColor = color.value;
      eraserIsOn = false;
      showActiveTool();
    });

    colorsBox.append(button);
  });
}

// Hier entsteht das Raster mit 12 Spalten und 8 Reihen.
function createGrid() {
  const numberOfFields = rows * columns;

  for (let i = 0; i < numberOfFields; i++) {
    const field = document.createElement("button");
    field.type = "button";
    field.className = "field";
    field.setAttribute("aria-label", "Leeres Feld");

    // Wenn man auf ein Feld klickt, wird es bunt oder wieder leer.
    field.addEventListener("click", function () {
      if (eraserIsOn) {
        field.style.backgroundColor = emptyColor;
        field.setAttribute("aria-label", "Leeres Feld");
      } else {
        field.style.backgroundColor = currentColor;
        field.setAttribute("aria-label", "Bunter Baustein");
      }
    });

    grid.append(field);
  }
}

function showActiveTool() {
  const colorButtons = document.querySelectorAll(".color-button");

  colorButtons.forEach(function (button) {
    const isCurrentColor = button.dataset.color === currentColor;
    button.classList.toggle("active", isCurrentColor && !eraserIsOn);
  });

  eraserButton.classList.toggle("active", eraserIsOn);
}

function chooseRandomColor() {
  const randomNumber = Math.floor(Math.random() * colors.length);
  currentColor = colors[randomNumber].value;
  eraserIsOn = false;
  showActiveTool();
}

function clearGrid() {
  const fields = document.querySelectorAll(".field");

  fields.forEach(function (field) {
    field.style.backgroundColor = emptyColor;
    field.setAttribute("aria-label", "Leeres Feld");
  });
}

eraserButton.addEventListener("click", function () {
  eraserIsOn = !eraserIsOn;
  showActiveTool();
});

randomButton.addEventListener("click", chooseRandomColor);
clearButton.addEventListener("click", clearGrid);

createColorButtons();
createGrid();
showActiveTool();
