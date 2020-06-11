const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
var originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const wpm = document.querySelector(".wpm");
  var ept = document.querySelector(".ept").innerHTML; // errors per test
let error_text = document.querySelector(".curr_errors");

let err = 0;

var min = 0,
  sec = 0,
  hun = 0,
  timer = 0;
var timerIsOn = false;


// I chose these sentences from a sentence generator online.
var sentences = ["The quick brown fox jumps over the lazy dog.",
  "He walked into the basement with the horror movie from the night before playing in his head.",
  "I shouldn't have put my laptop so close to the edge of the table.",
  "No problem. I wanted to remind you that my friend is getting married next week. You're still coming to the wedding with me, right?",
  "Oh thanks for inviting me. I'd love to come.",
  "Peter has been trying to find a new apartment for some time.",
  "I never imagined so many people would come to my book club.",
  "My dentist tells me that chewing bricks is very bad for your teeth.",
  "He quietly entered the museum as the super bowl started.",
  "Oh thanks for inviting me. I'd love to come.",
  "At last, the baby fell asleep.",
  "She can play the piano better than I can.",
  "When will your book be published?",
  "What you do makes a difference, and you have to decide what kind of difference you want to make.",
  "He is very serious about his career.",
  "That was an interesting documentary that we watched the other day.",
  "I informed you of what could potentially happen in the future didn't I?",
  "I dispensed the box that was in the basement."
                ]


function generatePracticeText() {  // there is an array of sentences, and RandomNum is used for the index of the array. This function chooses a random sentence from the sentence array.  
  function generate() {
    var randomNum = (Math.floor(Math.random() * sentences.length));
    return sentences[randomNum];
  }
  originText = document.getElementById("practice-sentence").innerHTML = generate();
}
window.onload = generatePracticeText();



// This is where the timer increments. And where we update the WordsPerMinute count.
function add() { 
  hun++;
  if (hun == 100) {
    hun = 0;
    sec++;
    if (sec == 60) {
      sec = 0;
      min++;
    }
  }
  theTimer.innerHTML = min + ':' + sec + ':' + hun;
  if (sec > 1)
    wpm.innerHTML = wordsPerMinute();
  else
  wpm.innerHTML = '0';
}

function startTimer() {   
  timerIsOn = true;
  timer = setInterval(add, 10);

}
// this function makes sure the typed text is the very same as the original text.
function isMatch() {
  var testText = originText.substring(0, testArea.value.length)
  if (testArea.value == testText) {
    return true;
  } else if (testArea.value != testText) {

    return false;
  } else
    return null;
}

function changeBorderColor() {  // we use this function to change the border color based on a corect or incorect input
  if (isMatch())
    testWrapper.style.borderColor = "blue";
  else if (!isMatch())
   { 
     error_text.textContent= err++;
     testWrapper.style.borderColor = "orange";
   }
     else
    console.log("error");
}


// Start the timer:
testArea.addEventListener("keypress", (event) => {
  if (!timerIsOn){
    startTimer();
  error_text.textContent= 0;
  }
})

// this is the start over button, it starts the game again
resetButton.onclick = function () {

  timerIsOn = false;                 // we put the timerIsOn to false because before clicking the Start over button, the timer was going on. 
  theTimer.innerHTML = "00:00:00";
  min = 0,
    sec = 0,
    hun = 0,
    clearInterval(timer)
  testArea.value = "";
  testWrapper.style.borderColor = "";
err = error_text.textContent= 0;
  generatePracticeText();
  wpm.innerHTML = 0;
}

function wordsPerMinute() {  // this function displays the words/min. it is used in the add() function.
  return (Math.ceil(testArea.value.split(' ').length / (min + (sec / 60))));
}

// function errorsPerTest() {  // this function calculates the number of errors for evry test we do.

   // this increments the errors per test.
  
 // return error_text.textContent= err++;
 
//   }

function isDone() {    // this function makes the timer equal to 0, and sets the border of the typing box to a blue-ish color.
 clearInterval(timer); 
  testWrapper.style.borderColor = "teal";
}
 
// This changes the border color based on wether the typed text maches the original text or not. 
testArea.addEventListener("keyup", (event) => {
  changeBorderColor();
  if (testArea.value == originText)
    isDone();
})  