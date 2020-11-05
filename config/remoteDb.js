const mongoose = require('mongoose');

const db = require("./config/keys").mongoURL;

const dbConnect = () => {
    mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

}

module.exports = dbConnect