// Cart script

function fetchCart() {
  let target = document.querySelector('.modal-body');
  target.innerHTML = "";
  if (localStorage.getItem('cart') !== null) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < cart.product_data.length; i++) {
      const {id, name, price, quantity} = cart.product_data[i];
      target.innerHTML += `<div class="cart-item">${i+1} - ${name} - ${price} DKK - Quantity: ${quantity} <button class="remove-btn" onclick="removeFromCart(${id})">Remove</button></div>`
    }
    target.innerHTML += `<div class="cart-summary">Total Items: ${cart.count} - Total Price: ${cart.total.toFixed(2)} DKK</div>`;
  } else {
    target.innerHTML += "Your cart is empty!";
  }
  return true;
}


function addToCart(product_id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || {"product_data":[],"count":0,"total":0};
  let product = null;
  for (let i = 0; i < cart.product_data.length; i++) {
    if (cart.product_data[i].id === product_id) {
      cart.product_data[i].quantity++;
      product = cart.product_data[i];
      break;
    }
  }
  if (!product) {
    product = cool_filter('id', product_id)[0];
    if (product) {
      product['quantity'] = 1;
      cart.product_data.push(product);
    }
  }
  if (product) {
    let price = product['price'];
    let count = cart.count + 1;
    let new_total = cart.total + price;
    localStorage.setItem("cart", JSON.stringify({"product_data":cart.product_data,"count":count,"total":new_total}));
    jQuery('#atcModal').modal('show');
    return true;
  } else {
    return false;
  }
}

function removeFromCart(product_id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || {"product_data":[],"count":0,"total":0};
  let updatedCartData = {"product_data":[],"count":0,"total":0};
  let productIndex = -1;
  let productPrice = 0;

  for (let i = 0; i < cart.product_data.length; i++) {
    if (cart.product_data[i].id === product_id) {
      productIndex = i;
      productPrice = cart.product_data[i].price;
      break;
    }
  }

  if (productIndex !== -1) {
    let product = cart.product_data[productIndex];
    if (product.quantity > 1) {
      product.quantity--;
      updatedCartData.product_data = cart.product_data;
      updatedCartData.count = cart.count - 1;
      updatedCartData.total = cart.total - productPrice;
    } else {
      updatedCartData.product_data = cart.product_data.filter((_, i) => i !== productIndex);
      updatedCartData.count = cart.count - 1;
      updatedCartData.total = cart.total - productPrice;
    }
    localStorage.setItem("cart", JSON.stringify(updatedCartData));
    return true;
  } else {
    return false;
  }
}


function cool_filter(attribute, value) {
  let filtered_results = results.filter(wine => wine[attribute] === value);
  return filtered_results;
};