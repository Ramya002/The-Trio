const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'The first Cow hospital of the North East India has been inaugurated in which state?',
    answers: [
      { text: 'Meghalaya', correct: false },
      { text: 'Assam', correct: true},
      { text: 'Nagaland', correct: false},
      {text: 'Manipur', correct: false}
    ]
  },
  {
    question: '‘Dragon Fruit’, which was making news recently, is native to which region?',
    answers: [
      { text: 'America', correct: true },
      { text: 'Europe', correct: false },
      { text: 'Australia', correct: false },
      { text: 'Asia', correct: false }
    ]
  },
  {
    question: 'What is the name of India’s initiative to deliver Covid-19 vaccines to friendly countries?',
    answers: [
      { text: 'Vaccine Maitri', correct: true },
      { text: 'Vaccine to Mitron', correct: false },
      { text: 'Bharat Vaccine Mitra', correct: false },
      { text: 'India contributes', correct: false }
    ]
  },
  {
    question: 'Which Indian state has been invited to participate in a FAO conference of the UN?',
    answers: [
      { text: 'Tamil Nadu', correct: false },
      { text: 'Telangana', correct: true },
      { text: 'Maharashtra', correct: false },
      { text: 'Assam', correct: false }
    ]
  }
]
