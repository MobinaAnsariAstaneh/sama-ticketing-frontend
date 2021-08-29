import "./multiply.css";

const Multiply = () => {
  var playing = false;
  var score;
  var action;
  var timeremaining;
  var correctAnswer;
  //if we click on the start/reset
  document.getElementById("startresetBox").onclick = function () {
    //if we are playing
    if (playing == true) {
      location.reload(); //reload page
    } else {
      //if we are not playing
      //change mode to playing
      playing = true;
      //set score to 0
      score = 0;
      document.getElementById("scorevalue").innerHTML = score;
      //show countdown box
      show("timeremainingBox");
      timeremaining = 60;
      document.getElementById("timeremainingvalue").innerHTML = timeremaining;
      //hide game over box
      hide("gameOverBox");
      //change button to reset
      document.getElementById("startresetBox").innerHTML = "Reset Game";
      //start countdown
      startCountdown();
      //generate a new Q&A
      generateQA();
    }
  };
  var i;
  //Clicking on an answer box
  for (i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function () {
      //check if we are playing
      if (playing == true) {
        //yes
        if (this.innerHTML == correctAnswer) {
          //correct answer
          //increase score by 1
          score++;
          document.getElementById("scorevalue").innerHTML = score;
          //hide wrong box and show correct box
          hide("wrongBox");
          show("correctBox");
          setTimeout(function () {
            hide("correctBox");
          }, 1000);
          //Generate new Q&A
          generateQA();
        } else {
          //wrong answer
          hide("correctBox");
          show("wrongBox");
          setTimeout(function () {
            hide("wrongBox");
          }, 1000);
        }
      }
    };
  }

  function startCountdown() {
    action = setInterval(function () {
      timeremaining -= 1;
      document.getElementById("timeremainingvalue").innerHTML = timeremaining;
      if (timeremaining == 0) {
        stopCountdown();
        show("gameOverBox");
        document.getElementById("gameOverBox").innerHTML =
          "<p>Game over!</p><p>Your score is " + score + ".</p>";
        hide("timeremainingBox");
        hide("correctBox");
        hide("wrongBox");
        playing = false;
        document.getElementById("startresetBox").innerHTML = "Start Game";
      }
    }, 1000);
  }

  //stop counter
  function stopCountdown() {
    clearInterval(action);
  }
  //hide an element
  function hide(Id) {
    document.getElementById(Id).style.display = "none";
  }
  //show an element
  function show(Id) {
    document.getElementById(Id).style.display = "block";
  }
  //generate question and multiple answers
  function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById("questionBox").innerHTML = x + " x " + y;
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer
    //fill other boxes with wrong answers
    var answers = [correctAnswer];
    for (i = 1; i < 5; i++) {
      if (i != correctPosition) {
        var wrongAnswer;
        do {
          wrongAnswer =
            (1 + Math.round(9 * Math.random())) *
            (1 + Math.round(9 * Math.random())); //a wrong answer
        } while (answers.indexOf(wrongAnswer) > -1);
        document.getElementById("box" + i).innerHTML = wrongAnswer;
        answers.push(wrongAnswer);
      }
    }
  }
  return (
    <div>
      <h1>SAMA Mathematics Game</h1>
      <div id="mainBox">
        {/* <!--Show Score--> */}
        <div id="scoreBox">
          Your Score : <span id="scorevalue"></span>
        </div>
        {/* <!--Show Correct--> */}
        <div id="correctBox">Correct</div>
        {/* <!--Show wrong--> */}
        <div id="wrongBox">Try again</div>
        {/* <!--Question box--> */}
        <div id="questionBox"> </div>
        {/* <!--Instruction box--> */}
        <div id="instructionBox">Click on the correct answer</div>
        {/* <!--Choice box--> */}
        <div id="choiceBox">
          <div id="box1" className="box"></div>
          <div id="box2" className="box"></div>
          <div id="box3" className="box"></div>
          <div id="box4" className="box"></div>
        </div>
        {/* <!--Start-Reset box--> */}
        <div id="startresetBox">Start Game</div>
        {/* <!--Time remaining box--> */}
        <div id="timeremainingBox">
          Time remaining : <span id="timeremainingvalue"></span> Sec
        </div>
        {/* <!--Game Over Box--> */}
        <div id="gameOverBox"></div>
      </div>
    </div>
  );
};

export default Multiply;
