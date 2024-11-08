const distribuidores = [
    {
        id: 1,
        nombre: "María González",
        rating: 4.5,
        foto: "https://i.pravatar.cc/150?img=1",
        productos: [
            { nombre: "Manzanas", stock: 100, precio: 2.50 },
            { nombre: "Plátanos", stock: 150, precio: 1.80 },
            { nombre: "Fresas", stock: 5, precio: 3.20 }
        ],
        descripcion: "María es una apasionada distribuidora de frutas frescas con más de 10 años de experiencia.",
        fechaInicio: "2013-05-15",
        ventas: 1500,
        whatsapp: "+59170123456",
        direccion: "Calle Los Frutales 123, Santa Cruz",
        horario: "Lunes a Sábado: 8:00 AM - 6:00 PM",
        especialidad: "Frutas tropicales y de estación"
    },
    {
        id: 2,
        nombre: "Carlos Rodríguez",
        rating: 4.2,
        foto: "https://i.pravatar.cc/150?img=2",
        productos: [
            { nombre: "Filete de res", stock: 30, precio: 15.00 },
            { nombre: "Pollo entero", stock: 25, precio: 8.50 },
            { nombre: "Chuletas de cerdo", stock: 40, precio: 7.20 }
        ],
        descripcion: "Carlos es conocido por ofrecer las mejores carnes de la región, criadas de manera sostenible.",
        fechaInicio: "2015-03-20",
        ventas: 1200,
        whatsapp: "+59170234567",
        direccion: "Avenida de los Ganaderos 456, Cochabamba",
        horario: "Martes a Domingo: 7:00 AM - 7:00 PM",
        especialidad: "Cortes premium y carnes orgánicas"
    },
    {
        id: 3,
        nombre: "Ana Martínez",
        rating: 4.8,
        foto: "https://i.pravatar.cc/150?img=3",
        productos: [
            { nombre: "Leche fresca", stock: 200, precio: 1.20 },
            { nombre: "Queso fresco", stock: 50, precio: 3.50 },
            { nombre: "Yogurt natural", stock: 10, precio: 2.00 }
        ],
        descripcion: "Ana proviene de una familia con tradición en la producción de lácteos de alta calidad.",
        fechaInicio: "2018-09-10",
        ventas: 2000,
        whatsapp: "+59170345678",
        direccion: "Calle de los Lácteos 789, La Paz",
        horario: "Lunes a Viernes: 6:00 AM - 8:00 PM",
        especialidad: "Productos lácteos artesanales y orgánicos"
    }
];

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

    card.innerHTML = `
        <div class="distribuidor-header">
            <img src="${distribuidor.foto}" alt="${distribuidor.nombre}" class="distribuidor-foto">
            <div>
                <h2>${distribuidor.nombre}</h2>
                <div class="rating">★ ${distribuidor.rating.toFixed(1)}</div>
            </div>
        </div>
        <div class="distribuidor-body">
            ${productosHTML}
        </div>
        <div class="distribuidor-footer">
            <button class="whatsapp-btn" onclick="contactarWhatsApp('${distribuidor.whatsapp}')">
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

    modalContent.innerHTML = `
        <h2>${distribuidor.nombre}</h2>
        <img src="${distribuidor.foto}" alt="${distribuidor.nombre}" class="modal-foto">
        <p>${distribuidor.descripcion}</p>
        <p><strong>Especialidad:</strong> ${distribuidor.especialidad}</p>
        <p><strong>Dirección:</strong> ${distribuidor.direccion}</p>
        <p><strong>Horario de atención:</strong> ${distribuidor.horario}</p>
        <p><strong>Vendiendo desde:</strong> ${fechaInicio.toLocaleDateString()} (${tiempoVendiendo} años)</p>
        <p><strong>Total de ventas:</strong> ${distribuidor.ventas}</p>
        <h3>Productos destacados:</h3>
        <ul>
            ${distribuidor.productos.map(p => `<li>${p.nombre} - Bs. ${p.precio.toFixed(2)}</li>`).join('')}
        </ul>
        <button class="whatsapp-btn" onclick="contactarWhatsApp('${distribuidor.whatsapp}')">
            <i class="fab fa-whatsapp"></i> Contactar por WhatsApp
        </button>
    `;

    modal.style.display = "block";
}

function contactarWhatsApp(numero) {
    window.open(`https://wa.me/${numero}`, '_blank');
}

function cargarDistribuidores() {
    const container = document.getElementById('distribuidoresContainer');
    distribuidores.forEach(distribuidor => {
        const card = crearTarjetaDistribuidor(distribuidor);
        container.appendChild(card);
    });
}

function filtrarDistribuidores(searchTerm) {
    const container = document.getElementById('distribuidoresContainer');
    container.innerHTML = '';
    
    const filteredDistribuidores = distribuidores.filter(distribuidor => 
        
        distribuidor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        distribuidor.productos.some(producto =>
            producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

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