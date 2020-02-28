const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin');

admin.initializeApp();

exports.getCollections = functions.https.onCall(async (data, context) => {

    const collections = await admin.firestore().listCollections();
    const collectionIds = collections.map(col => col.id);

    return { collections: collectionIds };

});