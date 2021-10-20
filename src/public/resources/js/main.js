var checkIcon = '<i class="fas fa-check"></i>';
var trashIcon = '<i class="far fa-trash-alt"></i>';

if (localStorage.getItem('wishlist') != null) {
    var data = JSON.parse(localStorage.getItem('wishlist'));
}


function requestWishlist() {
    var req = new XMLHttpRequest();
    req.open('GET', '/request-wishlist')
    
}