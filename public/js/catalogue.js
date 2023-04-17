var results;

function getProducts() {
    return fetch("/api/products")
   .then((response) => response.json())
   .then((json) => {
       results = json
   });
}

function prepareCollection(data) {
    let productAmount = results.length
    for (let index = 0; index < productAmount; index++) {
        createCard(results, index)        
    }
}

function clearCollection() {
    let container = document.getElementById('flex-container')
    container.innerHTML = '';
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
    <a style="text-decoration:none;" href="./product?id=${id}">
      <img class="mb-5" src="${image}">
      <h5 class="card-title">${name}</h5>
    </a>
      <h5 class="card-price">${price} DKK</h5>
      <div class="card-text">${description}</div>
      <button class="basket-button" onclick="addToCart(${id})">Add to basket</button>
        </div>
        </div>`

    document.getElementById('flex-container').innerHTML += (html)
}

function createCards(results) {
    let productAmount = results.length
    for (let index = 0; index < productAmount; index++) {
        createCard(results, index)        
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    getProducts().then((results) => {
        prepareCollection()
    });
    addUserName();
});
  
function AttributeFilter(attribute, value) {
    fetch(`/api/products/${attribute}/${value}`)
   .then((response) => response.json())
   .then((json) => {
       results = json
   });
    clearCollection()
    createCards(results)
    return results;
}

function Reset(){
    clearCollection()
    prepareCollection()
}