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
      jQuery(".owl-carousel").owlCarousel({
        responsive:{
          0:{
              items:1,
              nav:false
          },
          600:{
              items:2,
              nav:false
          },
          1000:{
              items:3,
              nav:false,
          }
      }      
      });
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

