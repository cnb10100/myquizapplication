const startBtn = document.getElementById("srt-btn");
const nextBtn = document.getElementById("nxt-btn");
const questionContainerEl = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answerBtnsEl = document.getElementById("answer-btns");


let shuffledQ;
let currentQI;

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
  currentQI++;
  nextQuestion();
});

function startQuiz() {
  startBtn.classList.add("hide");
  shuffledQ = myQuestions.sort(() => Math.random() - 0.5);
  currentQI = 0;
  questionContainerEl.classList.remove("hide");
  nextQuestion();
}

function nextQuestion() {
  resetQuestions();
  revealQuestion(shuffledQ[currentQI]);
}

function revealQuestion(question) {
  questionEl.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.right) {
      button.dataset.right = answer.right;
    }
    button.addEventListener("click", userAnswer);
    answerBtnsEl.appendChild(button);
  });
}

function resetQuestions() {
  clearStatusClass(document.body);
  nextBtn.classList.add("hide");
  while (answerBtnsEl.firstChild) {
    answerBtnsEl.removeChild(answerBtnsEl.firstChild);
  }
}

function userAnswer(event) {
  const clickedBtn = event.target;
  const right = clickedBtn.dataset.right;
  setStatusClass(document.body, right);
  Array.from(answerBtnsEl.children).forEach((button) => {
    setStatusClass(button, button.dataset.right);
  });
  if (shuffledQ.length > currentQI + 1) {
    nextBtn.classList.remove("hide");
  } else {
    startBtn.innerText = "Restart";
    startBtn.classList.remove("hide");
  }
}
function setStatusClass(element, right) {
  clearStatusClass(element);
  if (right) {
    element.classList.add("right");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("right");
  element.classList.remove("wrong");
}

const myQuestions = [
  {
    question: "What Was the Largest Contiguous Empire in History?",
    answers: [
      { text: "Mongol Empire", right: true },
      { text: "Roman Empire", right: false },
      { text: "Ottoman Empire", right: false },
      { text: "The British Empire", right: false },
    ],
  },
  {
    question: "What Does the D in D-Day Stand For?",
    answers: [
      { text: "Doom", right: false },
      { text: "Deliverance", right: false },
      { text: "Damnation", right: false },
      { text: "Doesn't stand for anything", right: true },
    ],
  },
  {
    question: "Who Invented The Automobile",
    answers: [
      { text: "Karl Benz", right: false },
      { text: "Henry Ford", right: false },
      { text: "Nicolas-Joseph Cugnot", right: true },
      { text: "Ferdinand Porsche", right: false },
    ],
  },
  {
    question: "When Was the Declaration of Independence Signed?",
    answers: [
      { text: "July 2, 1776", right: false },
      { text: "July 4, 1776", right: false },
      { text: "July 4, 1812", right: false },
      { text: "August 2, 1776", right: true },
    ],
  },
];
