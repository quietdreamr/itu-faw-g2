// Cart script

async function fetchCart() {
  let id = localStorage.getItem("user_id");
  let user_cart = {}

  try {
    const response = await fetch(`/api/cart/${id}`);
    if (response.ok) {
      const data = await response.json();
      user_cart = data;
    } else {
      console.error('API request failed with status:', response.status);
      // Handle error condition here
    }
  } catch (error) {
    console.error('Error fetching cart data', error);
    // Handle error condition here
  }

  if (user_cart && user_cart.count > 0) {
    jQuery(".cart-table, .cart-summary").show();
    const target = document.querySelector(".cart-table-body");
    target.innerHTML = "";

    for (const product of user_cart.product_data) {
      const { id, name, price, quantity } = product;

      target.innerHTML += `
        <div class="cart-table-row">
          <div class="cart-table-cell">${name}</div>
          <div class="cart-table-cell">${quantity}</div>
          <div class="cart-table-cell">${quantity * price} DKK</div>
          <div class="cart-table-cell">
            <button class="remove-btn" onclick="removeFromCart(${id}).then(() => {
              fetchCart();
            });">&times;</button>
          </div>
        </div>
      `;
    }

    const summary = `
      <div class="cart-summary">
        <span class="total-items">Total Items: ${user_cart.count}</span> 
        <span class="total-price">Total Price: ${user_cart.total.toFixed(
          2
        )} DKK</span>
      </div>
    `;
    document.querySelector(".cart-summary").innerHTML = summary;
    jQuery(".cart-table-header, .cart-summary").show();
  } else {
    document.querySelector(".cart-table-body").innerHTML =
      "<div>Your basket is empty!</div>";
    jQuery(".cart-table-header, .cart-summary").hide();
  }

  return true;
}

async function addToCart(product_id) {
  let id = localStorage.getItem("user_id");
  let cart = {
    product_data: [],
    count: 0,
    total: 0,
  };
  
  try {
    const response = await fetch(`/api/cart/${id}`);
    if (response.ok) {
      const data = await response.json();
      cart = data;
    } else {
      console.error('API request failed with status:', response.status);
      // Handle error condition here
    }
  } catch (error) {
    console.error('Error fetching cart data', error);
    // Handle error condition here
  }

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

    fetch(`/api/cart/${id}`, {
      method: 'POST',
      body: JSON.stringify({
        product_data: cart.product_data,
        count: count,
        total: new_total,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error)
    })
  

    jQuery('.cart-modal-body').text(`${product["name"]} was added to your basket.`)
    jQuery("#atcModal").modal("show");
    return true;
  } else {
    return false;
  }
}

async function removeFromCart(product_id) {
  let user_id = localStorage.getItem("user_id");
  let updatedCartData = { product_data: [], count: 0, total: 0 };
  let productIndex = -1;
  let productPrice = 0;

  try {
    const response = await fetch(`/api/cart/${user_id}`);
    if (response.ok) {
      const cart = await response.json();
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

        const updateResponse = await fetch(`/api/cart/${user_id}`, {
          method: 'PUT',
          body: JSON.stringify(updatedCartData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!updateResponse.ok) {
          console.error('API request failed with status:', updateResponse.status);
          // Handle error condition here
        }
        return true;
      } else {
        return false;
      }
    } else {
      console.error('API request failed with status:', response.status);
      // Handle error condition here
    }
  } catch (error) {
    console.error('Error fetching cart data', error);
    // Handle error condition here
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

window.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("cart").addEventListener("click", function () {
    fetchCart();
  });
});
