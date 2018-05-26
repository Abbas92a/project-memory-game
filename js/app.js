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
const button= document.querySelector('button');
let shuffledCards= [];
let openCardsList= [];
let count= 0;
let targetEvent;
let firstCard=0;
let secondCar=0;
let moves= 0;
let startTime= Date.now();

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
  if (openCardsList.length <2 && !(targetEvent.classList.contains('match')) &&targetEvent.nodeName ==='LI' && targetEvent !== firstCard ) {
    let symbol= targetEvent.firstElementChild.classList[1]; //get the seconed class name
    moves++; //count number of moves
    starRating();
    movesCounter();
    targetEvent.classList.add('open');
    if (openCardsList.length ===0) { //targeting the first card
      firstCard= targetEvent;
    }
    secondCard= targetEvent;
    openCardsList.push(symbol); //store card symbol in array up to cards
    if (openCardsList.length ===2) {
      if (openCardsList[0] === openCardsList[1]) {
        count++; //count the matched cards
        matching();
      } else {
        unmatching();
      }
    }

    if (count === 8) {
      winningDisplay();
    }
  }
}

function matching () {
  firstCard.classList.add('match'); //first target
  firstCard.classList.remove('open');
  secondCard.classList.add('match'); //second target
  secondCard.classList.remove('open');
  openCardsList.splice(0,2); //reset the list
}

function unmatching () {
  firstCard.classList.add('unmatch');
  firstCard.classList.remove('open');
  secondCard.classList.add('unmatch');
  secondCard.classList.remove('open');

  setTimeout(function () {
    firstCard.classList.remove('unmatch'); //delay for unmatching animation
    secondCard.classList.remove('unmatch');
    openCardsList.splice(0,2); //reset the list
  }, 750);
}

function starRating () {
  const stars= document.querySelectorAll('.stars i');
  if (moves/2 === 6) {
    stars[2].classList.add('fa-star-o'); //shallow star
    stars[2].classList.remove('fa-star'); //solid star
  } else if (moves/2 === 12) {
      stars[1].classList.add('fa-star-o');
      stars[1].classList.remove('fa-star');
  }
}

function movesCounter () {
  const movesCount= document.querySelector('.score-panel .moves');
  let movesNum= moves/2;
  movesCount.innerHTML= Math.floor(movesNum) + " Moves";
}

function timer () { //show time elapsed
  let now= Date.now();
  let milliSecond= now - startTime;
  let hours= Math.floor(milliSecond / (1000 * 60 * 60));
  let minutes=  Math.floor(milliSecond % (1000 * 60 * 60) / (1000 * 60));
  let seconds= Math.floor(milliSecond % (1000 * 60) / (1000));
  let time= document.querySelector('#time');
  time.innerHTML= hours.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) +':'+ minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) +':'+ seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
}

function winningDisplay () {
  const winningPage= document.querySelector('.winning-page');
  const container= document.querySelector('.container');
  const movesDisplay= document.querySelector('.alignment-container p');
  const timeElapsed= document.querySelector('#time-Elapsed');
  const time= document.querySelector('#time');
  const starsNum= document.querySelectorAll('#star-Rating li');
  const stars= document.querySelector('ul.stars');
  winningPage.classList.remove('hide');
  container.classList.add('hideTotally');
  movesDisplay.innerHTML= 'With '+ Math.floor(moves/2) + ' Move';
  timeElapsed.innerHTML= time.innerHTML;

  if (moves/2 >= 6) {
    starsNum[2].classList.add('hide');
  }
  if (moves/2 >= 12) {
      starsNum[1].classList.add('hide');
  }

  function playAgain() {
    restarting();
    winningPage.classList.add('hide');
    container.classList.remove('hideTotally');
    console.log('I am here');
  }

  button.addEventListener('click',playAgain);
}

function restarting () {
  const stars= document.querySelectorAll('.stars i');
  openCardsList.splice(0,2);
  count= 0;
  moves= 0;
  startTime= Date.now();
  movesCounter();

  for(let i=0; i<16; i++) {
    cards[i].classList.remove('match');
  }

  for(let i=0; i<3; i++) {
    stars[i].classList.remove('fa-star-o');
    stars[i].classList.add('fa-star');
  }

  shuffleDeck();
}

setInterval(timer, 1000); //showing timer that count time every 1 second

shuffleDeck();
restart.addEventListener('click',restarting);
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
