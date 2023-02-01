import { actualizar} from "./modulo.js";
let saludoSegunHora ="";
function horaDia() {
    // crea un nuevo objeto `Date`
    var today = new Date();

    // obtener la hora en la configuración regional de 
    var dia = today.toLocaleDateString('pt-PT');
    var now = today.toLocaleTimeString('pt-PT');
    var fecha = document.getElementById("fecha");
    fecha.innerHTML = "Atualizado em "+dia +" às " +now+" horas "; 
    
    var manana= new Date('1/1/1990 00:00');
    var tarde= new Date('1/1/1990 12:00');
    var noche= new Date('1/1/1990 19:00');
    
    if ((now > '00:00:01') && (now < '12:00:00') ){
        saludoSegunHora= "Bom Dia Portugal! ";
    }else if((now > '12:00:00') && (now < '19:00:00')){
        saludoSegunHora= "Boa tarde Portugal! ";
    }else{
        saludoSegunHora= "Boa noite Portugal!";
    }

    return saludoSegunHora;
}
let saludo = document.getElementById("saludo");
saludo.innerText=horaDia();
/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

// constantes  ----------------------------------
const cardsPortada = document.getElementById("cards-portada");
const templateCardProductsPortada = document.getElementById("template-card-products-portada").content;
const fragment = document.createDocumentFragment();


/* --------localStorage productsToSee -------- */
//const productsToSee = localStorage.getItem("department");
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const fetchData = async () => {
  try {
    const res = await fetch("../json/product.json");
    const data = await res.json();
    data.forEach((element) => {

      if (element.idProduct == 13 || element.idProduct == 14 ) {
        templateCardProductsPortada.querySelector("h6").textContent = element.nombre;
        templateCardProductsPortada.querySelector("span").textContent = element.price;
        templateCardProductsPortada.querySelector("img").setAttribute("src", element.urlImage);
        templateCardProductsPortada.querySelector(".shopping-cart").dataset.id = element.idProduct;

        const clone = templateCardProductsPortada.cloneNode(true);
        fragment.appendChild(clone);

      } 
      cardsPortada.appendChild(fragment);
    });
  } catch (error) {
    console.log(error);
  }
};

/* --------detectando clic en el card -------- */

cardsPortada.addEventListener("click", e => {
  getIdProductSelect(e);
});

function getIdProductSelect(e) {

  if (e.target.classList.contains('shopping-cart')) {
    const cardSelect = e.target.parentElement.parentElement;
    ObjCarts(cardSelect);
  }
  e.stopPropagation();
}

function ObjCarts(cardSelect) {

  let producto = {
    id: cardSelect.querySelector('button').dataset.id,
    descripcion: cardSelect.querySelector('h6').textContent,
    precio: cardSelect.querySelector('span').textContent,
    cant: 1
  }
  if (JSON.parse(localStorage.getItem('productosCarts'))) {
    let tempStorage = JSON.parse(localStorage.getItem('productosCarts'));
    if (tempStorage.hasOwnProperty(producto.id)) {
      producto.cant = tempStorage[producto.id].cant + 1;
      tempStorage[producto.id] = { ...producto };
    } else {
      tempStorage[producto.id] = { ...producto };
    }
    localStorage.setItem('productosCarts', JSON.stringify(tempStorage))
    actualizar();
  } else {
    let tempStorage2 = {}
    tempStorage2[producto.id] = { ...producto };
    localStorage.setItem('productosCarts', JSON.stringify(tempStorage2));
    actualizar();
  }
}