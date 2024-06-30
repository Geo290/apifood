require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const USER = process.env.DB_USER;
const PASS = process.env.DB_PASSKEY;
const DB = process.env.DB_NAME;
const COLLECTION = process.env.DB_COLLECTION;

const uri = `mongodb+srv://${USER}:${PASS}@cluster0.8puqbr9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const run = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db(`${DB}`).command({ ping: 1 });
    console.log("App successfully connected to DB");

  } catch (error) {
    console.error("Error while connecting to DB: ", error);
    process.exit(1);
  };

};

const stop = async (server) => {

  server.close(async (error) => {
    if (error) {
      console.error("Error while closing the server: ", error);
      process.exit(1);
    };

  });
  
  try {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("App successfully disconnected from DB");
    process.exit(0);

  } catch (error) {
    console.error("Error while disconnecting from DB: ", error);
    process.exit(1);

  };
};

// run().catch(console.dir);
module.exports = { run, stop }; 
