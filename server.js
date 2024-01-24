const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', (req, res) => {
  const answers = req.body.answers;
  saveAnswersToFile(answers);

  res.send('Answers submitted successfully!');
});

function saveAnswersToFile(answers) {
  const answersString = JSON.stringify(answers);
  fs.writeFileSync('answers.txt', answersString);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
