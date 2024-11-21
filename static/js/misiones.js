const missionList = document.getElementById('missionList');
const noMissions = document.getElementById('noMissions');
const nextMissions = document.getElementById('nextMissions');
const countdown = document.getElementById('countdown');

const allMissions = [
    { id: 1, name: "Iniciar sesión", reward: 50, completed: false, progress: 0, target: 1 },
    { id: 2, name: "Compartir 3 productos", reward: 100, completed: false, progress: 0, target: 3 },
    { id: 3, name: "Realizar una compra", reward: 200, completed: false, progress: 0, target: 1 },
    { id: 4, name: "Invitar a un amigo", reward: 150, completed: false, progress: 0, target: 1 },
    { id: 5, name: "Dejar una reseña", reward: 75, completed: false, progress: 0, target: 1 },
    { id: 6, name: "Visitar 5 productos", reward: 80, completed: false, progress: 0, target: 5 },
    { id: 7, name: "Agregar al carrito", reward: 60, completed: false, progress: 0, target: 2 },
    { id: 8, name: "Completar perfil", reward: 90, completed: false, progress: 0, target: 1 }
];

let availableMissions = [];
let nextRefresh = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // Next day

function getRandomMissions() {
    const shuffled = [...allMissions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
}

function updateMissionList() {
    missionList.innerHTML = '';
    if (availableMissions.length > 0) {
        availableMissions.forEach((mission) => {
            const missionItem = document.createElement('div');
            missionItem.className = `mission-item ${mission.completed ? 'mission-completed' : ''}`;
            const progressPercentage = (mission.progress / mission.target) * 100;
            missionItem.innerHTML = `
                <h2>${mission.name}</h2>
                <div class="progress-bar">
                    <div class="progress-bar-fill" style="width: ${progressPercentage}%"></div>
                </div>
                <div class="mission-progress">
                    <span>Progreso: ${mission.progress}/${mission.target}</span>
                    <span class="mission-reward">+${mission.reward} pts</span>
                </div>
                ${mission.completed ? 
                    '<div class="mission-completed">Completada</div>' : 
                    `<label for="image-upload-${mission.id}" class="upload-button">
                        Subir comprobante
                        <input type="file" id="image-upload-${mission.id}" class="hidden" accept="image/*" />
                    </label>`
                }
            `;
            missionList.appendChild(missionItem);

            if (!mission.completed) {
                const imageInput = missionItem.querySelector(`#image-upload-${mission.id}`);
                imageInput.addEventListener('change', (event) => handleImageUpload(mission, event));
            }
        });
        noMissions.style.display = 'none';
        nextMissions.style.display = 'none';
    } else {
        noMissions.style.display = 'block';
        nextMissions.style.display = 'block';
        updateCountdown();
    }
}

function handleImageUpload(mission, event) {
    const file = event.target.files[0];
    if (file) {
        console.log(`Imagen subida para la misión ${mission.id}: ${file.name}`);
        mission.completed = true;
        mission.progress = mission.target;
        
        const missionItem = event.target.closest('.mission-item');
        missionItem.classList.add('mission-completed');
        
        // Animación de la barra de progreso
        const progressBar = missionItem.querySelector('.progress-bar-fill');
        progressBar.style.width = '100%';
        
        setTimeout(() => {
            updateMissionList();
            alert(`Misión "${mission.name}" completada con éxito. Has ganado ${mission.reward} puntos.`);
        }, 1000);
    }
}

function updateCountdown() {
    const now = new Date();
    const timeLeft = nextRefresh - now;
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    countdown.textContent = `${hours}h ${minutes}m`;
}

function refreshMissions() {
    availableMissions = getRandomMissions();
    nextRefresh = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    updateMissionList();
}

// Inicializar misiones
refreshMissions();

// Actualizar la cuenta regresiva cada minuto
setInterval(updateCountdown, 60000);

// Refrescar misiones cada 24 horas
setInterval(refreshMissions, 24 * 60 * 60 * 1000);