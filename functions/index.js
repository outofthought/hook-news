const functions = require("firebase-functions");
const LINKS_PER_PAGE = 5;

const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://news-links-hooks.firebaseio.com"
});
const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
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
        //return { id: doc.id, ...doc.data() };
      });
      response.json(links);
    });
});
