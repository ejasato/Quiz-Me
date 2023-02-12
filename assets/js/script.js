//references for DOM elements
var HighscoresBtn = document.querySelector("#Highscores-Btn");
var Timer = document.querySelector("#Timer");
var HighScore = document.querySelector("#Highscores");
var Initials = document.querySelector("#initials");
var StartQuiz = document.querySelector("#Start-Quiz");
var Start = document.querySelector("#Start");
var questionsCard = document.querySelector("#questionsCard");
var questions = document.querySelector("#questions");
var answerSelection = document.querySelector("#answerSelection");
var questionSelection = document.querySelector("#questionSelection");
var qs1 = document.querySelector("#qs1");
var qs2 = document.querySelector("#qs2");
var qs3 = document.querySelector("#qs3");
var qs4 = document.querySelector("#qs4");
var endScreen = document.querySelector("#endScreen");
var finalScore = document.querySelector("#final-score");
var submitBtn = document.querySelector("#submitBtn");
var HighscoresCard = document.querySelector("#HighscoresCard");
var clearHighscoreBtn = document.querySelector("#clearHighscore");
var HighScoreEl = document.createElement("div");
var newDiv = document.createElement("div");
var newLabel = document.createElement("label");

//variables to start quiz and keep track of the quiz
var i = 0;
var score = 0;
var timeLeft = 75;
var scoreList =[];
var timeInterval;

//countdown timer
function countdown(){
    var timeInterval = setInterval(function(){
        if (timeLeft > 1){
            Timer.textContent = 'Time:' + timeLeft;
            timeLeft--;
        }else{
            //once the time is up it will auto go to final screen
            Timer.textContent = 'Time: 0';
            clearInterval(timeInterval);
            finalScreen();
        }
    }, 1000);
}

//starts quiz and goes through the questionscript changing the answer selection based on the question it currently is on
function startQuiz(){

    if(i<questionList.length){
        questions.textContent = questionList[i].question;
        qs1.textContent = questionList[i].answerSelection[0];
        qs2.textContent = questionList[i].answerSelection[1];
        qs3.textContent = questionList[i].answerSelection[2];
        qs4.textContent = questionList[i].answerSelection[3];
    }else{
    finalScreen();
    }
}

//checks whether or not the answer selected is right by referencing answer and ends the quiz if the last question has been answered and scores by showing how much time left
function answerSel(event){
    if (i>=questionList.length){
        finalScreen();
        clearInterval(timeInterval);
    // checking the answer to what the person picked in the event 
    } else{
        if (event === questionList[i].answer){
            questionFeedback.textContent = "Correct!";
        } else{
            timeLeft-= 10;
            questionFeedback.textContent = "wrong!";
        }
        score = timeLeft;
        i++;
        startQuiz();
    }
}

//pulls up the final screen by adding or removing specific parts of html and adds the score
function finalScreen(){
    finalScore.innHTML = score;
    finalScore.style.display = "inline-block";
    questionsCard.classList.add("hide");
    endScreen.classList.remove("hide");
    Timer.classList.add("hide");
    HighscoresBtn.classList.add("hide");
    Highscores();
}

//shows the highscore screen
function Highscores(scoreList){
    scoreList.sort((a, b) => {
        return b.score - a.score;
    });
    topTen = scoreList.slice(0, 9);
    for (var j = 0; j < topTen.length;j++){
        var player = topTen[j].player;
        var score = topTen[j].score;
        HighScoreEl.appendChild(newDiv);
        newLabel.textContent = player + " : " + score;
        newDiv.appendChild(newLabel);
    }
}

//when button for add to highscore is pressed adds the initials to the highscore screen
function addToHighscores() {
    var playerInitials = Initials.value.trim();
    var newScore = {
        player: playerInitials,
        score: score,
    };
    scoreList.push(newScore);
    HighScore.appendChild(HighScoreEl);
    HighScoreEl.setAttribute("id", "playerInitials");
}

//event listener for starting the quiz
StartQuiz.addEventListener("click", function(){
    countdown();
    Start.classList.add("hide");
    questionsCard.classList.remove("hide");
    startQuiz();
});

//event listener for what happens when pushing a answer to a question
answerSelection.addEventListener("click", function(event){
    var event = event.target;
    answerSel(event.textContent.trim());
})

//event listener to save score
submitBtn.addEventListener("click", function(){
    localStorage.setItem("highscore", JSON.stringify(scoreList));
    addToHighscores();
    Highscores(scoreList);
    endScreen.classList.add("hide");
    HighscoresCard.classList.remove("hide");
});

//event listener to show highscore
HighscoresBtn.addEventListener("click", function(){
    HighscoresCard.classList.remove("hide");
    HighscoresBtn.classList.add("hide");
    Start.classList.add("hide");
    leaderBoard();
});

//event listener to start the quiz over not working correctly keep the saved score from previous time
playAgain.addEventListener("click", function(){
    // location.reload();
    countdown();
    Start.classList.add("hide");
    questionsCard.classList.remove("hide");
    startQuiz();
});

//event listener to clear all the highscores
clearHighscoreBtn.addEventListener("click", function(){
    var scoreList = [];
    Highscores(scoreList);
});