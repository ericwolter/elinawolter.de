const malfeld = document.querySelector("#malfeld");
const stift = malfeld.getContext("2d");
const schildkroete = document.querySelector("#schildkroete");
const farbeKnopf = document.querySelector("#farbe");
const neuKnopf = document.querySelector("#neu");

const farben = ["#e83f6f", "#2ec4b6", "#ff9f1c", "#3a86ff", "#8ac926"];

let x = malfeld.width / 2;
let y = malfeld.height / 2;
let farbeNummer = 0;

function aktuelleFarbe() {
  return farben[farbeNummer];
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
  const schritt = 24;

  if (richtung === "links") x = x - schritt;
  if (richtung === "rechts") x = x + schritt;
  if (richtung === "oben") y = y - schritt;
  if (richtung === "unten") y = y + schritt;

  // Die Schildkröte bleibt im Bild.
  x = Math.max(20, Math.min(malfeld.width - 20, x));
  y = Math.max(20, Math.min(malfeld.height - 20, y));

  malePunkt();
  zeigeSchildkroete();
}

function neueFarbe() {
  farbeNummer = farbeNummer + 1;

  if (farbeNummer >= farben.length) {
    farbeNummer = 0;
  }
}

function allesWegwischen() {
  stift.clearRect(0, 0, malfeld.width, malfeld.height);
  malePunkt();
}

document.addEventListener("keydown", function (ereignis) {
  if (ereignis.key === "ArrowLeft") gehe("links");
  if (ereignis.key === "ArrowRight") gehe("rechts");
  if (ereignis.key === "ArrowUp") gehe("oben");
  if (ereignis.key === "ArrowDown") gehe("unten");
});

document.querySelectorAll("[data-richtung]").forEach(function (knopf) {
  knopf.addEventListener("click", function () {
    gehe(knopf.dataset.richtung);
  });
});

farbeKnopf.addEventListener("click", neueFarbe);
neuKnopf.addEventListener("click", allesWegwischen);

malePunkt();
zeigeSchildkroete();
