// Create web server using express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up comments.json file
const commentsPath = path.join(__dirname, 'comments.json');
let comments = [];
if (fs.existsSync(commentsPath)) {
  comments = JSON.parse(fs.readFileSync(commentsPath, 'utf8'));
}

// Get comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Add comment
app.post('/comments', (req, res) => {
  const { text } = req.body;
  const newComment = {
    id: uuidv4(),
    text,
  };
  comments.push(newComment);
  fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2), 'utf8');
  res.json(newComment);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
