const express=require("express");
const cors=require("cors");
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

const app=express();

app.use(cors());
app.use(express.json());



const port=process.env.PORT||5000;



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4qnhmwc.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const userCollection=client.db("userDB").collection("users");


    app.post("/users", async (req, res) => {
        const user = req.body;
           console.log(user);
        const result = await userCollection.insertOne(user);
        console.log(result);
        res.send(result);
      });

      app.get("/users", async (req, res) => {
        const result = await userCollection.find().toArray();
        console.log(result);
        res.send(result);

      });

      const userCollection2=client.db("userDB").collection("cart");
      app.post("/cart", async (req, res) => {
        const user = req.body;
           console.log(user);
        const result = await userCollection2.insertOne(user);
        console.log(result);
        res.send(result);
      });

      

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/",(req,res)=>{
    res.send("CRUD is running....");
})

app.listen(port,()=>{
    console.log(`App is running on PORT: ${port}`);
})