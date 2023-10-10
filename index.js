let cards = [
  { img: "image1.jpg", sound: "sound1.mp3", isRevealed: false },
  { img: "image2.jpg", sound: "sound2.mp3", isRevealed: false },
  { img: "image3.jpg", sound: "sound3.mp3", isRevealed: false },
  { img: "image4.jpg", sound: "sound4.mp3", isRevealed: false },
  { img: "image5.jpg", sound: "sound5.mp3", isRevealed: false },
  { img: "image6.jpg", sound: "sound6.mp3", isRevealed: false },
  { img: "image7.jpg", sound: "sound7.mp3", isRevealed: false },
  { img: "image8.jpg", sound: "sound8.mp3", isRevealed: false },
  { img: "image1.jpg", sound: "sound1.mp3", isRevealed: false },
  { img: "image2.jpg", sound: "sound2.mp3", isRevealed: false },
  { img: "image3.jpg", sound: "sound3.mp3", isRevealed: false },
  { img: "image4.jpg", sound: "sound4.mp3", isRevealed: false },
  { img: "image5.jpg", sound: "sound5.mp3", isRevealed: false },
  { img: "image6.jpg", sound: "sound6.mp3", isRevealed: false },
  { img: "image7.jpg", sound: "sound7.mp3", isRevealed: false },
  { img: "image8.jpg", sound: "sound8.mp3", isRevealed: false },
];

let revealedCards = [];
let matchedCards = 0;
let gameEnded = false;
let mistakes = 10;
let startTime;
let timerInterval;
let elapsedTime = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(cards);

function revealCard(index) {
  if (!gameEnded && revealedCards.length < 2 && !cards[index].isRevealed) {
    if (revealedCards.length === 0) {
      startTimer();
    }

    cards[index].isRevealed = true;
    revealedCards.push(index);
    document.getElementsByClassName("card")[index].classList.add("flip");
    document.getElementsByClassName("card")[
      index
    ].style.backgroundImage = `url(${cards[index].img})`;

    let audio = new Audio(cards[index].sound);
    audio.play();

    if (revealedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function startTimer() {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 10);
  }
}

function updateTimer() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  document.getElementById("timer").textContent = `Time: ${minutes}:${padZero(
    seconds
  )}:${padZero(milliseconds)}`;
}

function padZero(num) {
  return num.toString().padStart(2, "0");
}

function showLoseMessage() {
  let resultElement = document.getElementById("result");
  resultElement.getElementsByTagName("h1")[0].textContent =
    "Hell nah you bad bruv, wanna try again?";
  resultElement.classList.remove("hidden");
  resultElement.getElementsByTagName("button")[0].classList.remove("hidden");
  gameEnded = true;

  let loseSound = new Audio("loseSound.mp3");
  loseSound.play();

  let cardsElements = document.getElementsByClassName("card");
  for (let i = 0; i < cardsElements.length; i++) {
    cardsElements[i].classList.add("hidden");
  }
}

function checkMatch() {
  let card1 = revealedCards[0];
  let card2 = revealedCards[1];

  if (cards[card1].img === cards[card2].img && card1 !== card2) {
    document.getElementsByClassName("card")[card1].style.visibility = "hidden";
    document.getElementsByClassName("card")[card2].style.visibility = "hidden";
    matchedCards += 2;

    if (matchedCards === cards.length) {
      showWinMessage();
    }
  } else {
    setTimeout(function () {
      hideCards(card1, card2);
      mistakes--;
      if (mistakes === 0) {
        showLoseMessage();
      } else {
        document.getElementById("mistakes").textContent =
          "Mistakes allowed left: " + mistakes;
      }
    }, 1000);
  }

  revealedCards = [];
}

function showWinMessage() {
  let resultElement = document.getElementById("result");
  resultElement.classList.remove("hidden");
  resultElement.getElementsByTagName("h1")[0].classList.add("animated-text");
  gameEnded = true;

  let winSound = new Audio("winSound.mp3");
  winSound.play();

  setTimeout(function () {
    resultElement.getElementsByTagName("h1")[0].classList.add("hidden");
    showPlayAgainButton();
  }, 5000);
}

function showPlayAgainButton() {
  let playAgainButton = document.getElementById("play-again");
  playAgainButton.classList.remove("hidden");
}

function hideCards(card1, card2) {
  cards[card1].isRevealed = false;
  cards[card2].isRevealed = false;

  let cardElements = document.getElementsByClassName("card");
  if (cards[card1].img === cards[card2].img && card1 !== card2) {
    setTimeout(function () {
      cardElements[card1].remove();
      cardElements[card2].remove();
      matchedCards += 2;

      if (matchedCards === cards.length) {
        showWinMessage();
      }
    }, 1000);
  } else {
    cardElements[card1].classList.remove("flip");
    cardElements[card2].classList.remove("flip");

    cardElements[card1].style.backgroundImage = "url('backgroundImage.jpg')";
    cardElements[card2].style.backgroundImage = "url('backgroundImage.jpg')";

    revealedCards = [];
  }
}

function resetGame() {
  location.reload();
}

document.getElementById("mistakes").textContent =
  "Mistakes allowed left: " + mistakes;
