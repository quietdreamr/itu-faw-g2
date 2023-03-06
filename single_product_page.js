function AttributeFilter(target, attribute, value) {
    let filtered_results = target.filter(wine => wine[attribute] === value);
    return filtered_results;
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function createProduct(product) {
    let name = product.name
    let price = product.price
    let description = product.description
    let image = product.image
    let id = product.id
    let producer = product.brand
    let country = product.country

    let html = `<div id="product">
    <div class="Product-picture" style="width: 40%; float:right">     
        <img class="mb-5" ${image}>
    </div
    <div class="Product-info" style="width: 60%; float:left">
            <h3 id="name">${name}</h3>    
            <h5 class=" producer-link" href="#" style="color:#584830">${producer}</h5>
            <h5 style="color:#584830">${country}</h5>
            <!-- Price-->
            <h6 class="title-price"><small>Price</small></h6>
            <h5 style="margin-top:0px;">${price} DKK</h5>
            <!-- Quantity select -->
            <div class="section" style="padding-bottom:20px;">
                <h6 class="title-attr"><small>Quantity</small></h6>                    
                <div>
                    <div class="btn-minus"><span class="glyphicon glyphicon-minus"></span></div>
                    <input value="1" />
                    <div class="btn-plus"><span class="glyphicon glyphicon-plus"></span></div>
                </div>
            </div>                
            <!-- Button addtocard -->
            <div class="section" style="padding-bottom:20px;">
                <a href="#" class="btn btn-primary">Add-to-cart</a>
            </div>
            <!-- Description -->
            <div class="Product-description">
                <p style="width: 50%; float:left">${description}</p>
            </div>
    </div>
</div>   
</div>`

    document.getElementById('product').innerHTML += (html)
}

fetch('./products.json')
  .then(response => response.json())
  .then(data => {
    let pid = parseInt(getParameterByName('id'))
    const filteredData = AttributeFilter(data.product_data, 'id', pid);
    console.log(filteredData)
    createProduct(filteredData[0])
  });
