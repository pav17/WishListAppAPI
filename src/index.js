const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;

const api = express();
api.use(express.static(__dirname + '/public'));
api.use(bodyParser.json());

api.listen(port, () => {
    console.log('API online.');
});

