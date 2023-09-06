const catModel = require("../models/cat");

function getAllCats(req, res) {
    catModel.getAllCats((err, result) => {
        if (!err) {
            res.status(200).json({
                data: result,
                message: "success",
            });
        } else {
            res.status(400).json({ err });
        }
    });
}

function insertCat(req, res) {
    const data = req.body;
    console.log(data);
    catModel.insertCat(data, (err, result) => {
        if (!err) {
            res.status(201).json({ data: result, message: "added" });
        } else {
            res.status(400).json({ message: result });
        }
    });
}

function deleteCat(req, res) {
    const catId = req.params.id;
    console.log(req);
    catModel.deleteCat(catId, (err, result) => {
        if (!err) {
            res.status(200).json({ data: result, message: "deleted" });
        } else {
            res.status(400).json({ message: err });
        }
    });
}
module.exports = { getAllCats, insertCat, deleteCat };
