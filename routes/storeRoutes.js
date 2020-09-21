let router = require("express").Router();
let storeController = require("../controllers/storeController");

router
  .route("/")
  .get(storeController.getStores)
  .post(storeController.createStore);

module.exports = router;
