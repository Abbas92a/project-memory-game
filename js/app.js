/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const cards= document.querySelectorAll('.deck .card'); //output a NodeList
const cardsArr= [...cards]; //convert the NodeList to Array
const deck= document.querySelector('.deck');
const fragment= document.createDocumentFragment();
const restart= document.querySelector('.restart');
let shuffledCards= [];
let openCardsList= [];
let count= 0;
let targetEvent;
let firstCard;
let secondCard;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function shuffleDeck () {
  shuffledCards= shuffle(cardsArr);
  for (let i =0; i<shuffledCards.length; i++) {
    fragment.appendChild(shuffledCards[i]);
  }
  deck.appendChild(fragment);
}

function flipping (evt) {
  targetEvent= evt.target;
  //avoid opening more than 2 cards at the same time & make sure target is card that wasn't matched
  if (openCardsList.length <2 && !(targetEvent.classList.contains('match')) &&targetEvent.nodeName ==='LI' ) {
    let symbol= targetEvent.firstElementChild.classList[1]; //get the seconed class name
    targetEvent.classList.add('open');
    if (openCardsList.length ===0) { //targeting the first card
      firstCard= targetEvent;
    }
    secondCard= targetEvent;
    openCardsList.push(symbol); //store card symbol in array up to cards
    if (openCardsList.length ===2) {
      if (openCardsList[0] === openCardsList[1]) {
        matching();
      } else {
        unmatching();
      }
    }
  }
}

function matching () {
  firstCard.classList.add('match'); //first target
  firstCard.classList.remove('open');
  secondCard.classList.add('match'); //second target
  secondCard.classList.remove('open');
  count++; //count the matched cards
  openCardsList.splice(0,2); //reset the list
}

function unmatching () {
  firstCard.classList.add('unmatch');
  firstCard.classList.remove('open');
  secondCard.classList.add('unmatch');
  secondCard.classList.remove('open');

  setTimeout(function () {
    firstCard.classList.remove('unmatch');
    secondCard.classList.remove('unmatch');
    openCardsList.splice(0,2); //reset the list
  }, 750);
}

restart.addEventListener('click',shuffleDeck);
// shuffleDeck();
deck.addEventListener('click', flipping);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
