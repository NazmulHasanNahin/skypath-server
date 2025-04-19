const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.port || 5000;
require("dotenv").config();


//middleware 

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@skypath-react-db.odx7eii.mongodb.net/?retryWrites=true&w=majority&appName=skypath-react-db`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();


    // all country er data fetch 
    const allCountry = client.db("skypathDB").collection("countries")


    // get 

    app.get("/countries", async (req, res) => {
      const cursor = allCountry.find();
      const result = await cursor.toArray();
      res.send(result)
    })




    //all spot er data pathanor jnne 

    const touristSpotCollection = client.db("skypathDB").collection("touristSpots")

    //all country data paor jnne 

    app.get("/all-spot" , async(req,res)=>{
      const cursor = touristSpotCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })


    //DATA post korar jnne spot gula 
    app.post("/add-spots", async (req, res) => {
      const spotData = req.body;
      const result = await touristSpotCollection.insertOne(spotData);
      res.send(result);
    });

    // country wise data filter korar jnne 
    app.get("/spots/:country", async (req, res) => {
      const country = req.params.country;
      const spots = await touristSpotCollection.find({ country_Name: country }).toArray();
      res.send(spots);
    });
    
    //  Get spot by ID

    app.get("/spot/:id",async(req,res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await touristSpotCollection.findOne(query)
      res.send(result)
    })
























    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB and server is running!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);








app.get("/", (req, res) => {
  res.send(`travel site server running ${port} port`)
})


app.listen(port, () => {
  console.log(`travel site  server is running on port: ${port}`);
})