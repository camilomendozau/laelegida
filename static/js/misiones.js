// script.js
document.addEventListener('DOMContentLoaded', () => {
    const missionList = document.getElementById('missionList');
    const noMissions = document.getElementById('noMissions');
    const nextMissions = document.getElementById('nextMissions');

    const missions = [
        {
            id: 1,
            title: "Visitar 5 productos",
            progress: "0/5",
            points: "+80 pts",
            description: "Para completar esta misión, debes visitar 5 productos diferentes en nuestra tienda. Navega por las diferentes categorías y haz clic en los productos para conocer más detalles."
        },
        {
            id: 2,
            title: "Iniciar sesión",
            progress: "0/1",
            points: "+50 pts",
            description: "Inicia sesión en tu cuenta para completar esta misión. Si aún no tienes una cuenta, puedes crear una de manera gratuita."
        }
    ];

    function createMissionCard(mission) {
        const card = document.createElement('div');
        card.className = 'mission-card';
        card.innerHTML = `
            <div class="mission-header">
                <div>
                    <h2 class="mission-title">${mission.title}</h2>
                    <p class="mission-progress">Progreso: ${mission.progress}</p>
                </div>
                <span class="mission-points">${mission.points}</span>
            </div>
            <button class="btn btn-blue" data-mission-id="${mission.id}">Cumplir Tarea</button>
            <div class="mission-details hidden" id="details-${mission.id}">
                <p class="mission-description">${mission.description}</p>
                <button class="btn btn-green" data-mission-id="${mission.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    Subir Comprobante
                </button>
            </div>
        `;
        return card;
    }

    function renderMissions() {
        missionList.innerHTML = '';
        if (missions.length === 0) {
            noMissions.classList.remove('hidden');
            nextMissions.classList.remove('hidden');
        } else {
            noMissions.classList.add('hidden');
            nextMissions.classList.add('hidden');
            missions.forEach(mission => {
                missionList.appendChild(createMissionCard(mission));
            });
        }
    }

    function toggleMissionDetails(missionId) {
        const detailsElement = document.getElementById(`details-${missionId}`);
        const button = document.querySelector(`button[data-mission-id="${missionId}"]`);
        if (detailsElement.classList.contains('hidden')) {
            detailsElement.classList.remove('hidden');
            button.textContent = 'Ocultar Detalles';
        } else {
            detailsElement.classList.add('hidden');
            button.textContent = 'Cumplir Tarea';
        }
    }

    function handleFileUpload(missionId) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*,.pdf';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                console.log('File selected:', file);
                // Aquí puedes agregar la lógica para manejar la subida del archivo
            }
        };
        input.click();
    }

    missionList.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (button) {
            const missionId = button.getAttribute('data-mission-id');
            if (button.classList.contains('btn-blue')) {
                toggleMissionDetails(missionId);
            } else if (button.classList.contains('btn-green')) {
                handleFileUpload(missionId);
            }
        }
    });

    renderMissions();
});