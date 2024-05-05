// db.js
import { MongoClient } from "mongodb";

/* const uri = "mongodb://localhost:27017/soundscape";
 */
const uri =
  "mongodb+srv://jeangalanty:jeangalanty@cluster0.nobrvcc.mongodb.net/soundscape?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB database");
    return client.db();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

async function closeConnection() {
  await client.close();
  console.log("Disconnected from MongoDB database");
}

export { connectToDatabase, closeConnection };
