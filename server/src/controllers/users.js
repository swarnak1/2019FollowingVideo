const express = require('express');
const user = require('../models/user');
const app = express.Router();
app.get("/", (req, res) => {

    user.getAll((err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/", (req, res) => {

    user.add({ FirstName: "eric", LastName: "Thompson", Password: "erict1" }, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});


module.exports = app;