const express = require('express');
const router = express.Router();
const rxFirebase = require('rx-firebase');
const firebase = require('firebase');
const rx = require('rxjs');

// axios makes http request
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

const firebaseConfig = {
  apiKey: "AIzaSyAx0Wo5qiYzps_kReaCLr4AzlhYLFvK-MU",
  authDomain: "gene-higgins.firebaseapp.com",
  databaseURL: "https://gene-higgins.firebaseio.com",
  projectId: "gene-higgins",
  storageBucket: "gene-higgins.appspot.com",
  messagingSenderId: "557188003562"
};

firebase.initializeApp(firebaseConfig);

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

// get contact info
router.get('/contact', (req,res) => {
  "use strict";
  const contactInfo = firebase.database().ref('/resume/contact')
    .once('value').then( data => {
      res.status(200).json(data);
      //snapshot.map( x => x.json());
    })
    .catch(error => {
      res.status(500).send(error);
    })
  ;
})

module.exports = router;
