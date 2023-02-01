
import { sumaCantProductos, actualizar, reload } from './modulo.js';

const templateItems = document.querySelector('#template-items').content;
const templateAlert = document.querySelector('#template-alert').content;
const templateTfooter = document.querySelector('#template-tfooter').content;
let tempResponse = {};

const fragment = document.createDocumentFragment();
const alerta = document.getElementById('alerta');
const items = document.getElementById('items');
const tfooter = document.getElementById('tfooter');
const btnDelItem = document.getElementById('btn-del-item');

(function () {
    if (JSON.parse(localStorage.getItem('productosCarts'))) {
        ini();
    } else {
        loadAlert();
    }
})();
/*+++++++++++++++++++++++++++Listener++++++++++++++++++++++++++++++++++++++++++*/
items.addEventListener('click', e => {
    btnOperacion(e);
})
tfooter.addEventListener('click', e => {
    clearStorage(e);
});


/*+++++++++++++++++++++++++++Functions++++++++++++++++++++++++++++++++++++++++++*/

function ini() {
    if (JSON.parse(window.localStorage.getItem('productosCarts'))) {
        tempResponse = JSON.parse(window.localStorage.getItem('productosCarts'));
        productSelect();
        footerSelect();
    } else {
        loadAlert();
    }
}

function clearStorage(e) {
    if (e.target.classList.contains('apagar')) {
        localStorage.removeItem('productosCarts');
        reload();
    }
}

const btnOperacion = e => {
    const prod = tempResponse[e.target.dataset.id];
    if (e.target.classList.contains('plus')) {
        prod.cant = tempResponse[e.target.dataset.id].cant + 1;
        tempResponse[e.target.dataset.id] = { ...prod };
        localStorage.setItem('productosCarts', JSON.stringify(tempResponse))
        actualizar();
        console.log(tempResponse[e.target.dataset.id].cant)
    } else if (e.target.classList.contains('minus')) {
        if (tempResponse[e.target.dataset.id].cant >= 2) {
            prod.cant = tempResponse[e.target.dataset.id].cant - 1;
            tempResponse[e.target.dataset.id] = { ...prod };
            localStorage.setItem('productosCarts', JSON.stringify(tempResponse));
            actualizar();
        } else if (tempResponse[e.target.dataset.id].cant <= 1) {
            modal(tempResponse[e.target.dataset.id]);
        }
    }
    window.localStorage.setItem('productosCarts', JSON.stringify(tempResponse));
    productSelect()
    footerSelect()
}
function loadAlert() {
    templateAlert.querySelector('.alert').textContent = "O carrinho de compras está vazio. Adicionar produtos na loja."
    const clone = templateAlert.cloneNode(true);
    fragment.appendChild(clone);
    alerta.appendChild(fragment);
}

function productSelect() {
    items.innerHTML = '';
    Object.values(tempResponse).forEach(producto => {
        templateItems.querySelector('th').textContent = producto.id;
        templateItems.querySelectorAll('td')[0].textContent = producto.descripcion;
        templateItems.querySelectorAll('td')[1].textContent = producto.cant;
        templateItems.querySelector('.plus').dataset.id = producto.id;
        templateItems.querySelector('.minus').dataset.id = producto.id;
        templateItems.querySelectorAll('td')[3].textContent = (producto.precio).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
        templateItems.querySelectorAll('td')[4].textContent = (producto.precio * producto.cant).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

        const clone = templateItems.cloneNode(true);
        fragment.appendChild(clone);
        items.appendChild(fragment);

    });
}

function footerSelect() {

    if (JSON.parse(window.localStorage.getItem('productosCarts'))) {
        tempResponse = JSON.parse(window.localStorage.getItem('productosCarts'));
        tfooter.innerHTML = '';
        templateTfooter.querySelector('.total').textContent = "Total";
        templateTfooter.querySelector('.cant-prod').textContent = sumaCantProductos();
        templateTfooter.querySelector('.tot-price').textContent = (sumaTotalCompra()).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });;
        const clone = templateTfooter.cloneNode(true);
        fragment.appendChild(clone);
        tfooter.appendChild(fragment);
    } else {
        console.log(loadAlert());

    }
}

function sumaTotalCompra() {
    let objectArray = [];
    let result = 0;
    Object.values(tempResponse).forEach(itemsCant => {
        const key = itemsCant.cant * itemsCant.precio;
        objectArray.push(key);
    });

    if (objectArray.length > 0) {
        result = objectArray.reduce((a, b) => a + b);
        return result
    } else {
        return result = 0;
    }
}

function modal(id) {
    let modalDelete = document.getElementById('staticBackdrop');
    var modal = new bootstrap.Modal(modalDelete);
    modal.show();
    btnDelItem.addEventListener('click', () => {
        deleteItem(id, modal);
    })
}
function deleteItem(id, modal) {
    delete tempResponse[id.id];
    localStorage.setItem('productosCarts', JSON.stringify(tempResponse));
    modal.hide();
    reload();
}
