const express = require('express');
const bodyParser = require('body-parser');

const fr = new FileReader();

const port = 3000;

const api = express();
api.use(express.static(__dirname + '/public'));
api.use(bodyParser.json());

api.listen(port, () => {
    console.log('API online.');
});

api.get('/request-wishlist', (req, res) => {
    if(req.body.userID){
        res.json(fr.readAsText('/user-data/' + req.body.userID + '.json'))
    }
    else {
        res.json({'IDError': 'noUserID'})
    }
})

api.get('/request-id', (req, res) => {
    
})