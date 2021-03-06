require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
// const db = require('../cassandra/query');
const db = require('../postgres/query.js');

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/(:id)', express.static(path.join(__dirname, '../public')));

app.get('/api/booking/:id', (req, res) => {
  return db.getListingById(req.params.id)
    .then((listing) => {
      res.status(200).send(listing);
    })
    .catch(() => {
      res.status(500).send('Error retrieving listing in database');
    });
});

app.get('/assets/airbnb_rating_star.png', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/assets/airbnb_rating_star.png'));
});

app.listen(port);
console.log('Listening on port ', port);
