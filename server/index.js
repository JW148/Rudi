const {MongoClient} = require("mongodb");

const uri = "mongodb+srv://myAtlasDBUser:7ZNOL2OKRqlciE4b@cluster0.hz3iyqm.mongodb.net/?retryWrites=true&w=majority"

async function run(){
    console.log('Connecting to MongoDB...');
    const client = new MongoClient(uri);
    try{
        console.log('Connecting to db...')
        const database = client.db('sample_airbnb');
        console.log('Finding collection...')
        const listings_and_reviews = database.collection('listingsAndReviews');
        console.log('Querying collection...')
        const query = { _id: "10009999"};
        const listing = await listings_and_reviews.findOne(query);
        console.log('Returning result to client...');
        return listing;
    }catch(err){
        console.error(err);
    } 
    finally {
        console.log('Closing connection to MongoDB.')
        await client.close();
    }
}

const express = require('express')
const app = express()
const port = 3000

//deal with http get requests
app.get('/getData', (req, res) => {
    //run() has to be inside an async function because res has to wait for run() to finish runnning before returning a result
    (async () => {
        res.json(await run());
     })()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})