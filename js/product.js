import { actualizar} from "./modulo.js";

// constantes  ----------------------------------
const cards = document.getElementById("cards");
const templateCardProducts = document.getElementById("template-card-products").content;
const fragment = document.createDocumentFragment();


/* --------localStorage productsToSee -------- */
const productsToSee = localStorage.getItem("department");
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const fetchData = async () => {
  try {
    const res = await fetch("../json/product.json");
    const data = await res.json();
    data.forEach((element) => {
      if (productsToSee == 'all') {
        templateCardProducts.querySelector("h6").textContent = element.nombre;
        templateCardProducts.querySelector("span").textContent = element.price;
        templateCardProducts.querySelector("img").setAttribute("src", element.urlImage);
        templateCardProducts.querySelector(".shopping-cart").dataset.id = element.idProduct;

        const clone = templateCardProducts.cloneNode(true);
        fragment.appendChild(clone);

      } else if (element.department == productsToSee) {
        templateCardProducts.querySelector("h6").textContent = element.nombre;
        templateCardProducts.querySelector("span").textContent = element.price;
        templateCardProducts.querySelector("img").setAttribute("src", element.urlImage);
        templateCardProducts.querySelector(".shopping-cart").dataset.id = element.idProduct;

        const clone = templateCardProducts.cloneNode(true);
        fragment.appendChild(clone);
      }
      cards.appendChild(fragment);
    });
  } catch (error) {
    console.log(error);
  }
};

/* --------detectando clic en el card -------- */

cards.addEventListener("click", e => {
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

