function createCard(results, index, target) {
  let data = results[index]
  let name = data['name']
  let price = data['price']
  let description = data['description']
  let image = data['image']
  let id = data['id']

  let html = `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <a href="./product.html?id=${id}">
    <img class="mb-5" src="${image}">
    <h5 class="card-title">${name}</h5>
    </a>
    <h5 class="card-price">${price} DKK</h5>
    <div class="card-text">${description}</div>
    <a href="#" class="btn btn-primary" onclick="addToCart(${id})" data-pid=${id}>Add-to-cart</a>
      </div>
      </div>`

  target.innerHTML += (html)
}

function createCards(results, target) {
    let productAmount = results.length
    for (let index = 0; index < productAmount; index++) {
        createCard(results, index, target)        
    }
  }

