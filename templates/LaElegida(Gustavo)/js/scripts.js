$(document).ready(function() {
    const products = [
        { id: 1, name: "Aceite de Oliva Extra Virgen", price: 9.99, image: "https://via.placeholder.com/300x200.png?text=Aceite+de+Oliva" },
        { id: 2, name: "Pasta Integral", price: 2.49, image: "https://via.placeholder.com/300x200.png?text=Pasta+Integral" },
        { id: 3, name: "Salsa de Tomate Orgánica", price: 3.99, image: "https://via.placeholder.com/300x200.png?text=Salsa+de+Tomate" },
        { id: 4, name: "Quinua", price: 5.99, image: "https://via.placeholder.com/300x200.png?text=Quinoa" },
        { id: 5, name: "Miel Pura", price: 7.99, image: "https://via.placeholder.com/300x200.png?text=Miel+Pura" },
        { id: 6, name: "Café Gourmet", price: 12.99, image: "https://via.placeholder.com/300x200.png?text=Café+Gourmet" },
    ];

    const productsContainer = $('#products-container');

    products.forEach(product => {
        const productHtml = `
            <div class="col-md-4 mb-4">
                <div class="card product-card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text text-secondary">${product.price.toFixed(2)} Bs.</p>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-primary btn-sm">Comprar</button>
                            <button class="btn btn-outline-primary btn-sm">Ver detalles</button>
                            <button class="btn btn-outline-secondary btn-sm add-to-cart"><i class="fas fa-shopping-cart"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productsContainer.append(productHtml);
    });

    // Funcionalidad del carrito
    let cartItems = 0;
    $('.add-to-cart').click(function(e) {
        e.preventDefault();
        cartItems++;
        alert(`Producto añadido al carrito. Total de items: ${cartItems}`);
    });

    // Inicializar el carrusel de Bootstrap
    new bootstrap.Carousel(document.querySelector('#productCarousel'), {
        interval: 3000,
        wrap: true
    });
});