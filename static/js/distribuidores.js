// Función para obtener los vendedores desde la API
async function obtenerVendedores() {
    try {
        const response = await fetch('https://d226-179-59-124-13.ngrok-free.app/api/vendedores/');
        if (!response.ok) {
            throw new Error('Error al obtener los vendedores');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

function crearTarjetaDistribuidor(distribuidor) {
    const card = document.createElement('div');
    card.className = 'distribuidor-card';
    card.setAttribute('data-id', distribuidor.id);

    let productosHTML = '';
    distribuidor.productos.forEach(producto => {
        const stockClass = producto.stock < 20 ? 'stock-bajo' : '';
        productosHTML += `
            <div class="producto-item">
                <span>${producto.nombre}</span>
                <span class="${stockClass}">${producto.stock} en stock</span>
                <span>Bs. ${producto.precio.toFixed(2)}</span>
            </div>
        `;
    });

    const nombreCompleto = `${distribuidor.nombres} ${distribuidor.apellidos}`;
    card.innerHTML = `
        <div class="distribuidor-header">
            <img src="${distribuidor.foto}" alt="${nombreCompleto}" class="distribuidor-foto">
            <div>
                <h2>${nombreCompleto}</h2>
                <div class="rating">★ ${distribuidor.rating.toFixed(1)}</div>
            </div>
        </div>
        <div class="distribuidor-body">
            ${productosHTML}
        </div>
        <div class="distribuidor-footer">
            <button class="whatsapp-btn" onclick="contactarWhatsApp('${distribuidor.telefonos[0].codigo}', '${distribuidor.telefonos[0].numero}')">
                <i class="fab fa-whatsapp"></i> Contactar
            </button>
            <button class="conocer-btn" onclick="mostrarPerfilDistribuidor(${distribuidor.id})">
                Conocer distribuidor
            </button>
        </div>
    `;

    return card;
}

function mostrarPerfilDistribuidor(id) {
    const distribuidor = distribuidores.find(d => d.id === id);
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    
    const fechaInicio = new Date(distribuidor.fechaInicio);
    const tiempoVendiendo = Math.floor((new Date() - fechaInicio) / (1000 * 60 * 60 * 24 * 365));
    const direccion = distribuidor.direcciones[0];

    modalContent.innerHTML = `
        <h2>${distribuidor.nombres} ${distribuidor.apellidos}</h2>
        <img src="${distribuidor.foto}" alt="${distribuidor.nombres}" class="modal-foto">
        <p>${distribuidor.descripcion}</p>
        <p><strong>Especialidad:</strong> ${distribuidor.especialidad}</p>
        <p><strong>Dirección:</strong> ${direccion.calle1} ${direccion.calle2}, ${direccion.zona}, ${direccion.ciudad}</p>
        <p><strong>Horario de atención:</strong> ${distribuidor.horario}</p>
        <p><strong>Vendiendo desde:</strong> ${fechaInicio.toLocaleDateString()} (${tiempoVendiendo} años)</p>
        <p><strong>Total de ventas:</strong> ${distribuidor.ventas}</p>
        <h3>Productos destacados:</h3>
        <ul>
            ${distribuidor.productos.map(p => `<li>${p.nombre} - Bs. ${p.precio.toFixed(2)}</li>`).join('')}
        </ul>
        <button class="whatsapp-btn" onclick="contactarWhatsApp('${distribuidor.telefonos[0].codigo}', '${distribuidor.telefonos[0].numero}')">
            <i class="fab fa-whatsapp"></i> Contactar por WhatsApp
        </button>
    `;

    modal.style.display = "block";
}

function contactarWhatsApp(codigo, numero) {
    const numeroCompleto = `+${codigo}${numero}`;
    window.open(`https://wa.me/${numeroCompleto}`, '_blank');
}

async function cargarDistribuidores() {
    const container = document.getElementById('distribuidoresContainer');
    container.innerHTML = '<p>Cargando distribuidores...</p>';
    
    try {
        const distribuidores = await obtenerVendedores();
        container.innerHTML = '';
        
        if (distribuidores.length === 0) {
            container.innerHTML = '<p>No se encontraron distribuidores disponibles.</p>';
            return;
        }

        distribuidores.forEach(distribuidor => {
            const card = crearTarjetaDistribuidor(distribuidor);
            container.appendChild(card);
        });
    } catch (error) {
        container.innerHTML = '<p>Error al cargar los distribuidores. Por favor, intente más tarde.</p>';
        console.error('Error:', error);
    }
}

function filtrarDistribuidores(searchTerm) {
    const container = document.getElementById('distribuidoresContainer');
    container.innerHTML = '';
    
    const filteredDistribuidores = distribuidores.filter(distribuidor => 
        `${distribuidor.nombres} ${distribuidor.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        distribuidor.productos.some(producto =>
            producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (filteredDistribuidores.length === 0) {
        container.innerHTML = '<p>No se encontraron resultados para su búsqueda.</p>';
        return;
    }

    filteredDistribuidores.forEach(distribuidor => {
        const card = crearTarjetaDistribuidor(distribuidor);
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    cargarDistribuidores();

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        filtrarDistribuidores(e.target.value);
    });

    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});