var checkIcon = '<i class="fas fa-check"></i>';
var trashIcon = '<i class="far fa-trash-alt"></i>';
var userID = localStorage.getItem('userID');

// if (localStorage.getItem('wishlist') != null) {
//     var data = JSON.parse(localStorage.getItem('wishlist'));
// }



//requestWishlist(userID);

document.getElementById('addWish').addEventListener('click', function() {
    var wishText = document.getElementById('wish').value;
    if (wishText) {
        addWishlistItem(wishText);
    }
});

function addWishlistItem(wishText) {
    document.getElementById('wish').value = '';
    
    var list = document.getElementById('wishlist');

    var wishlistItem = document.createElement('li');
    wishlistItem.classList.add('wishItem');
    wishlistItem.innerText = wishText;

    var itemButtons = document.createElement('div');
    itemButtons.classList.add('itemButtons');

    var checkButton = document.createElement('button');
    checkButton.classList.add('checkButton');
    checkButton.innerHTML = checkIcon;
    //checkButton.addEventListener('click', crossOutItem);
    
    var trashButton = document.createElement('button');
    trashButton.classList.add('trashButton')
    trashButton.innerHTML = trashIcon;
    //trashButton.addEventListener('click', deleteItem);

    itemButtons.appendChild(checkButton);
    itemButtons.appendChild(trashButton);
    wishlistItem.appendChild(itemButtons);
    list.appendChild(wishlistItem);
}

// API functions
function requestWishlist(userID) {
    if(userID != null){
        var req = new XMLHttpRequest();
        req.open('GET', '/request-wishlist');
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify({ 'userID': userID }))
        
        req.addEventListener('load', () => {
            var results = JSON.parse(req.responseText);
        });
        req.addEventListener('IDError', () => {
            var results = JSON.parse(req.responseText);
            console.log(results);
        });
    }
    else {
        userID = RegisterNewUser();
        localStorage.setItem('userID', userID)
    }
}

function updateWishlistInAPI(userID, wishlistItem) {
    var req = new XMLHttpRequest();
    req.open('POST', '/update-wishlist');
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify({ userID: wishlistItem }));

    req.addEventListener('load', () => {
        var results = JSON.parse(req.responseText);
        if (results.error) {
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