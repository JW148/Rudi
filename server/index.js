const {MongoClient} = require("mongodb");

const uri = "mongodb+srv://myAtlasDBUser:7ZNOL2OKRqlciE4b@cluster0.hz3iyqm.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri);

async function run(){
    try{
        const database = client.db('sample_airbnb');
        const listings_and_reviews = database.collection('listingsAndReviews');

        const query = { _id: "10009999"};
        const listing = await listings_and_reviews.findOne(query);

        return listing;
    } finally {
        await client.close();
    }
}

const express = require('express')
const app = express()
const port = 3000

app.get('/getData', (req, res) => {
    (async () => {
        res.json(await run());
     })()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})