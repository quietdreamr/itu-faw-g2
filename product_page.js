var results;

function createCard(index) {
    let data = results['product_data'][index]

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

    document.getElementById('flex-container').innerHTML += (html)

}

function getProducts() {
     return fetch("./products.json")
    .then((response) => response.json())
    .then((json) => {
        results = json
    });
}

function prepareCollection() {
    let productAmount = results['product_data'].length
    let data = results['product_data']
    for (let index = 0; index < productAmount; index++) {
        createCard(index)        
    }

}

window.addEventListener('DOMContentLoaded', (event) => {
    getProducts().then((results) => {
        prepareCollection()
    });
});


function filterWinesByYear(year) {
    
    let filteredWines = results['product_data'].filter(wine => wine.year === year);
    return filteredWines;
  }
  



//yourData.filter((element) => element.category=== theRequestedCategory);
