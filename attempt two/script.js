const table = document.querySelector("#table");
const tableDealerSide = document.querySelector("#tableDealerSide");
const tablePlayerSide = document.querySelector("#tablePlayerSide");

const playButton = document.querySelector("#playButton");
const hitButton = document.querySelector("#hitButton");
const stayButton = document.querySelector("#stayButton");
const resetButton = document.querySelector("#resetButton");

const prompt = document.querySelector("#prompt");

const dealerScore = document.querySelector("#dealerScore");
const playerScore = document.querySelector("#playerScore");

let dealerHandCards = [];
let dealerHandValueArray = [];
let dealerHandTotal = 0;

let playerHandCards = [];
let playerHandValueArray = [];
let playerHandTotal = 0;

let playerTurn = true;
let dealerTurn = false;

// Class of card
class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  // Create card div element for dealer
  createCardDealer() {
    const card = document.createElement("div");
    card.classList.add("card");
    tableDealerSide.appendChild(card);
    card.innerHTML = `${this.value} of ${this.suit} `;
  }

  // Create card div element for player
  createCardPlayer() {
    const card = document.createElement("div");
    card.classList.add("card");
    tablePlayerSide.appendChild(card);
    card.innerHTML = `${this.value} of ${this.suit} `;
  }

  // Get Value
  cardValue() {
    let pointValue = this.value;
    if (
      this.value === "jack" ||
      this.value === "queen" ||
      this.value === "king"
    ) {
      pointValue = 10;
    }

    if (this.value === "ace") {
      if (playerHandTotal < 11 && playerTurn === true) {
        pointValue = 11;
        return pointValue;
      }
      if (dealerHandTotal < 11 && playerTurn === false) {
        pointValue = 11;
        return pointValue;
      }
      if (playerHandTotal >= 11 && playerTurn === true) {
        pointValue = 2;
        return pointValue;
      }
      if (dealerHandTotal >= 11 && playerTurn === false) {
        pointValue = 2;
        return pointValue;
      }
    }
    return pointValue;
  }
}

// Deck array
let deck = [
  new Card("clubs", 2),
  new Card("clubs", 3),
  new Card("clubs", 4),
  new Card("clubs", 5),
  new Card("clubs", 6),
  new Card("clubs", 7),
  new Card("clubs", 8),
  new Card("clubs", 9),
  new Card("clubs", 10),
  new Card("clubs", "jack"),
  new Card("clubs", "queen"),
  new Card("clubs", "king"),
  new Card("clubs", "ace"),
  new Card("spades", 2),
  new Card("spades", 3),
  new Card("spades", 4),
  new Card("spades", 5),
  new Card("spades", 6),
  new Card("spades", 7),
  new Card("spades", 8),
  new Card("spades", 9),
  new Card("spades", 10),
  new Card("spades", "jack"),
  new Card("spades", "queen"),
  new Card("spades", "king"),
  new Card("spades", "ace"),
  new Card("hearts", 2),
  new Card("hearts", 3),
  new Card("hearts", 4),
  new Card("hearts", 5),
  new Card("hearts", 6),
  new Card("hearts", 7),
  new Card("hearts", 8),
  new Card("hearts", 9),
  new Card("hearts", 10),
  new Card("hearts", "jack"),
  new Card("hearts", "queen"),
  new Card("hearts", "king"),
  new Card("hearts", "ace"),
  new Card("diamonds", 2),
  new Card("diamonds", 3),
  new Card("diamonds", 4),
  new Card("diamonds", 5),
  new Card("diamonds", 6),
  new Card("diamonds", 7),
  new Card("diamonds", 8),
  new Card("diamonds", 9),
  new Card("diamonds", 10),
  new Card("diamonds", "jack"),
  new Card("diamonds", "queen"),
  new Card("diamonds", "king"),
  new Card("diamonds", "ace"),
];

// Check for win or bust
const bustCheck = () => {
  // Player Dealer Bust
  let playerBust = false;
  let dealerBust = false;
  if (playerHandTotal > 21) {
    playerBust = true;
    prompt.innerHTML = "Player Bust... Dealer Wins!";
    //setTimeout(resetGame, 3000);
  }
  if (dealerHandTotal > 21) {
    dealerBust = true;
    prompt.innerHTML = "Dealer Bust... Player Wins!";
    //setTimeout(resetGame, 3000);
  }
};

// win check
const winCheck = () => {
  console.log("WIN CHECK");
  if (dealerHandTotal > playerHandTotal && dealerHandTotal < 22) {
    prompt.innerHTML = "The dealer wins!";
    //setTimeout(resetGame, 3000);
  }
  if (dealerHandTotal < playerHandTotal && playerHandTotal < 22) {
    prompt.innerHTML = "The Player wins!";
    //setTimeout(resetGame, 3000);
  }
  if (dealerHandTotal === playerHandTotal) {
    prompt.innerHTML = "TIE!";
    //setTimeout(resetGame, 3000);
  }
};

// Deal to Player - randomly select a card
const getPlayerHandTotal = () => {
  playerHandTotal = playerHandValueArray.reduce((a, b) => a + b, 0);
  playerScore.innerHTML = playerHandTotal;
  return playerHandTotal;
};

const dealCardPlayer = () => {
  console.log("Deal to player!");
  let numCardsLeft = deck.length;

  const deckIndexNum = Math.floor(Math.random() * numCardsLeft);
  let randomCard = deck[deckIndexNum];
  deck.splice(deckIndexNum, 1);

  playerHandValueArray.push(randomCard.cardValue());
  playerHandCards.push(randomCard);

  randomCard.createCardPlayer();

  getPlayerHandTotal();
  bustCheck();
  return randomCard;
};

// Deal to Player - randomly select a card
const getDealerHandTotal = () => {
  dealerHandTotal = dealerHandValueArray.reduce((a, b) => a + b, 0);
  dealerScore.innerHTML = dealerHandTotal;
  return dealerHandTotal;
};

// let deckIndexNum;

const dealCardDealer = () => {
  let numCardsLeft = deck.length;
  deckIndexNum = Math.floor(Math.random() * numCardsLeft);

  let randomCard = deck[deckIndexNum];
  deck.splice(deckIndexNum, 1);

  dealerHandValueArray.push(randomCard.cardValue());
  dealerHandCards.push(randomCard);

  randomCard.createCardDealer();

  getDealerHandTotal();
  bustCheck();

  return randomCard;
};

// Dealer overturned card - second dealer card
const dealCardDealerOverturned = () => {
  const overturnedCard = document.createElement("div");
  overturnedCard.classList.add("cardOverturned");
  tableDealerSide.appendChild(overturnedCard);
};

// remove overturned card and replace with actual card - used when the STAY button is clicked
const removeOverturnedCard = () => {
  let overturnedCard = tableDealerSide.childNodes[1];
  tableDealerSide.removeChild(overturnedCard);
  console.log("REMOVE");
};

const stayButtonFunction = () => {
  console.log("HERE!");
  prompt.innerHTML = "Ok! It's the dealer's turn";
  playerTurn = false;
  dealerAction();
  stayButton.setAttribute("disabled", "disabled");
  hitButton.setAttribute("disabled", "disabled");
};

// Player turn
const gameAction = () => {
  console.log("GAME ACTION!");
  prompt.innerHTML = "Hit or Stay?";
  hitButton.addEventListener("click", dealCardPlayer);
  stayButton.addEventListener("click", stayButtonFunction);
};

// Player turn
const dealerAction = () => {
  console.log("IS IT YOU?");
  removeOverturnedCard();
  while (
    dealerHandTotal < playerHandTotal &&
    playerHandTotal <= 21 &&
    playerTurn === false
  ) {
    dealCardDealer();
    if (dealerHandTotal >= playerHandTotal) {
      winCheck();
    }
  }
};

// Game action
const playGame = () => {
  let playGame = true;
  let playerTurn = true;
  if (playGame === true) {
    setTimeout(dealCardPlayer, 500);
    setTimeout(dealCardDealer, 500);
    setTimeout(dealCardPlayer, 1000);
    setTimeout(dealCardDealerOverturned, 1000);
    gameAction();
  }
  playButton.disabled = true;
};

//playButton.addEventListener("click", playGame);

// reset game
const resetGame = () => {
  // Reset Deck - 52 Cards
  deck = [
    new Card("clubs", 2),
    new Card("clubs", 3),
    new Card("clubs", 4),
    new Card("clubs", 5),
    new Card("clubs", 6),
    new Card("clubs", 7),
    new Card("clubs", 8),
    new Card("clubs", 9),
    new Card("clubs", 10),
    new Card("clubs", "jack"),
    new Card("clubs", "queen"),
    new Card("clubs", "king"),
    new Card("clubs", "ace"),
    new Card("spades", 2),
    new Card("spades", 3),
    new Card("spades", 4),
    new Card("spades", 5),
    new Card("spades", 6),
    new Card("spades", 7),
    new Card("spades", 8),
    new Card("spades", 9),
    new Card("spades", 10),
    new Card("spades", "jack"),
    new Card("spades", "queen"),
    new Card("spades", "king"),
    new Card("spades", "ace"),
    new Card("hearts", 2),
    new Card("hearts", 3),
    new Card("hearts", 4),
    new Card("hearts", 5),
    new Card("hearts", 6),
    new Card("hearts", 7),
    new Card("hearts", 8),
    new Card("hearts", 9),
    new Card("hearts", 10),
    new Card("hearts", "jack"),
    new Card("hearts", "queen"),
    new Card("hearts", "king"),
    new Card("hearts", "ace"),
    new Card("diamonds", 2),
    new Card("diamonds", 3),
    new Card("diamonds", 4),
    new Card("diamonds", 5),
    new Card("diamonds", 6),
    new Card("diamonds", 7),
    new Card("diamonds", 8),
    new Card("diamonds", 9),
    new Card("diamonds", 10),
    new Card("diamonds", "jack"),
    new Card("diamonds", "queen"),
    new Card("diamonds", "king"),
    new Card("diamonds", "ace"),
  ];
  // Reset dealer and player hands
  // Dealer
  dealerHandCards = [];
  dealerHandValueArray = [];
  dealerHandTotal = 0;
  dealerScore.innerHTML = "";
  tableDealerSide.replaceChildren();
  // Player
  playerHandCards = [];
  playerHandValueArray = [];
  playerHandTotal = 0;
  playerScore.innerHTML = "";
  tablePlayerSide.replaceChildren();

  playerTurn = true;
  prompt.innerHTML = "Play again?";

  playButton.removeAttribute("disabled");
};

// Play / Reset buttons
playButton.addEventListener("click", () => {
  playGame();
  playButton.setAttribute("disabled", "disabled");
  stayButton.removeAttribute("disabled");
  hitButton.removeAttribute("disabled");
});
resetButton.addEventListener("click", resetGame);
