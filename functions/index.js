const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('/Users/kellydevries/Desktop/rref/.secret/rref-354a14bdd6fa.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://rref-ad1cb.firebaseio.com',
});

const express = require('express');
const app = express();

app.get('/posts', (
  req,
  res, // (name of route, handler)
) =>
  admin
    .firestore()
    .collection('posts')
    .get()
    .then(data => {
      let posts = [];
      data.forEach(doc => {
        posts.push(doc.data());
      });
      return res.json(posts);
    })
    .catch(err => console.error(err)),
);

app.post('/post', (req, res) => {
  const newPost = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
  };
  admin
    .firestore()
    .collection('posts')
    .add(newPost)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong' });
      console.error(err);
    });
});

//  have endpoint with baseurl, we want a prefix and we need to tell firebase that we're using app

exports.api = functions.https.onRequest(app); // pass on app and it will automatically turn into multiple routes
