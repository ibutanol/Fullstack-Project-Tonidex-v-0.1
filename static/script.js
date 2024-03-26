// static/script.js

// Funktion, um einen Wert aus einem Bereich in einen anderen zu mappen
function map(val, minA, maxA, minB, maxB) {
    return minB + ((val - minA) * (maxB - minB)) / (maxA - minA);
  }
  
  function Card3D(card, ev) {
    let img = card.querySelector("img");
    let imgRect = card.getBoundingClientRect();
    let width = imgRect.width;
    let height = imgRect.height;
  
    // Korrekte Mausposition relativ zur Seite
    let mouseX = ev.clientX - imgRect.left;
    let mouseY = ev.clientY - imgRect.top;
  
    // Wertemapping für Rotation und Helligkeit
    let rotateY = map(mouseX, 0, width, -25, 25);
    let rotateX = map(mouseY, 0, height, 25, -25);
    let brightness = map(mouseY, 0, height, 1.1, 0.5);
  
    // Anwendung der Transformationen auf das Bild
    img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    img.style.filter = `brightness(${brightness})`;
  }
  
  // Selektiere alle Elemente mit der Klasse "card3d"
  var cards = document.querySelectorAll(".card3d");
  
  cards.forEach((card) => {
    card.addEventListener("mousemove", (ev) => {
      Card3D(card, ev);
    });
  
    card.addEventListener("mouseleave", (ev) => {
      let img = card.querySelector("img");
  
      img.style.transform = "rotateX(0deg) rotateY(0deg)";
      img.style.filter = "brightness(1)";
    });
  });