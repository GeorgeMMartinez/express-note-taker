// dependencies/node packages
const express = require('express');
const fs = require('fs');
const path = require('path');
const { uid } = require('uid');

const newData = require('./db/db.json');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(join(__dirname, 'public', 'index.html')));

app.get('/notes', (req, res) => res.sendFile(join(__dirname, 'public', 'notes.html')));

app.get('/api/notes', (req, res) => res.json(newData));

app.post('/api/notes', (req, res) {
  let addNewNote = {
    title: req.body.title,
    text: req.body.text,
    id: uid(),
  }
  newData.push(addNewNote)
  fs.writeFile(join(__dirname, 'db', 'db.json'), JSON.stringify(newData), err => {
    if (err) { console.log(err) }
    res.json(addNewNote)
  })
})

app.listen(process.env.PORT || 3001);