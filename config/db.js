require('dotenv').config();
const mongoose = require('mongoose');

const USER = process.env.DB_USER;
const PASS = process.env.DB_PASSKEY;
const DB = process.env.DB_NAME;

const URI = `mongodb+srv://${USER}:${PASS}@cluster0.8puqbr9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const run = async () => {
  try {
    // Connect the client to the server
    await mongoose.connect(URI, {
      useNewUrlParser : true,
      useUnifiedTopology: true,
      dbName: 'apifood',
    });

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
    await mongoose.disconnect()
    console.log("App successfully disconnected from DB");
    process.exit(0);

  } catch (error) {
    console.error("Error while disconnecting from DB: ", error);
    process.exit(1);

  };
};

module.exports = { run, stop }; 