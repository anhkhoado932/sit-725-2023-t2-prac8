let express = require("express");
let router = express.Router();
let catController = require("../controllers/cat");

router.get("/", catController.getAllCats);

router.post("/", catController.insertCat);

// router.put("/", catController.editCat);

router.delete("/:id", catController.deleteCat);

module.exports = router;
