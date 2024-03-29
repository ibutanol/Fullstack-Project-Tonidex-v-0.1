// static/script.js

// Funktion, um einen Wert aus einem Bereich in einen anderen zu mappen
function map(val, minA, maxA, minB, maxB) {
  return minB + ((val - minA) * (maxB - minB)) / (maxA - minA);
}

function Card3D(card, ev) {
  let cardRect = card.getBoundingClientRect();
  let width = cardRect.width;
  let height = cardRect.height;

  // Korrekte Mausposition relativ zur Karte
  let mouseX = ev.clientX - cardRect.left;
  let mouseY = ev.clientY - cardRect.top;

  // Wertemapping für Rotation und Helligkeit
  let rotateY = map(mouseX, 0, width, -25, 25);
  let rotateX = map(mouseY, 0, height, 25, -25);
  let brightness = map(mouseY, 0, height, 1.1, 0.5);

  // Anwendung der Transformationen auf die Karte
  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  card.style.filter = `brightness(${brightness})`;
}

// Selektiere alle Elemente mit der Klasse "karte"
var cards = document.querySelectorAll(".karte");

cards.forEach((card) => {
  card.addEventListener("mousemove", (ev) => {
    Card3D(card, ev);
  });

  card.addEventListener("mouseleave", (ev) => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
    card.style.filter = "brightness(1)";
  });
});