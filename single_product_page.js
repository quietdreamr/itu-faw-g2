function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
var foo = getParameterByName('id'); 

function AttributeFilter(attribute, value) {
  let filtered_results = results.filter(wine => wine[attribute] === value);
  return filtered_results;
}

if(foo != null) {
var product = AttributeFilter("id", foo)
} else {
    window.location.href = "./index.html"
}

function createProduct(product) {
    let data = product[id]
    let name = data['name']
    let price = data['price']
    let description = data['description']
    let image = data['image']
    let id = data['id']
    let producer = data ['brand']
    let country = data ['country']

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

    document.getElementById('flex-conainer').innerHTML += (html)
}