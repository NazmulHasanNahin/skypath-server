const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.port || 5000;
require("dotenv").config();


//middleware 

app.use(cors());
app.use(express.json());










app.get("/", (req, res) => {
    res.send(`travel site server running ${port} port`)
})


app.listen(port, () => {
    console.log(`travel site  server is running on port: ${port}`);
})