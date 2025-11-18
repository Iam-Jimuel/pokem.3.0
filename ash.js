// DOM Elements
const startBtn = document.getElementById('start-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeModal = document.querySelector('.close');
const saveSettingsBtn = document.getElementById('save-settings');

// Event Listeners
startBtn.addEventListener('click', startGame);
settingsBtn.addEventListener('click', openSettings);
closeModal.addEventListener('click', closeSettings);
saveSettingsBtn.addEventListener('click', saveSettings);

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === settingsModal) {
        closeSettings();
    }
});

// Game Functions
function startGame() {
    window.location.href = 'game.html';
}

function openSettings() {
    settingsModal.style.display = 'block';
    
    // Load saved settings if available
    loadSettings();
}

function closeSettings() {
    settingsModal.style.display = 'none';
}

function saveSettings() {
    const volume = document.getElementById('volume').value;
    const difficulty = document.getElementById('difficulty').value;
    const soundEffects = document.getElementById('sound-effects').checked;
    
    // Save settings to localStorage
    const settings = {
        volume: volume,
        difficulty: difficulty,
        soundEffects: soundEffects
    };
    
    localStorage.setItem('pokemonGameSettings', JSON.stringify(settings));
    
    // Show confirmation
    alert('Settings saved successfully!');
    
    // Close the modal
    closeSettings();
}

function loadSettings() {
    const savedSettings = localStorage.getItem('pokemonGameSettings');
    
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        document.getElementById('volume').value = settings.volume;
        document.getElementById('difficulty').value = settings.difficulty;
        document.getElementById('sound-effects').checked = settings.soundEffects;
    }
}

// Add some interactive effects to the Pokemon display
const pokemonElements = document.querySelectorAll('.pokemon');

pokemonElements.forEach((pokemon, index) => {
    pokemon.addEventListener('mouseenter', () => {
        pokemon.style.transform = 'scale(1.1)';
        pokemon.style.transition = 'transform 0.3s ease';
    });
    
    pokemon.addEventListener('mouseleave', () => {
        pokemon.style.transform = 'scale(1)';
    });
    
    // Add a click effect that reveals a Pokemon (simulated)
    pokemon.addEventListener('click', () => {
        // this would show an actual Pokemon
        const pokemonNames = ['Pikachu', 'Charmander', 'Bulbasaur'];
        const originalContent = pokemon.innerHTML;
        
        pokemon.innerHTML = pokemonNames[index];
        pokemon.style.color = '#ff6600';
        pokemon.style.fontWeight = 'bold';
        
        setTimeout(() => {
            pokemon.innerHTML = originalContent;
            pokemon.style.color = '';
            pokemon.style.fontWeight = '';
        }, 1500);
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeSettings();
    }
    
    if (event.key === 'Enter' && settingsModal.style.display !== 'block') {
        startGame();
    }
});

// Initialize any default settings if none exist
if (!localStorage.getItem('pokemonGameSettings')) {
    const defaultSettings = {
        volume: 80,
        difficulty: 'medium',
        soundEffects: true
    };
    
    localStorage.setItem('pokemonGameSettings', JSON.stringify(defaultSettings));
}