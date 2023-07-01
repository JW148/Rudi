
const {MongoClient, ObjectId} = require("mongodb");

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

//status route (route used to check if the server is running)

app.get("/status", async(req, res) => {
  console.log("Status: OK");
  res.send({status: "OK"}).status(200);
})

//read route (http request to get data from the db)
app.get("/", async (req, res) =>{
    console.log("Connecting to collection...");
    let collection = db.collection("Ingredients");
    console.log("Querying collection...");
    let results = await collection.find({}).toArray();

    console.log("Returning results to client.")
    res.send(results).status(200);
});

app.get("/getSales/:date", async(req, res) => {
  console.log(req.params.id);
  res.send().status(200);
})

//create route (http request to add a new item to the collection)
app.post("/create", async (req, res) => { 
  console.log("Connecting to collection...");
    let collection = db.collection("Ingredients");
    console.log("Inserting document...");
    let newDoc = req.body;
    let result = await collection.insertOne(newDoc);
    console.log("Returning results to client.")
    res.send(result).status(204);
});


//delete route (http delete request to delete an item, by id, from the db)
app.delete("/delete/:id", async (req, res) => {
  const query = {_id: new ObjectId(req.params.id)}
   console.log("Connecting to collection...");
   const collection = db.collection("Ingredients");
   console.log("Deleting document...");
   let result = await collection.deleteOne(query);
   
   res.send(result).status(200);
});

//update route (http patch request to update an item, by id, from the db)
app.patch("/update", async(req, res) => {

  const updateDoc = () => {
    let update = {}
    Object.keys(req.body).forEach((el) => {
      update.el = req.body.el;
    });
    return update;
  }

  console.log("Connecting to collection...");
  const collection = db.collection("Ingredients");
  console.log("Updating document...");
  let result = await collection.updateOne(
    {_id: new ObjectId(req.body.id)},
    {$set: {name: req.body.name}}
  );

  res.send(result).status(200);
});

//createSale route(http request to add a new sale to the Sales collection)
app.post("/createSale", async (req, res) => { 
  console.log("Connecting to collection...");
    let collection = db.collection("Sales");
    console.log("Inserting document...");
    let newDoc = req.body;
    let result = await collection.insertOne(newDoc);
    console.log("Returning results to client.")
    res.send(result).status(204);
});

//increment route(http request to increment the 'amount in stock' and 'used this week' fields for a specified item)
app.patch("/incDec", async(req, res) => {


  //a way to get all the keys from the request body and make a query object out of them
  //this is to be used in the update route to update varying amounts of fields in a document
  (()=>{
    let obj = {};
    let keys = Object.keys(req.body)
    
    keys.forEach((el) => {
      obj[el] = req.body[el];
    })
    console.log(obj);
}
  )();

  console.log(req.body.id);
  console.log("Connecting to collection...");
  const collection = db.collection("Ingredients");
  console.log("Updating document...");

  // this option instructs the method to create a document if no documents match the filter
  const options = { upsert: true };

  let result = await collection.updateOne(
    {_id: new ObjectId(req.body.id)},
    {$inc: {amntInStock: req.body.x, usedWeek: req.body.y}}
  );
  console.log("Returning results to client.")
  res.send(result).status(200);
})

app.listen(port, () => { 
  console.log(`Server listening on port ${port}`)
}); 