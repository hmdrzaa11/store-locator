require("dotenv").config();
let express = require("express");
let cors = require("cors");
let morgan = require("morgan");
let storeRouter = require("./routes/storeRoutes");
let errorController = require("./controllers/errorController");

require("./db");

let app = express();
process.env.NODE_ENV === "development" ? app.use(morgan("dev")) : null;

//statics
app.use(express.static(`${__dirname}/public`));

//bodyParser
app.use(express.json());
//cors
app.use(cors());

//api
app.use("/api/v1/stores", storeRouter);

//error handler route
app.use("*", errorController);

let PORT = process.env.PORT || 3000;

app.listen(PORT, process.env.HOSTNAME, () =>
  console.log(`server in "${process.env.NODE_ENV}" and on port ${PORT}`)
);
