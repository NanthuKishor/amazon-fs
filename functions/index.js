// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51JjaJFSFfdxeLbNZUadTbf3oHScWMnC9dbtRwgulvHksqix0TEbBLKnGKHchvreES4GPxOoAySmoUPeTzqgI5jr8004vsaoVYE"
);

//  API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  //  we cound use "req.params.total" if ':' was used.
  //  but in this case create?total query is used in the axios request, so for query, we use "req.query.total".

  console.log("Payment Request Recieved BOOOM!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "inr",
  });
  //  OK created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

//  example API, running the firebase emulators:start
//  get("/") => http://localhost:5001/fs-e1bc0/us-central1/api

//  THIS IS ALL THAT IS REQUIRED TO SET UP THE APP AND RUN IN THE CLOUD FUNCTIONS.
