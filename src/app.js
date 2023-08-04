// Definición de los símbolos de las cartas
const SYMBOL_CARD = ["♦", "♥", "♠", "♣"];

// Definición de los valores numéricos de las cartas
const CARD_ITEM = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
];

const CARDS_INPUT = document.querySelector(".ncards");
const DRAW_BUTTON = document.querySelector(".draw");
const SORT_BUTTON = document.querySelector(".sort");
const CARD_CONTAINER = document.querySelector(".card-container");
const LOG_CONTAINER = document.querySelector(".log-entries");

let cartas = [];
let registros = [];

function nuevaCarta() {
  const item = CARD_ITEM[Math.floor(Math.random() * CARD_ITEM.length)];
  const suit = SYMBOL_CARD[Math.floor(Math.random() * SYMBOL_CARD.length)];
  return { item, suit };
}

function dibujarCartas(cartas) {
  CARD_CONTAINER.innerHTML = "";

  for (const carta of cartas) {
    const elementoCarta = document.createElement("div");
    elementoCarta.classList.add("card");

    const elementoSuperior = document.createElement("div");
    elementoSuperior.classList.add("top");
    elementoSuperior.textContent = `${carta.item} ${carta.suit}`;
    elementoCarta.appendChild(elementoSuperior);

    const elementoPalo = document.createElement("div");
    elementoPalo.classList.add("suit");
    elementoPalo.textContent = carta.suit;
    elementoCarta.appendChild(elementoPalo);

    const elementoInferior = document.createElement("div");
    elementoInferior.classList.add("bottom");
    elementoInferior.textContent = `${carta.item} ${carta.suit}`;
    elementoCarta.appendChild(elementoInferior);

    if (carta.suit === "♦" || carta.suit === "♥") {
      elementoSuperior.classList.add("color1");
      elementoPalo.classList.add("color1");
      elementoInferior.classList.add("color1");
    } else {
      elementoSuperior.classList.add("color2");
      elementoPalo.classList.add("color2");
      elementoInferior.classList.add("color2");
    }

    CARD_CONTAINER.appendChild(elementoCarta);
  }
}

function registrarOrdenCartas(cartas) {
  const registro = document.createElement("div");
  registro.classList.add("log-entry");

  const cartasHtml = cartas
    .map(
      carta => `
      <div class="card">
        <div class="top">${carta.item} ${carta.suit}</div>
        <div class="suit">${carta.suit}</div>
        <div class="bottom">${carta.item} ${carta.suit}</div>
      </div>
    `
    )
    .join("");

  registro.innerHTML = cartasHtml;
  LOG_CONTAINER.appendChild(registro);
}

DRAW_BUTTON.addEventListener("click", evento => {
  evento.preventDefault();
  const numeroDeCartas = parseInt(CARDS_INPUT.value);

  if (numeroDeCartas > 0) {
    cartas = Array.from({ length: numeroDeCartas }, nuevaCarta);
    dibujarCartas(cartas);
  }
});

SORT_BUTTON.addEventListener("click", evento => {
  evento.preventDefault();
  LOG_CONTAINER.innerHTML = ""; // Limpiar el Registro de Ordenamiento antes de realizar un nuevo ordenamiento
  registros = [];

  const cartasClonadas = [...cartas]; // Clonar el arreglo de cartas para preservar el orden original

  // Implementación de Bubble Sort
  for (let i = 0; i < cartasClonadas.length - 1; i++) {
    for (let j = 0; j < cartasClonadas.length - i - 1; j++) {
      if (
        CARD_ITEM.indexOf(cartasClonadas[j].item) >
        CARD_ITEM.indexOf(cartasClonadas[j + 1].item)
      ) {
        // Intercambiar cartas
        const temp = cartasClonadas[j];
        cartasClonadas[j] = cartasClonadas[j + 1];
        cartasClonadas[j + 1] = temp;

        // Registrar el paso
        registros.push([...cartasClonadas]);
      }
    }
  }

  mostrarRegistros(registros);
});

function mostrarRegistros(registros) {
  let retraso = 0;

  registros.forEach(registro => {
    setTimeout(() => {
      LOG_CONTAINER.innerHTML = ""; // Limpiar el Registro de Ordenamiento antes de mostrar el siguiente registro
      registrarOrdenCartas(registro);
    }, retraso);

    retraso += 1000; // Mostrar cada registro después de 1 segundo (1000 ms)
  });
}
