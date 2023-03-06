var results = {};

function getProducts() {
  return fetch("./data/products.json")
 .then((response) => response.json())
 .then((json) => {
     results = json['product_data']
 });
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

