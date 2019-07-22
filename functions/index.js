const functions = require("firebase-functions");

// const functions = require("firebase-functions");
const LINKS_PER_PAGE = 5;

const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://news-hooks.firebaseio.com"
});
const db = admin.firestore();

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from firebase");
});

exports.linksPagination = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  let linksRef = db.collection("links");
  const offset = Number(request.query.offset)
    .orderBy("created", "desc")
    .limit(LINKS_PER_PAGE)
    .offset(offset)
    .get()
    .then(snapshot => {
      const links = snapshot.docs.map(doc => {
        let obj = Object.assign(doc.data());
        return Object.assign({}, { id: doc.id }, obj);
      });
      response.json(links);
    });
});
