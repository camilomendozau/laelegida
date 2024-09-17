// Función para abrir/cerrar el menú hamburguesa
function toggleHamburgerMenu() {
    var menu = document.getElementById('hamburgerMenu');
    menu.classList.toggle('active');
}

// Redirigir al hacer clic en el logo
document.querySelector('.logo').addEventListener('click', function() {
    window.location.href = 'index.html';
});

// Cerrar el menú al hacer clic fuera del menú
window.addEventListener('click', function(e) {
    var menu = document.getElementById('hamburgerMenu');
    var menuButton = document.querySelector('.menu-button');

    // Si el clic no fue en el menú o en el botón del menú, cerrarlo
    if (!menu.contains(e.target) && !menuButton.contains(e.target)) {
        menu.classList.remove('active');
    }
});




















// Función para abrir/cerrar el dropdown de categorías
function toggleCategoriesDropdown() {
    var dropdown = document.getElementById('categoriesDropdown');
    dropdown.classList.toggle('active');
}

// Cerrar el dropdown de categorías al hacer clic fuera del dropdown
window.addEventListener('click', function(e) {
    var dropdown = document.getElementById('categoriesDropdown');
    var categoriesButton = document.querySelector('.categories-button');

    // Si el clic no fue en el dropdown ni en el botón de categorías, cerrarlo
    if (!dropdown.contains(e.target) && !categoriesButton.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// Redirigir al hacer clic en el botón del carrito (opcional, si necesitas redirigir a una página de carrito)
document.querySelector('.cart-button').addEventListener('click', function() {
    window.location.href = 'cart.html'; // Cambia 'cart.html' por la URL de tu página de carrito
});
