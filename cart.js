// Cart script

function fetchCart() {
    let target = document.querySelector('.modal-body')
    if (localStorage.getItem('cart') !== null) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    for (let index = 0; index < cart.length; index++) {
        target.innerHTML += `<div class="cart-item">${index} - ${cart[index]['name']}</div>` 
    }
      } else {
        target.innerHTML += "Your cart is empty!"
      }
    return true;
}

function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.push(product)
    localStorage.setItem("cart", JSON.stringify(cart))
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1)
    localStorage.setItem("cart", JSON.stringify(cart))
}
