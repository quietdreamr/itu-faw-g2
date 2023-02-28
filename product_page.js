var results;

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
      <img class="mb-5" src="${image}">
      <h5 class="card-title">${name}</h5>
      <h5 class="card-price">${price} DKK</h5>
      <div class="card-text">${description}</div>
      <a href="#" class="btn btn-primary">Add-to-cart</a>
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
});


function filterWinesByYear(year) {
    let filteredWines = results.filter(wine => wine.year === year);
    clearCollection()
    createCards(filteredWines)
    return filteredWines;
  }
  
function attributeFilter(attribute, value) {
    let filtered_results = results.filter(attribute => attribute.value === value);
    clearCollection()
    createCards(filteredWines)
    return filteredWines;

}


//yourData.filter((element) => element.category=== theRequestedCategory);
