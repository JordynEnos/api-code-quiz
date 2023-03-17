// Quiz questions
const quizQuestions = [
    {
      question: "What is JavaScript?",
      choices: [
        "A programming language",
        "A markup language",
        "A style sheet language",
        "A database management system"
      ],
      answer: "A programming language"
    },
    {
      question: "What is the syntax for a single-line comment in JavaScript?",
      choices: [
        "// This is a comment",
        "<!-- This is a comment -->",
        "/* This is a comment */",
        "# This is a comment"
      ],
      answer: "// This is a comment"
    },
    {
      question: "What is the output of the following code?\nconsole.log(2 + 2 * 3);",
      choices: [
        "8",
        "10",
        "12",
        "14"
      ],
      answer: "8"
    },
    {
      question: "What is the correct way to declare a variable in JavaScript?",
      choices: [
        "let x = 5;",
        "const y = 10;",
        "var z = 15;",
        "All of the above"
      ],
      answer: "All of the above"
    },
    {
      question: "What is the purpose of the 'this' keyword in JavaScript?",
      choices: [
        "To refer to the current object",
        "To create a new object",
        "To refer to the parent object",
        "To refer to the global object"
      ],
      answer: "To refer to the current object"
    }
  ];
  
  // HTML elements
  const startBtn = document.getElementById("start-btn");
  const startScreen = document.getElementById("start-screen");
  const quizScreen = document.getElementById("quiz-screen");
  const gameOverScreen = document.getElementById("game-over-screen");
  const questionEl = document.getElementById("question");
  const choicesEl = document.getElementById("choices");
  const timerEl = document.getElementById("timer");
  const submitScoreBtn = document.getElementById("submit-score");
  const initialsInput = document.getElementById("initials");
  
  //Dom elements
  const scoreInput = document.getElementById("score");
  const scoresList = document.getElementById("scores-list");
  const highScoresSection = document.getElementById("high-scores");
  
  // Quiz state
  let currentQuestion = 0;
  let timeLeft = 60;
  let correctAnswers = 0;
  
  // Event listeners
  startBtn.addEventListener("click", startQuiz);
  choicesEl.addEventListener("click", handleChoiceClick);
  //submitScoreBtn.addEventListener("click", saveScore);
  
  
  // Functions
  function startQuiz() {
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    showQuestion();
    startTimer();
  }
  
  // Function to start the timer
  function startTimer() {
  setTimeout(updateTime, 1000)
  }
  
  function updateTime() {
  timeLeft = timeLeft - 1;
  updateTimer(timeLeft)
  if(timeLeft > 0) {
    startTimer()
  } else {
    endQuiz();
  }
  }
  
  function updateTimer(currentTime) {
  timerEl.innerText = "Time: " + currentTime;
  }
  
  function endQuiz() {
  gameOverScreen.classList.remove("hidden");
  quizScreen.classList.add("hidden")
  }
  
  function showQuestion() {
    const question = quizQuestions[currentQuestion];
    questionEl.textContent = question.question;
    choicesEl.innerHTML = "";
  
    for (let i = 0; i < question.choices.length; i++) {
      const choice = question.choices[i];
      const liEl = document.createElement("li");
      const buttonEl = document.createElement("button");
      buttonEl.classList.add("choice");
      buttonEl.textContent = choice;
      liEl.appendChild(buttonEl);
      choicesEl.appendChild(liEl);
    }
  }
  
  //choices incorrect or correct? 
  $.each(quizQuestions, function(index, question) {
    $.each(question.choices, function(index, choice) {
      var className = choice.isCorrect ? "correct" : "incorrect";
      var choiceElement = $("<div>").addClass("choice " + className).text(choice.text);
      // Append the choiceElement to the DOM for this question
    });
  });
  
  function handleChoiceClick(event) {
    if (!event.target.matches(".choice")) return;
    const selectedAnswer = event.target.textContent;
    const question = quizQuestions[currentQuestion];
    if (selectedAnswer === question.answer) {
      event.target.classList.add("correct");
    } else {
      event.target.classList.add("incorrect");
      timeLeft -= 10;
      if (timeLeft < 0) timeLeft = 0;
      updateTimer();
      alert("Incorrect! 10 seconds have been deducted from your time.");
    }
    currentQuestion++;
    if (currentQuestion >= quizQuestions.length) {
      endQuiz();
    } else {
      showQuestion();
    }
  }
  
  // Initialize scores array
  let scores = [];
  
  // Listen for form submission event
  gameOverScreen.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting and refreshing the page
    
    // Get user input
    const initials = initialsInput.value;
    const score = scoreInput.value;
    
    // Add score to array
    scores.push({ initials, score });
    
    // Sort scores in descending order
    scores.sort((a, b) => b.score - a.score);
    
    // Clear scores list
    scoresList.innerHTML = "";
    
    // Show high scores section
    highScoresSection.classList.remove("hidden");
    
    // Add each score to the list
    scores.forEach(function(score) {
      const listItem = document.createElement("li");
      listItem.textContent = `${score.initials}: ${score.score}`;
      scoresList.appendChild(listItem);
    });
  });