const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');


const port = 3000;

const api = express();
api.use(express.static(__dirname + '/public'));
api.use(bodyParser.json());

api.listen(port, () => {
    console.log('API online.');
});

api.get('/request-wishlist', (req, res) => {
    if(req.body.userID){
        res.json(fs.readFile('/user-data/' + req.body.userID + '.json'), (error, data) =>{
            if(error) throw error;
        });
    }
    else {
        res.json({'IDError': 'noUserID'})
    }
})

api.get('/request-id', (req, res) => {
    
})