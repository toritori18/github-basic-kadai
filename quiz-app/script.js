const quizData = [
  {
    question: '日本で最も高い山はどれですか？',
    choices: ['槍ヶ岳', '北岳', '富士山', '白山'],
    correctIndex: 2,
  },
  {
    question: '元素記号「Au」が表す金属はどれですか？',
    choices: ['銀', '鉄', '銅', '金'],
    correctIndex: 3,
  },
  {
    question: '世界で最も面積が大きい国はどれですか？',
    choices: ['アメリカ', 'カナダ', 'ロシア', '中国'],
    correctIndex: 2,
  },
  {
    question: '俳句の音節（拍）の構成として正しいものはどれですか？',
    choices: ['5・7・5', '7・5・7', '5・5・7', '7・7・5'],
    correctIndex: 0,
  },
  {
    question: '光の三原色として正しい組み合わせはどれですか？',
    choices: [
      '赤・黄・青',
      '赤・緑・青',
      '赤・橙・紫',
      '黄・緑・紫',
    ],
    correctIndex: 1,
  },
];

let currentIndex = 0;
let score = 0;
let answered = false;

const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const progressBar = document.getElementById('progress-bar');
const questionCount = document.getElementById('question-count');
const questionText = document.getElementById('question-text');
const choicesEl = document.getElementById('choices');
const feedbackEl = document.getElementById('feedback');
const feedbackIcon = document.getElementById('feedback-icon');
const feedbackMessage = document.getElementById('feedback-message');
const btnNext = document.getElementById('btn-next');
const resultScore = document.getElementById('result-score');
const resultComment = document.getElementById('result-comment');
const btnRetry = document.getElementById('btn-retry');

function loadQuestion() {
  answered = false;
  const data = quizData[currentIndex];
  const total = quizData.length;

  progressBar.style.width = `${((currentIndex) / total) * 100}%`;
  questionCount.textContent = `問題 ${currentIndex + 1} / ${total}`;
  questionText.textContent = data.question;

  choicesEl.innerHTML = '';
  data.choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => handleAnswer(i));
    choicesEl.appendChild(btn);
  });

  feedbackEl.hidden = true;
  feedbackEl.className = 'feedback';
  btnNext.hidden = true;
}

function handleAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const data = quizData[currentIndex];
  const buttons = choicesEl.querySelectorAll('.choice-btn');

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === data.correctIndex) {
      btn.classList.add('correct');
    } else if (i === selectedIndex) {
      btn.classList.add('incorrect');
    }
  });

  const isCorrect = selectedIndex === data.correctIndex;
  if (isCorrect) {
    score++;
    feedbackEl.className = 'feedback correct';
    feedbackIcon.textContent = '⭕';
    feedbackMessage.textContent = '正解です！';
  } else {
    feedbackEl.className = 'feedback incorrect';
    feedbackIcon.textContent = '❌';
    feedbackMessage.textContent = `不正解。正解は「${data.choices[data.correctIndex]}」です。`;
  }

  feedbackEl.hidden = false;

  const isLast = currentIndex === quizData.length - 1;
  btnNext.textContent = isLast ? '結果を見る' : '次の問題へ';
  btnNext.hidden = false;
}

function showResult() {
  progressBar.style.width = '100%';
  quizScreen.hidden = true;
  resultScreen.hidden = false;

  const total = quizData.length;
  resultScore.textContent = `${total}問中 ${score}問 正解`;

  if (score === total) {
    resultComment.textContent = '全問正解！素晴らしい知識です！';
  } else if (score >= total * 0.8) {
    resultComment.textContent = 'とても優秀です！あと少しで満点！';
  } else if (score >= total * 0.6) {
    resultComment.textContent = 'まずまずの結果です。もう一度チャレンジしてみましょう！';
  } else {
    resultComment.textContent = '復習してもう一度挑戦してみましょう！';
  }
}

btnNext.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

btnRetry.addEventListener('click', () => {
  currentIndex = 0;
  score = 0;
  resultScreen.hidden = true;
  quizScreen.hidden = false;
  loadQuestion();
});

loadQuestion();
