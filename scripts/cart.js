// Cart script

function fetchCart() {
  const cart = JSON.parse(localStorage.getItem("cart"));

  if (cart && cart.count > 0) {
    jQuery(".cart-table, .cart-summary").show();
    const target = document.querySelector(".cart-table-body");
    target.innerHTML = "";

    for (const product of cart.product_data) {
      const { id, name, price, quantity } = product;

      target.innerHTML += `
        <div class="cart-table-row">
          <div class="cart-table-cell">${name}</div>
          <div class="cart-table-cell">${quantity}</div>
          <div class="cart-table-cell">${quantity * price} DKK</div>
          <div class="cart-table-cell">
            <button class="remove-btn" onclick="removeFromCart(${id});fetchCart();">&times;</button>
          </div>
        </div>
      `;
    }

    const summary = `
      <div class="cart-summary">
        <span class="total-items">Total Items: ${cart.count}</span> 
        <span class="total-price">Total Price: ${cart.total.toFixed(
          2
        )} DKK</span>
      </div>
    `;
    document.querySelector(".cart-summary").innerHTML = summary;
  } else {
    document.querySelector(".cart-table-body").innerHTML =
      "<div>Your cart is empty!</div>";
    jQuery(".cart-table-header, .cart-summary").hide();
  }

  return true;
}

function addToCart(product_id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {
    product_data: [],
    count: 0,
    total: 0,
  };
  let product = null;
  for (let i = 0; i < cart.product_data.length; i++) {
    if (cart.product_data[i].id === product_id) {
      cart.product_data[i].quantity++;
      product = cart.product_data[i];
      break;
    }
  }
  if (!product) {
    product = cool_filter("id", product_id)[0];
    if (product) {
      product["quantity"] = 1;
      cart.product_data.push(product);
    }
  }
  if (product) {
    let price = product["price"];
    let count = cart.count + 1;
    let new_total = cart.total + price;
    localStorage.setItem(
      "cart",
      JSON.stringify({
        product_data: cart.product_data,
        count: count,
        total: new_total,
      })
    );
    jQuery("#atcModal").modal("toggle");
    return true;
  } else {
    return false;
  }
}

function removeFromCart(product_id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {
    product_data: [],
    count: 0,
    total: 0,
  };
  let updatedCartData = { product_data: [], count: 0, total: 0 };
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
      updatedCartData.product_data = cart.product_data.filter(
        (_, i) => i !== productIndex
      );
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
  let filtered_results = results.filter((wine) => wine[attribute] === value);
  return filtered_results;
}

function viewCart() {
  jQuery("#atcModal").modal("hide");
  jQuery("#cartModal").modal("show");
  fetchCart();
}
