const express = require('express');
const router = express.Router();
const rxFirebase = require('rx-firebase');
const firebase = require('firebase');
const rx = require('rxjs');
// const bodyParser = require('body-parser');
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

rxFirebase.extend(firebase, rx.Observable);
let subject = new rx.Subject();

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
  const contactInfo = firebase.database().ref('/resume/contact');

  contactInfo.once('value')
    .then (contact => {
      res.status(200).json(contact)
    });
})


router.post('/contact/', (req,res) => {
  "use strict";
  const _field = req.body.field;
  const _value = req.body.value;

  let postData = {};
  postData[_field] = _value;

  let updates = {};
  updates['/resume/contact/' + _field] = _value;
  return firebase.database().ref().update(updates)
    .then ( contact => {
      res.status(200).json(contact)
    })

})

// get summary
router.get('/summary', (req,res) => {
  "use strict";
  const contactInfo = firebase.database().ref('/resume/summary');

  contactInfo.once('value')
    .then (summary => {
      res.status(200).json(summary)
    });
})

router.post('/summary/', (req,res) => {
  "use strict";
  const summary = req.body.summary;

  let postData = {};
  postData['summary'] = summary;

  let updates = {};
  updates['/resume/summary'] = postData;
  return firebase.database().ref().update(updates)
    .then ( contact => {
      res.status(200).json(contact)
    })

})

module.exports = router;
