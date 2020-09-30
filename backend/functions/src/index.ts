// import * as express from "express";
// import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

// Start writing Firebase Functions
// https://github.com/firebase/functions-samples
// https://firebase.google.com/docs/functions/typescript

// const app = express();

// Automatically allow cross-origin requests
// app.use(cors({ origin: true }));

// Add middleware to authenticate requests
// app.use(myMiddleware);

export const test = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from backend!");
});

/**
 * When a user is created, create a User Profile object for them.
 *
 */
exports.createUserProfile = functions.auth.user().onCreate(async (user) => {
    functions.logger.info("User signed up", {user});
    return;
});
