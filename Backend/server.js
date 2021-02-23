let express = require("express");
let userDetail = require("./Schemas/mongoSchema");
let userUpload = require("./Schemas/upload");
let mongoose = require("mongoose");
let Router = require("./Router/router");
let bodyParser = require("body-parser");
let cors = require("cors");
let Config = require("./Config/config");

let app = express();
app.use(cors());
let jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("images"));
mongoose.connect(
"mongodb://localhost:27017/department",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Mongo is connected");
  }
);

app.use("/home", Router);

app.listen(Config.port);
