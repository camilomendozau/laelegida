const missionToggle = document.getElementById('missionToggle');
const missionPopup = document.getElementById('missionPopup');
const missionList = document.getElementById('missionList');
const noMissions = document.getElementById('noMissions');
const nextMissions = document.getElementById('nextMissions');
const countdown = document.getElementById('countdown');

const loginMission = { id: 1, name: "Iniciar sesión", progress: 0, target: 1, reward: 50, completed: false };

let missions = [
    { id: 2, name: "Compartir 3 productos", progress: 0, target: 3, reward: 100, completed: false },
    { id: 3, name: "Realizar una compra", progress: 0, target: 1, reward: 200, completed: false },
    { id: 4, name: "Invitar a un amigo", progress: 0, target: 1, reward: 150, completed: false },
    { id: 5, name: "Dejar una reseña", progress: 0, target: 1, reward: 75, completed: false },
    { id: 6, name: "Visitar 5 productos", progress: 0, target: 5, reward: 80, completed: false },
    { id: 7, name: "Agregar al carrito", progress: 0, target: 2, reward: 60, completed: false },
    { id: 8, name: "Completar perfil", progress: 0, target: 1, reward: 90, completed: false },
    { id: 9, name: "Seguir en redes", progress: 0, target: 2, reward: 70, completed: false },
    { id: 10, name: "Compra de $100+", progress: 0, target: 1, reward: 250, completed: false },
];

let availableMissions = [];
let nextRefresh = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // Next day

function updateMissionList() {
    missionList.innerHTML = '';
    if (availableMissions.length > 0) {
        availableMissions.forEach((mission, index) => {
            const missionItem = document.createElement('div');
            missionItem.className = `mission-item ${mission.completed ? 'completed' : ''}`;
            missionItem.innerHTML = `
                <div class="mission-name">${mission.name}</div>
                <div class="mission-progress">${mission.progress}/${mission.target}</div>
                <div class="mission-reward">+${mission.reward} pts</div>
                ${mission.completed ? '<div class="mission-check">✓</div>' : ''}
            `;
            missionList.appendChild(missionItem);
        });
        noMissions.style.display = 'none';
        nextMissions.style.display = 'none';
    } else {
        noMissions.style.display = 'block';
        nextMissions.style.display = 'block';
        updateCountdown();
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
    const randomMissions = missions
        .sort(() => 0.5 - Math.random())
        .slice(0, 5)
        .map(mission => ({ ...mission, progress: 0, completed: false }));
    
    availableMissions = [
        { ...loginMission, progress: 0, completed: false },
        ...randomMissions
    ];
    
    nextRefresh = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    updateMissionList();
}

missionToggle.addEventListener('click', () => {
    missionPopup.classList.toggle('hidden');
    if (!missionPopup.classList.contains('hidden')) {
        updateMissionList();
    }
});

function updateMissionProgress(missionId, progress) {
    const mission = availableMissions.find(m => m.id === missionId);
    if (mission) {
        mission.progress = Math.min(mission.target, mission.progress + progress);
        if (mission.progress === mission.target && !mission.completed) {
            mission.completed = true;
            // Aquí actualizarías los puntos del usuario
            console.log(`Misión completada: ${mission.name}. Recompensa: ${mission.reward} puntos`);
        }
        updateMissionList();
    }
}

// Simulando el progreso de las misiones (para fines de demostración)
setInterval(() => {
    availableMissions.forEach(mission => {
        if (Math.random() < 0.1 && !mission.completed) {
            updateMissionProgress(mission.id, 1);
        }
    });
    
    if (availableMissions.slice(1).every(mission => mission.completed)) {
        refreshMissions();
    }
}, 5000); // Comprobar cada 5 segundos

// Actualizar la cuenta regresiva cada minuto
setInterval(updateCountdown, 60000);

// Configuración inicial de las misiones
refreshMissions();