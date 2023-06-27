// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51NKtYcJbbYAIKf3mACbdpU4LbgnddE7ioKyzQBqMla52wGmrVanG2wllxDbN93serVjn9fQ1rJWvOSkifMe8xIfB00zscJgHoA')

//API SETUP
//--------------------------------
//App config
const app = express();

//middlewares
app.use(cors({origin: true}));
// app.use(cors());
app.use(express.json());

//api routes
app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log('payment recieved: ', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of the currency
        currency: "usd",
    });

    //OK - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//listen command
exports.api = functions.https.onRequest(app)
