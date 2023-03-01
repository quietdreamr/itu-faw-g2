console.log("Script loaded!");

var results = {};

function getProducts() {
  return fetch("./products.json")
 .then((response) => response.json())
 .then((json) => {
     results = json['product_data']
 });
}

function prepareCollection(data) {
  let productAmount = results.length
  for (let index = 0; index < productAmount; index++) {
      createCard(results, index)        
  }
}

function createCard(results, index, target) {
  let data = results[index]
  let name = data['name']
  let price = data['price']
  let description = data['description']
  let image = data['image']
  let id = data['id']

  let html = `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <img class="mb-5" src="${image}">
    <h5 class="card-title">${name}</h5>
    <h5 class="card-price">${price} DKK</h5>
    <div class="card-text">${description}</div>
    <a href="#" class="btn btn-primary" onclick="addToCart(${id})" data-pid=${id}>Add-to-cart</a>
      </div>
      </div>`

  target.innerHTML += (html)
}

function clearCollection() {
  let container = document.getElementById('flex-container')
  container.innerHTML = '';
}

function createCards(results, target) {
  let productAmount = results.length
  for (let index = 0; index < productAmount; index++) {
      createCard(results, index, target)        
  }
}

window.addEventListener('DOMContentLoaded', (event) => {
  getProducts().then((results) => {
      filterCards();
      filterCardsByPrice();
      $(".owl-carousel").owlCarousel();
  });
  document.getElementById('cart').addEventListener('click', function() {
    fetchCart()
  });

});

function filterCards() {
  let filterCards = results.filter(wine => wine['id'] > 120);
  let target = document.getElementById('carousel-1')
  createCards(filterCards, target);
}

function filterCardsByPrice() {
  let filterPrice = results.filter(wine => wine['price'] < 150);
  let target = document.getElementById('carousel-2')
  createCards(filterPrice, target);
}

