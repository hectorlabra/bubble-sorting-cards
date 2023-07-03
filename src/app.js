// Obtén referencias a los elementos del DOM
const cardContainer = document.getElementById("card-container");
const generateCardsBtn = document.getElementById("generate-cards-btn");
const sortCardsBtn = document.getElementById("sort-cards-btn");

// Generar una lista de cartas aleatorias
function generateRandomCards(numCards) {
  const cards = [];
  const suits = ["♠", "♥", "♦", "♣"];
  const ranks = [
    "A",
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
    "K"
  ];

  for (let i = 0; i < numCards; i++) {
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
    const card = `${randomRank}${randomSuit}`;
    cards.push(card);
  }

  return cards;
}

// Renderizar las cartas en el contenedor
function renderCards(cards) {
  cardContainer.innerHTML = "";

  cards.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.textContent = card;
    cardContainer.appendChild(cardElement);
  });
}

// Generar cartas aleatorias al hacer clic en el botón "Generar cartas aleatorias"
generateCardsBtn.addEventListener("click", () => {
  const numCards = parseInt(prompt("Ingrese el número de cartas aleatorias:"));
  const cards = generateRandomCards(numCards);
  renderCards(cards);
});

// Ordenar las cartas usando el algoritmo de ordenamiento de burbuja
sortCardsBtn.addEventListener("click", () => {
  const cardsCopy = Array.from(cardContainer.children).map(
    cardElement => cardElement.textContent
  );
  const sortedCards = bubbleSort(cardsCopy);
  renderCards(sortedCards);
});

// Implementar el algoritmo de ordenamiento de burbuja
function bubbleSort(arr) {
  const n = arr.length;
  let swapped;

  do {
    swapped = false;

    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);

  return arr;
}
