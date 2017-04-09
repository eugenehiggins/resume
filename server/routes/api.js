const express = require('express');
const router = express.Router();

// axios makes http request
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com'

// GET api listing
router.get('/', (req,res) => {
  "use strict";
  res.send('api works');
});

// get all posts
router.get('/posts', (req,res) => {
  "use strict";
  axios.get(`${API}/posts`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

module.exports = router;
