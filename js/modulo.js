
let tempResponse = {}

function sumaCantProductos() {

    let objectArray = [];
    let result = 0;
    if (JSON.parse(localStorage.getItem('productosCarts'))) {
        tempResponse = JSON.parse(localStorage.getItem('productosCarts'));
        Object.values(tempResponse).forEach(itemsCant => {
            const key = itemsCant['cant'];
            objectArray.push(key);
        });
        if (objectArray.length > 0) {
            result = objectArray.reduce((a, b) => a + b);
            return result
        }else{
            return result=0;
        }        
    }
}
function reload() {
    let url = window.location;
    window.open(url, '_self');
}

function actualizar() {
    let cant = sumaCantProductos();
    document.getElementById('product-in-cart').textContent = cant;
};



export { sumaCantProductos, reload, actualizar };