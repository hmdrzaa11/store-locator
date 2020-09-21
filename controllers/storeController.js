let Store = require("../models/Store");

// @desc Get all stores
//@route GET /api/v1/stores
//@access public

let getStores = async (req, res, next) => {
  try {
    let stores = await Store.find();
    res.json({
      success: true,
      count: stores.length,
      data: stores,
    });
  } catch (error) {
    let err = new Error("Server Error");
    err.code = 500;
    next(err);
  }
};

// @desc creates a new store into DB
//@route POST /api/v1/stores
//@access public

let createStore = async (req, res, next) => {
  try {
    let store = await Store.create(req.body);
    res.status(201).json({
      success: true,
      data: store,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStores, createStore };
