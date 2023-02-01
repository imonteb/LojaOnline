
import  {actualizar} from './modulo.js';
 

const btnHeader = document.querySelectorAll(".btn-header");
const catalogLink = document.querySelector(".catalogo");
const shoppingCart = document.querySelector(".shopping-cart");

(()=>{
   actualizar()     
})();

catalogLink.addEventListener("click", function (all) {
        localStorage.setItem('department', 'all');
});

btnHeader.forEach(boton => {
        boton.addEventListener("click", function (event) {
                localStorage.setItem('department', this.id);
                window.open('../html/catalogo.html', '_self');
        });
});

shoppingCart.addEventListener("click", function () {
        window.open('../../html/shoppingcart.html', '_self');
});


 



      





