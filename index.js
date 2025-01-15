const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const path = require("path");
require("dotenv").config();
const app = express();
const school_route = require("./route/allRoute");

app.use(cors({
    origin:"*"
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/api/v1",school_route);
var jsonParser  = body_parser.json();

app.get('*',jsonParser, function(req, res) {
	res.send('404 Page');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`app is running on http://localhost:${PORT}`)
})