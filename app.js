const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("index");
});


app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port 3000........");
});