const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const port = 3000;

const api = express();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
api.use(express.static(__dirname + '/public'));


api.listen(port, () => {
    console.log('API online.');
});

api.get('/wishlist', urlencodedParser, (req, res) => {
    const path = __dirname + '/user-data/' + req.query.userID + '.json';
    console.log(path);
    if(fs.existsSync(path)){
        fs.readFile(path, (error, data) => {
            if (error) throw error;

            res.send(data.toString());
        });
    }
    else {
        res.json({'error': 'No valid user found.'});
    }
});

api.post('/wishlist', jsonParser, (req, res) => {
    console.log(req.body.userID + ': ' + req.body.item);
    const path = __dirname + '/user-data/' + req.body.userID + '.json';
    if(fs.existsSync(path)) {
        fs.readFile(path, (error, data) => {
            if(error) throw error;

            const list = JSON.parse(data.toString());
            console.log(list);
            list.items.push(req.body.item);
            console.log(list);
            fs.writeFile(path, JSON.stringify({
                'items': list.items
            }), (error) => {
                if(error) throw error;
            });
        });
    }
    else {
        const list = [req.body.item];
        fs.writeFile(path, JSON.stringify({
            'items': list
        }), (error) => {
            if(error) throw error;
        });
    }
    res.send('yes');
});

api.delete('/wishlist', jsonParser, (req, res) => {
    const path = __dirname + '/user-data/' + req.body.userID + '.json';
    if(fs.existsSync(path)) {
        fs.readFile(path, (error, data) => {
            if(error) throw error;

            const list = JSON.parse(data.toString());
            console.log(list);
            const index = list.items.indexOf(req.body.item);
            list.items.splice(index, 1);
            console.log(list);
            fs.writeFile(path, JSON.stringify({
                'items': list.items
            }), (error) => {
                if(error) throw error;
                res.send('removed');
            });
        });
    }
});