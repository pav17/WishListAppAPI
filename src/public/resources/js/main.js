var checkIcon = '<i class="fas fa-check"></i>';
var trashIcon = '<i class="far fa-trash-alt"></i>';
var userID = localStorage.getItem('userID');

// if (localStorage.getItem('wishlist') != null) {
//     var data = JSON.parse(localStorage.getItem('wishlist'));
// }



requestWishlist(userID);

function requestWishlist(userID) {
    if(userID != null){
        var req = new XMLHttpRequest();
        req.open('GET', '/request-wishlist');
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify({ 'userID': userID }))
        
        req.addEventListener('load', () => {
            var results = JSON.parse(req.responseText);

        });
    }
    else {
        userID = RegisterNewUser();
        localStorage.setItem('userID', userID)
    }
}

function updateWishlist(userID, wishlistItem) {
    var req = new XMLHttpRequest();
    req.open('POST', '/update-wishlist');
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify({ userID: wishlistItem }));

    req.addEventListener('load', () => {
        var results = JSON.parse(req.responseText);
        if (results.error){
            return console.log(results.error);
        } 
    });

    req.addEventListener('error', () => {
        console.log('Something bad happened!');
        console.log(e);
    });
}

function RegisterNewUser() {
    var req = new XMLHttpRequest();
    req.open('GET', '/request-id');
    //req.setRequestHeader('Content-Type', 'application/json');
    req.send()
    
    req.addEventListener('load', () => {
        var result = JSON.parse(req.responseText);
        if(result.error) {
            //return console.log(result.error);
        } 
        if(result.newID) {
            return result.newID;
        }
    });
}