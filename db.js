let mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB in the House!"))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
