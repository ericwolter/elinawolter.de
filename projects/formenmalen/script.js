const malfeld = document.querySelector("#malfeld");
const stift = malfeld.getContext("2d");
const schildkroete = document.querySelector("#schildkroete");
const farbeKnopf = document.querySelector("#farbe");
const farbpunkt = document.querySelector("#farbpunkt");
const neuKnopf = document.querySelector("#neu");
const statusBox = document.querySelector("#status");

const farben = [
  { name: "Rot", value: "#ff4d6d" },
  { name: "Orange", value: "#ffa94d" },
  { name: "Gelb", value: "#ffe66d" },
  { name: "Grün", value: "#69db7c" },
  { name: "Blau", value: "#4dabf7" },
  { name: "Lila", value: "#b197fc" },
];

const schritt = 24;
const rand = 24;
const startX = malfeld.width / 2;
const startY = malfeld.height / 2;
const minX = startX - Math.floor((startX - rand) / schritt) * schritt;
const maxX = startX + Math.floor((malfeld.width - rand - startX) / schritt) * schritt;
const minY = startY - Math.floor((startY - rand) / schritt) * schritt;
const maxY = startY + Math.floor((malfeld.height - rand - startY) / schritt) * schritt;

let x = startX;
let y = startY;
let farbeNummer = 0;

function aktuelleFarbe() {
  return farben[farbeNummer].value;
}

function aktuellerFarbname() {
  return farben[farbeNummer].name;
}

function zeigeFarbe() {
  farbpunkt.style.backgroundColor = aktuelleFarbe();
  farbeKnopf.setAttribute("aria-label", "Farbe wechseln. Aktuell: " + aktuellerFarbname());
}

function malePunkt() {
  stift.beginPath();
  stift.arc(x, y, 14, 0, Math.PI * 2);
  stift.fillStyle = aktuelleFarbe();
  stift.fill();
}

function zeigeSchildkroete() {
  const links = (x / malfeld.width) * 100;
  const oben = (y / malfeld.height) * 100;

  schildkroete.style.left = links + "%";
  schildkroete.style.top = oben + "%";
}

function gehe(richtung) {
  if (richtung === "links") x = x - schritt;
  if (richtung === "rechts") x = x + schritt;
  if (richtung === "oben") y = y - schritt;
  if (richtung === "unten") y = y + schritt;

  // Die Schildkröte bleibt auf ihrem 24px-Raster.
  x = Math.max(minX, Math.min(maxX, x));
  y = Math.max(minY, Math.min(maxY, y));

  malePunkt();
  zeigeSchildkroete();
  statusBox.textContent = "Gemalt mit " + aktuellerFarbname() + ".";
}

function neueFarbe() {
  farbeNummer = farbeNummer + 1;

  if (farbeNummer >= farben.length) {
    farbeNummer = 0;
  }

  zeigeFarbe();
  statusBox.textContent = "Neue Farbe: " + aktuellerFarbname() + ".";
}

function allesWegwischen() {
  stift.clearRect(0, 0, malfeld.width, malfeld.height);
  malePunkt();
  statusBox.textContent = "Das Blatt ist wieder frei.";
}

document.addEventListener("keydown", function (ereignis) {
  if (ereignis.key === "ArrowLeft") {
    ereignis.preventDefault();
    gehe("links");
  }

  if (ereignis.key === "ArrowRight") {
    ereignis.preventDefault();
    gehe("rechts");
  }

  if (ereignis.key === "ArrowUp") {
    ereignis.preventDefault();
    gehe("oben");
  }

  if (ereignis.key === "ArrowDown") {
    ereignis.preventDefault();
    gehe("unten");
  }
});

document.querySelectorAll("[data-richtung]").forEach(function (knopf) {
  function bewegeSchildkroete() {
    gehe(knopf.dataset.richtung);
  }

  knopf.addEventListener("touchend", function (ereignis) {
    ereignis.preventDefault();
    bewegeSchildkroete();
  });

  knopf.addEventListener("click", bewegeSchildkroete);
});

farbeKnopf.addEventListener("click", neueFarbe);
neuKnopf.addEventListener("click", allesWegwischen);

zeigeFarbe();
malePunkt();
zeigeSchildkroete();
