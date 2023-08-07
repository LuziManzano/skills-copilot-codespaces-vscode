// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto'); // randomBytes is a function
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

// Get all comments
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Create a new comment
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex'); // generate random ID
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content });

    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
    console.log('Listening on 4001');
});