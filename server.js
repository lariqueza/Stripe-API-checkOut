require('dotenv').config();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

console.log(stripeSecretKey, stripePublicKey);

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const sandalData = require('./items.json');
const http = require('http');
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/home', (req, res) => {
    res.render('home.ejs')
});

app.get('/product', (req, res) => {
    res.render('product.ejs')
});

app.get('/pay', (req, res) => {
    res.render('pay.ejs')
});



// form submissions

const data = JSON.stringify({
    addessOne: "flat 6 bellham court",
    addressTwo: "Hope close",
    city: 'London',
    postcode: 'NW4 1AY',
    country: 'United Kingdom',

    cardNumber: "07573407434839",
    cardHolderName: "Aaron fernandez",
    ExpiryDate: "04/24",
    CVV: "344"
});

const options = {
    hostname: 'reqres.in',
    path: '/delivery-confirmed',
    method:'POST',
    header: {
        'Content-Type': 'application/json'
    }
}

const req = http.request(options, (res) => {
    let body = '';
    console.log("status code:", res.statusCode)

    res.on('data', (chunk) => {
        body += chunk;
    })
    res.on('end', () => {
        console.log("Body:", JSON.parse(data))
    })
})
req.write(data)
req.end();

// app.post('/delivery', (req, res) => {
//     const delivery = req.body;
//     res.render('delivery-confrimed.ejs', { delivery })
// });





// app.get('/product', (req, res) => {
//     fs.readFile('items.json', function(error) {
//         if(error) {
//             res.status(500).end()
//         } else {
//             res.render('product.ejs', {
//                 stripePublicKey = stripePublicKey,
//                 items: JSON.parse(data)
//             })
//         }
//     })
//  });



app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`)
});