const express = require('express');
const router = express.Router();
const rxFirebase = require('rx-firebase');
const firebase = require('firebase');
const rx = require('rxjs');

var Resume = require('../../models/resume');
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
});

// get contact info
router.get('/contact', (req,res) => {
  "use strict";
  const contactInfo = firebase.database().ref('/resume/contact');

  contactInfo.once('value')
    .then (contact => {
      res.status(200).json(contact)
    });
});


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

});

// get summary
router.get('/summary', (req,res) => {
  "use strict";
  const contactInfo = firebase.database().ref('/resume/summary');

  contactInfo.once('value')
    .then (summary => {
      res.status(200).json(summary)
    });
});

router.post('/summary/', (req,res) => {
  "use strict";
  const summary = req.body.summary;
  let updates = {};
  updates['/resume/summary'] = summary;
  return firebase.database().ref().update(updates)
    .then ( contact => {
      res.status(200).json(contact)
    })

});


router.post('/experiences/', (req,res) => {
  "use strict";

  const postData = {
    companyName: "CNM",
    jobTitle: "Web developer II",
    yearsWorked: 3
  }

  const newPostKey = firebase.database().ref().child('resume/experiences').push().key;

  let updates = {};
  updates['/resume/experiences/' + newPostKey] = req.body;

  return firebase.database().ref().update(updates)
    .then( reply => {
      res.status(200).json(reply)
    })
});

router.patch('/experiences/', (req,res) => {
  "use strict";
  let key = req.body.key;
  let field = req.body.field;
  let value = req.body.value;

  let updates = {}
  updates[`/resume/experiences/${key}/${field}`] = value;
console.log(updates)
  return firebase.database().ref().update(updates)
    .then( reply => {
      res.status(200).json(reply);
    });
})

router.get('/experiences/', (req,res) => {
  "use strict";
  let ref = firebase.database().ref('/resume/experiences')
  ref.once('value')
    .then (experiences => {
      res.status(200).json(experiences)
    });

});

router.get('/resume_mongo/', (req,res) => {
  Resume.find()
    .exec( (err, resume) => {
      if(err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        })
      }
      res.status(200).json({
        message: 'Success',
        obj: resume
      })
  })
})
module.exports = router;
