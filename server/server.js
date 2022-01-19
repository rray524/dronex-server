const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

// port
const port = process.env.PORT || 8000;

// app
const app = express();

// db
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,

    })
    .then(() => console.log("DB CONNECTED"))
    .catch((err) => console.log("DB CONNECTION ERR", err));

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// routes middleware
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

app.get('/', (req, res) => {
    res.send("Hi it is running")
})

app.listen(port, () => console.log(`Server is running on port ${port}`));
