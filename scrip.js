let userName = null;

function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval();
      alert("Time's up!");
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
  var timer = 60 * 1; // 15 minutes in seconds
  var display = document.getElementById('timerContainer');
  startTimer(timer, display);
  });

function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function showConfirmation() {
  document.getElementById("myModal").style.display = "block";
}

function confirmSubmission() {
  const answers = parseQuizForm();
  const data = { answers };

  fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      document.getElementById("quizForm").style.display = "none";
      window.location.href = "last.html";
      document.getElementById("myModal").style.display = "none";
    })
    .catch(error => console.error('Error:', error));
}

function parseQuizForm() {
  const answers = {};

  for (let i = 1; i <= 5; i++) {
    const questionNumber = "q" + i;
    const options = document.getElementsByName(questionNumber);

    for (const option of options) {
      if (option.checked) {
        answers[questionNumber] = option.value;
        break;
      }
    }
  }

  return answers;
}

function goBack() {
  document.getElementById("myModal").style.display = "none";
}
