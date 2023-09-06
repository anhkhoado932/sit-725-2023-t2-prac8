require("dotenv").config();
const uri = process.env.DB_URI;
const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function testRunDB() {
    try {
        await client.connect();
        console.log("Database connection works!");
    } finally {
        await client.close();
    }
}

module.exports = { testRunDB, client };
