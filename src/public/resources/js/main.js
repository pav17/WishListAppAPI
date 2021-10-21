var checkIcon = '<i class="fas fa-check"></i>';
var trashIcon = '<i class="far fa-trash-alt"></i>';
var userID = localStorage.getItem('userID');

// if (localStorage.getItem('wishlist') != null) {
//     var data = JSON.parse(localStorage.getItem('wishlist'));
// }





if(userID == null) {
    //catch if null later
    createID();
}

requestWishlist(userID);

document.getElementById('addWish').addEventListener('click', function() {
    var wishText = document.getElementById('wish').value;
    if (wishText) {
        addWishlistItem(wishText, true);
    }
});

function addWishlistItem(wishText, updateAPI) {
    document.getElementById('wish').value = '';
    var updated = 'no';
    if(updateAPI) {
        if (userID == null){
            createID();
        }
        var updated = AddWishlistItemToAPI(userID, wishText);
    }

    if(updated = 'yes' || updateAPI == false){
        var list = document.getElementById('wishlist');

        var wishlistItem = document.createElement('li');
        wishlistItem.classList.add('wishItem');
        wishlistItem.innerText = wishText;

        var itemButtons = document.createElement('div');
        itemButtons.classList.add('itemButtons');

        var checkButton = document.createElement('button');
        checkButton.classList.add('checkButton');
        checkButton.innerHTML = checkIcon;
        checkButton.addEventListener('click', crossOutItem);
        
        var trashButton = document.createElement('button');
        trashButton.classList.add('trashButton')
        trashButton.innerHTML = trashIcon;
        trashButton.addEventListener('click', deleteItem);

        itemButtons.appendChild(checkButton);
        itemButtons.appendChild(trashButton);
        wishlistItem.appendChild(itemButtons);
        list.appendChild(wishlistItem);
    } 
}

function crossOutItem() {
    var item = this.parentNode.parentNode;
    if (item.classList.contains('crossedOut')){
        item.classList.remove('crossedOut');
    }
    else {
        item.classList.add('crossedOut');
    }
}

function deleteItem() {
    var item = this.parentNode.parentNode;
    item.remove();
}

function createID() {
    var ID = prompt('Please enter a user ID.');
    userID = ID;
    localStorage.setItem('userID', ID)
    return ID;
}

// API functions
function requestWishlist(userID) {
    if(userID != null){
        var req = new XMLHttpRequest();
        var params = "userID=" + userID;
        console.log(params);
        req.open('GET', '/request-wishlist' + '?' + params, true);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send(null);
        
        req.addEventListener('load', () => {
            var results = JSON.parse(req.responseText);
            if (results.error){
                console.log(results.error);
            }
            else{
                console.log(results.items);
                results.items.forEach(element => {
                    addWishlistItem(element, false);
                });
            }
        });

        req.addEventListener('error', (e) => {
            console.log('there was an error.');
            console.log(e);
        });
    }
}

function AddWishlistItemToAPI(userID, wishListItem) {
    var req = new XMLHttpRequest();
    req.open('POST', '/update-wishlist');
    req.setRequestHeader('Content-Type', 'application/json');

    req.send(JSON.stringify({ 
        'userID': userID,
        'item': wishListItem
    }));

    req.addEventListener('load', () => {
        var results = req.responseText;
        if (results.error) {
            return console.log(results.error);
        } 
        return results;
    });

    req.addEventListener('error', (e) => {
        console.log('Something bad happened!');
        console.log(e);
    });
}

function removeWishlistItemFromAPI(userID, wishListItem) {
    var req = new XMLHttpRequest();
    req.open('DELETE', '/update-wishlist');
    req.setRequestHeader('Content-Type', 'application/json');

    req.send(JSON.stringify({ 
        'userID': userID,
        'item': wishListItem
    }));

    req.addEventListener('load', () => {
        
    });

    req.addEventListener('error', (e) => {
        console.log('Something bad happened!');
        console.log(e);
    });
}
