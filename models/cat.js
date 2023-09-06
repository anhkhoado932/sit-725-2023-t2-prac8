const { client } = require("../dbConnection");
const ObjectId = require("mongodb").ObjectId;

async function insertCat(cat, callback) {
    await client.connect();
    let collection = client.db().collection("cats");
    if ("_id" in cat) {
        cat["_id"] = new ObjectId(cat["_id"]);
    }
    collection.insertOne(cat, (err, result) => {
        callback(err, result);
        client.close();
    });
}

async function getAllCats(callback) {
    await client.connect();
    let collection = client.db().collection("cats");
    collection.find({}).toArray((err, result) => {
        callback(err, result);
        client.close();
    });
}

async function deleteCat(id, callback) {
    await client.connect();
    let collection = client.db().collection("cats");
    const _id = new ObjectId(id);
    collection.deleteOne({ _id: _id }, callback);
}

module.exports = { insertCat, getAllCats, deleteCat };
