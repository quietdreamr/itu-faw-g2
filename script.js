console.log("Script loaded!");

$(document).ready(function(){
    $(".owl-carousel").owlCarousel();
  });

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

function createCard(results, index) {
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
    <a href="#" class="btn btn-primary">Add-to-cart</a>
      </div>
      </div>`

  document.getElementById('carousel').innerHTML += (html)
}

function clearCollection() {
  let container = document.getElementById('flex-container')
  container.innerHTML = '';
}

function createCards(results) {
  let productAmount = results.length
  for (let index = 0; index < productAmount; index++) {
      createCard(results, index)        
  }
}

window.addEventListener('DOMContentLoaded', (event) => {
  getProducts().then((results) => {
      filterCards();
  });
});

function filterCards() {
  let filterCards = results.filter(wine => wine['id'] > 120);
  createCards(filterCards);
  console.log(filterCards);
}

