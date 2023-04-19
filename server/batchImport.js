//Requiring the data that needs to be imported
const items = require("./data/items.json");
const companies = require("./data/companies.json");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("E-commerce");
  try {
    await client.connect();
    // await db.collection("companies").insertMany(companies);
    await db.collection("items").insertMany(items);
    await client.close();
  } catch (err) {
    console.log(err);
  }
};

batchImport();
