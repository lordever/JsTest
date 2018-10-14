const express = require('express');
const app = express();

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});

module.exports.app = app;