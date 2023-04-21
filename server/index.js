
const {MongoClient} = require("mongodb");

const uri = "mongodb+srv://myAtlasDBUser:7ZNOL2OKRqlciE4b@cluster0.hz3iyqm.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

console.log('Connecting to db...');
const db = client.db("Stock");


// async function run(){
//     try{
//         console.log('Connecting to db...')
//         const database = client.db('Stock');
//         console.log('Finding collection...')
//         const listings_and_reviews = database.collection('Ingredients');
//         console.log('Querying collection...')
//         // const query = { _id: "10009999"};
//         const listing = await listings_and_reviews.findOne({});
//         console.log('Returning result to client...');
//         return listing;
//     }catch(err){
//         console.error(err);
//     } 
//     // finally {
//     //     console.log('Closing connection to MongoDB.')
//     //     await client.close();
//     // }
// }

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//read route (http request to get data from the db)
app.get("/", async (req, res) =>{
    console.log("Connecting to collection...");
    let collection = db.collection("Ingredients");
    console.log("Querying collection...");
    let results = await collection.find({}).toArray();

    console.log("Returning results to client.")
    res.send(results).status(200);
})

//create route (http request to add a new item to the collection)
app.post("/create", async (req, res) => {
    let data = req.body;
    res.send(data).status(200);
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})