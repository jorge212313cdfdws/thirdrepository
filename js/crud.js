window.onload = initialize;

let editIndex = null;  // Variable para saber si estamos editando un producto

function initialize() {
    loadProducts();  // Cargar productos desde localStorage

    // Manejo del formulario de agregar o editar producto
    document.getElementById("form-product").addEventListener("submit", function (event) {
        event.preventDefault();

        let productName = document.getElementById("product-name").value;
        let productPrice = document.getElementById("product-price").value;

        if (productName && productPrice) {
            if (editIndex === null) {
                // Crear un nuevo producto
                addProduct(productName, productPrice);
            } else {
                // Editar producto existente
                updateProduct(editIndex, productName, productPrice);
            }
            resetForm();  // Limpiar el formulario
        }
    });
}

// Cargar productos desde localStorage
function loadProducts() {
    let products = getProducts();
    let productsList = document.getElementById("products-list");
    productsList.innerHTML = '';  // Limpiar la lista antes de agregar productos

    products.forEach((product, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Eliminar</button>
            </td>
        `;
        productsList.appendChild(row);
    });
}

// Obtener productos desde localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

// Agregar un nuevo producto
function addProduct(name, price) {
    let products = getProducts();
    products.push({ name, price });
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts();  // Recargar la lista de productos
}

// Editar un producto
function editProduct(index) {
    let products = getProducts();
    let product = products[index];

    // Rellenar los campos del formulario con los datos del producto
    document.getElementById("product-name").value = product.name;
    document.getElementById("product-price").value = product.price;

    // Actualizar la variable editIndex
    editIndex = index;
}

// Actualizar un producto
function updateProduct(index, name, price) {
    let products = getProducts();
    products[index] = { name, price };
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts();  // Recargar la lista de productos
}

// Eliminar un producto
function deleteProduct(index) {
    let products = getProducts();
    products.splice(index, 1);  // Eliminar el producto en el índice especificado
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts();  // Recargar la lista de productos
}

// Restablecer el formulario después de agregar o editar
function resetForm() {
    document.getElementById("product-name").value = '';
    document.getElementById("product-price").value = '';
    editIndex = null;  // Limpiar el índice de edición
}
