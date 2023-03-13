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
    addUserName();
  
  });