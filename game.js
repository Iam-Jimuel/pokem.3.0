// Pokemon data with 50 Pokemon and their GIF URLs
const pokemonData = [
    { id: 1, name: "Bulbasaur", type: "Grass/Poison", price: 500, gif: "https://projectpokemon.org/images/normal-sprite/bulbasaur.gif" },
    { id: 2, name: "Ivysaur", type: "Grass/Poison", price: 800, gif: "https://projectpokemon.org/images/normal-sprite/ivysaur.gif" },
    { id: 3, name: "Venusaur", type: "Grass/Poison", price: 1200, gif: "https://projectpokemon.org/images/normal-sprite/venusaur.gif" },
    { id: 4, name: "Charmander", type: "Fire", price: 500, gif: "https://projectpokemon.org/images/normal-sprite/charmander.gif" },
    { id: 5, name: "Charmeleon", type: "Fire", price: 800, gif: "https://projectpokemon.org/images/normal-sprite/charmeleon.gif" },
    { id: 6, name: "Charizard", type: "Fire/Flying", price: 1200, gif: "https://projectpokemon.org/images/normal-sprite/charizard.gif" },
    { id: 7, name: "Squirtle", type: "Water", price: 500, gif: "https://projectpokemon.org/images/normal-sprite/squirtle.gif" },
    { id: 8, name: "Wartortle", type: "Water", price: 800, gif: "https://projectpokemon.org/images/normal-sprite/wartortle.gif" },
    { id: 9, name: "Blastoise", type: "Water", price: 1200, gif: "https://projectpokemon.org/images/normal-sprite/blastoise.gif" },
    { id: 10, name: "Caterpie", type: "Bug", price: 100, gif: "https://projectpokemon.org/images/normal-sprite/caterpie.gif" },
    { id: 11, name: "Metapod", type: "Bug", price: 200, gif: "https://projectpokemon.org/images/normal-sprite/metapod.gif" },
    { id: 12, name: "Butterfree", type: "Bug/Flying", price: 600, gif: "https://projectpokemon.org/images/normal-sprite/butterfree.gif" },
    { id: 13, name: "Weedle", type: "Bug/Poison", price: 100, gif: "https://projectpokemon.org/images/normal-sprite/weedle.gif" },
    { id: 14, name: "Kakuna", type: "Bug/Poison", price: 200, gif: "https://projectpokemon.org/images/normal-sprite/kakuna.gif" },
    { id: 15, name: "Beedrill", type: "Bug/Poison", price: 600, gif: "https://projectpokemon.org/images/normal-sprite/beedrill.gif" },
    { id: 16, name: "Pidgey", type: "Normal/Flying", price: 200, gif: "https://projectpokemon.org/images/normal-sprite/pidgey.gif" },
    { id: 17, name: "Pidgeotto", type: "Normal/Flying", price: 500, gif: "https://projectpokemon.org/images/normal-sprite/pidgeotto.gif" },
    { id: 18, name: "Pidgeot", type: "Normal/Flying", price: 900, gif: "https://projectpokemon.org/images/normal-sprite/pidgeot.gif" },
    { id: 19, name: "Rattata", type: "Normal", price: 150, gif: "https://projectpokemon.org/images/normal-sprite/rattata.gif" },
    { id: 20, name: "Raticate", type: "Normal", price: 400, gif: "https://projectpokemon.org/images/normal-sprite/raticate.gif" },
    { id: 21, name: "Spearow", type: "Normal/Flying", price: 200, gif: "https://projectpokemon.org/images/normal-sprite/spearow.gif" },
    { id: 22, name: "Fearow", type: "Normal/Flying", price: 600, gif: "https://projectpokemon.org/images/normal-sprite/fearow.gif" },
    { id: 23, name: "Ekans", type: "Poison", price: 300, gif: "https://projectpokemon.org/images/normal-sprite/ekans.gif" },
    { id: 24, name: "Arbok", type: "Poison", price: 700, gif: "https://projectpokemon.org/images/normal-sprite/arbok.gif" },
    { id: 25, name: "Pikachu", type: "Electric", price: 800, gif: "https://projectpokemon.org/images/normal-sprite/pikachu.gif" },
    { id: 26, name: "Raichu", type: "Electric", price: 1100, gif: "https://projectpokemon.org/images/normal-sprite/raichu.gif" },
    { id: 27, name: "Sandshrew", type: "Ground", price: 300, gif: "https://projectpokemon.org/images/normal-sprite/sandshrew.gif" },
    { id: 28, name: "Sandslash", type: "Ground", price: 700, gif: "https://projectpokemon.org/images/normal-sprite/sandslash.gif" },
    { id: 29, name: "Nidoran♀", type: "Poison", price: 350, gif: "https://projectpokemon.org/home/uploads/monthly_2017_11/large.Animated.gif.f2f8eadc8800f8ef17b706e10f99529e.gif" },
    { id: 30, name: "Clefairy", type: "Fairy", price: 400, gif: "https://projectpokemon.org/images/normal-sprite/clefairy.gif" },
    { id: 31, name: "Clefable", type: "Fairy", price: 900, gif: "https://projectpokemon.org/images/normal-sprite/clefable.gif" },
    { id: 32, name: "Vulpix", type: "Fire", price: 500, gif: "https://projectpokemon.org/images/normal-sprite/vulpix.gif" },
    { id: 33, name: "Ninetales", type: "Fire", price: 1000, gif: "https://projectpokemon.org/images/normal-sprite/ninetales.gif" },
    { id: 34, name: "Jigglypuff", type: "Normal/Fairy", price: 400, gif: "https://projectpokemon.org/images/normal-sprite/jigglypuff.gif" },
    { id: 35, name: "Wigglytuff", type: "Normal/Fairy", price: 900, gif: "https://projectpokemon.org/images/normal-sprite/wigglytuff.gif" },
    { id: 36, name: "Zubat", type: "Poison/Flying", price: 150, gif: "https://projectpokemon.org/images/normal-sprite/zubat.gif" },
    { id: 37, name: "Golbat", type: "Poison/Flying", price: 600, gif: "https://projectpokemon.org/images/normal-sprite/golbat.gif" },
    { id: 38, name: "Oddish", type: "Grass/Poison", price: 250, gif: "https://projectpokemon.org/images/normal-sprite/oddish.gif" },
    { id: 39, name: "Gloom", type: "Grass/Poison", price: 500, gif: "https://projectpokemon.org/images/normal-sprite/gloom.gif" },
    { id: 40, name: "Vileplume", type: "Grass/Poison", price: 900, gif: "https://projectpokemon.org/images/normal-sprite/vileplume.gif" },
    { id: 41, name: "Paras", type: "Bug/Grass", price: 200, gif: "https://projectpokemon.org/images/normal-sprite/paras.gif" },
    { id: 42, name: "Parasect", type: "Bug/Grass", price: 600, gif: "https://projectpokemon.org/images/normal-sprite/parasect.gif" },
    { id: 43, name: "Venonat", type: "Bug/Poison", price: 300, gif: "https://projectpokemon.org/images/normal-sprite/venonat.gif" },
    { id: 44, name: "Venomoth", type: "Bug/Poison", price: 700, gif: "https://projectpokemon.org/images/normal-sprite/venomoth.gif" },
    { id: 45, name: "Diglett", type: "Ground", price: 200, gif: "https://projectpokemon.org/images/normal-sprite/diglett.gif" }
];

// Game State
let gameState = {
    playerName: "Jim",
    coins: 5000,
    selectedPokemon: 20,
    ownedPokemon: [1, 4, 6, 8, 10, 13, 16, 19, 21, 23, 25, 27, 29, 32, 35, 37, 39, 41, 43, 45],
    currentAvatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/1.png",
    marketplacePage: 1,
    itemsPerPage: 12
};

// DOM Elements
const playerNameElement = document.getElementById('player-name');
const coinAmountElement = document.getElementById('coin-amount');
const playerAvatarElement = document.getElementById('player-avatar');
const selectedPokemonGif = document.getElementById('selected-pokemon-gif');
const selectedPokemonName = document.getElementById('selected-pokemon-name');
const selectedPokemonType = document.getElementById('selected-pokemon-type');
const selectedPokemonStats = document.getElementById('selected-pokemon-stats');
const pokemonGrid = document.getElementById('pokemon-grid');
const collectionCount = document.getElementById('collection-count');
const collectionValue = document.getElementById('collection-value');
const prevPokemonBtn = document.getElementById('prev-pokemon');
const nextPokemonBtn = document.getElementById('next-pokemon');
const selectPokemonBtn = document.getElementById('select-pokemon-btn');
const battleBtn = document.getElementById('battle-btn');
const changeNameBtn = document.getElementById('change-name-btn');
const changeAvatarBtn = document.getElementById('change-avatar-btn');
const avatarUpload = document.getElementById('avatar-upload');
const marketplaceBtn = document.getElementById('marketplace-btn');
const saveGameBtn = document.getElementById('save-game-btn');
const nameModal = document.getElementById('name-modal');
const marketplaceModal = document.getElementById('marketplace-modal');
const newNameInput = document.getElementById('new-name-input');
const saveNameBtn = document.getElementById('save-name-btn');
const marketplaceItems = document.getElementById('marketplace-items');
const pokemonSearch = document.getElementById('pokemon-search');
const typeFilter = document.getElementById('type-filter');
const sortFilter = document.getElementById('sort-filter');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');

// Name Change Functionality
class NameChangeManager {
    constructor() {
        this.isModalOpen = false;
        this.initializeNameChangeListeners();
    }

    initializeNameChangeListeners() {
        // Click on player name to open modal
        if (playerNameElement) {
            playerNameElement.addEventListener('click', () => this.openNameModal());
            playerNameElement.style.cursor = 'pointer';
            playerNameElement.title = 'Click to change name';
        }

        // Save name button
        if (saveNameBtn) {
            saveNameBtn.addEventListener('click', () => this.savePlayerName());
        }

        // Modal close functionality
        const closeBtn = nameModal?.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeNameModal());
        }

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === nameModal) {
                this.closeNameModal();
            }
        });

        // Enter key support in name input
        if (newNameInput) {
            newNameInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    this.savePlayerName();
                }
            });
        }
    }

    openNameModal() {
        if (nameModal && newNameInput) {
            nameModal.style.display = 'block';
            newNameInput.value = gameState.playerName;
            newNameInput.focus();
            newNameInput.select();
            this.isModalOpen = true;
            
            // Add animation class
            nameModal.classList.add('modal-open');
        }
    }

    closeNameModal() {
        if (nameModal) {
            nameModal.style.display = 'none';
            nameModal.classList.remove('modal-open');
            this.isModalOpen = false;
        }
    }

    savePlayerName() {
        if (newNameInput && playerNameElement) {
            const newName = newNameInput.value.trim();
            
            if (this.validateName(newName)) {
                gameState.playerName = newName;
                playerNameElement.textContent = newName;
                
                // Save to localStorage
                saveGameState();
                
                // Show confirmation
                this.showNotification(`Name changed to ${newName}`, 'success');
                
                this.closeNameModal();
            } else {
                this.showNotification('Please enter a valid name (1-20 characters)', 'error');
                newNameInput.focus();
            }
        }
    }

    validateName(name) {
        return name.length > 0 && name.length <= 20 && /^[a-zA-Z0-9\s]+$/.test(name);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 12px 20px;
                    border-radius: 4px;
                    color: white;
                    font-weight: bold;
                    z-index: 1000;
                    animation: slideIn 0.3s ease-out;
                }
                .notification.success { background-color: #4CAF50; }
                .notification.error { background-color: #f44336; }
                .notification.info { background-color: #2196F3; }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
}

// Initialize name change manager
let nameChangeManager;

// Initialize the game
function initGame() {
    loadGameState();
    updateUI(); 
    populatePokemonGrid();
    setSelectedPokemon(gameState.ownedPokemon.indexOf(gameState.selectedPokemon));
    
    // Initialize name change functionality
    nameChangeManager = new NameChangeManager();
    
    setupEventListeners();
    updateCollectionInfo();
}

// Load game state from localStorage
function loadGameState() {
    const savedState = localStorage.getItem('pokemonGameState');
    if (savedState) {
        const parsed = JSON.parse(savedState);
        gameState = { ...gameState, ...parsed };
        
        // Handle avatar data URL if it exists
        if (parsed.avatarDataUrl) {
            playerAvatarElement.src = parsed.avatarDataUrl;
            gameState.currentAvatar = parsed.avatarDataUrl;
        }
    }
}

// Save game state to localStorage
function saveGameState() {
    const stateToSave = {
        ...gameState,
        // data saving 
        avatarDataUrl: gameState.currentAvatar.startsWith('data:') ? gameState.currentAvatar : undefined
    };
    localStorage.setItem('pokemonGameState', JSON.stringify(stateToSave));
    showNotification('Game saved successfully!');
}

// Update UI with current game state
function updateUI() {
    playerNameElement.textContent = gameState.playerName;
    coinAmountElement.textContent = gameState.coins.toLocaleString();
    playerAvatarElement.src = gameState.currentAvatar;
}

// Update collection information
function updateCollectionInfo() {
    const count = gameState.ownedPokemon.length;
    const totalValue = gameState.ownedPokemon.reduce((total, id) => {
        const pokemon = pokemonData.find(p => p.id === id);
        return total + (pokemon ? pokemon.price : 0);
    }, 0);
    
    collectionCount.textContent = `${count}/50 Pokemon`;
    collectionValue.textContent = `Total Value: 🪙 ${totalValue.toLocaleString()}`;
}

// Populate the Pokemon grid
function populatePokemonGrid() {
    pokemonGrid.innerHTML = '';
    
    gameState.ownedPokemon.forEach(pokemonId => {
        const pokemon = pokemonData.find(p => p.id === pokemonId);
        if (pokemon) {
            const pokemonCard = document.createElement('div');
            pokemonCard.className = `pokemon-card ${pokemonId === gameState.selectedPokemon ? 'selected' : ''}`;
            pokemonCard.innerHTML = `
                <div class="pokemon-gif" style="background-image: url('${pokemon.gif}')"></div>
                <h4>${pokemon.name}</h4>
                <div class="pokemon-type">${pokemon.type}</div>
                <div class="pokemon-price">🪙 ${pokemon.price}</div>
            `;
            pokemonCard.addEventListener('click', () => {
                const index = gameState.ownedPokemon.indexOf(pokemonId);
                setSelectedPokemon(index);
            });
            pokemonGrid.appendChild(pokemonCard);
        }
    });
}

// Set selected Pokemon
function setSelectedPokemon(index) {
    if (gameState.ownedPokemon.length === 0) return;
    
    if (index < 0) index = gameState.ownedPokemon.length - 1;
    if (index >= gameState.ownedPokemon.length) index = 0;
    
    const pokemonId = gameState.ownedPokemon[index];
    const pokemon = pokemonData.find(p => p.id === pokemonId);
    
    if (pokemon) {
        gameState.selectedPokemon = pokemonId;
        selectedPokemonGif.style.backgroundImage = `url('${pokemon.gif}')`;
        selectedPokemonName.textContent = pokemon.name;
        selectedPokemonType.innerHTML = `Type: <span>${pokemon.type}</span>`;
        
        // Generate random stats for display
        const hp = Math.floor(Math.random() * 50) + 30;
        const atk = Math.floor(Math.random() * 70) + 40;
        selectedPokemonStats.innerHTML = `HP: <span>${hp}</span> | ATK: <span>${atk}</span>`;
        
        // Update selected state in grid
        document.querySelectorAll('.pokemon-card').forEach((card, i) => {
            if (i === index) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });
    }
}

// Populate marketplace
function populateMarketplace() {
    marketplaceItems.innerHTML = '';
    
    // Filter and sort Pokemon
    let filteredPokemon = [...pokemonData];
    
    // Apply search filter
    const searchTerm = pokemonSearch.value.toLowerCase();
    if (searchTerm) {
        filteredPokemon = filteredPokemon.filter(p => 
            p.name.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply type filter
    const typeValue = typeFilter.value;
    if (typeValue !== 'all') {
        filteredPokemon = filteredPokemon.filter(p => 
            p.type.toLowerCase().includes(typeValue)
        );
    }
    
    // Apply sorting
    const sortValue = sortFilter.value;
    if (sortValue === 'name') {
        filteredPokemon.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === 'price') {
        filteredPokemon.sort((a, b) => b.price - a.price);
    } else {
        filteredPokemon.sort((a, b) => a.id - b.id);
    }
    
    // Pagination
    const totalPages = Math.ceil(filteredPokemon.length / gameState.itemsPerPage);
    const startIndex = (gameState.marketplacePage - 1) * gameState.itemsPerPage;
    const endIndex = startIndex + gameState.itemsPerPage;
    const paginatedPokemon = filteredPokemon.slice(startIndex, endIndex);
    
    // Update pagination controls
    pageInfo.textContent = `Page ${gameState.marketplacePage} of ${totalPages}`;
    prevPageBtn.disabled = gameState.marketplacePage <= 1;
    nextPageBtn.disabled = gameState.marketplacePage >= totalPages;
    
    // Populate marketplace items
    paginatedPokemon.forEach(pokemon => {
        const isOwned = gameState.ownedPokemon.includes(pokemon.id);
        const canAfford = gameState.coins >= pokemon.price;
        
        const marketItem = document.createElement('div');
        marketItem.className = `market-item ${isOwned ? 'owned' : ''}`;
        marketItem.innerHTML = `
            <div class="item-pokemon-gif" style="background-image: url('${pokemon.gif}')"></div>
            <h4>${pokemon.name}</h4>
            <div class="item-type">${pokemon.type}</div>
            <div class="item-price">🪙 ${pokemon.price.toLocaleString()}</div>
            <button class="buy-btn ${isOwned ? 'owned' : ''}" 
                    data-pokemon-id="${pokemon.id}" 
                    ${isOwned || !canAfford ? 'disabled' : ''}>
                ${isOwned ? 'Owned' : canAfford ? 'Buy' : 'Too Expensive'}
            </button>
        `;
        marketplaceItems.appendChild(marketItem);
    });
    
    // Add event listeners to buy buttons
    document.querySelectorAll('.buy-btn:not(:disabled)').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const pokemonId = parseInt(e.target.dataset.pokemonId);
            buyPokemon(pokemonId);
        });
    });
}

// Buy Pokemon
function buyPokemon(pokemonId) {
    const pokemon = pokemonData.find(p => p.id === pokemonId);
    
    if (!pokemon) return;
    
    if (gameState.ownedPokemon.includes(pokemonId)) {
        showNotification(`You already own ${pokemon.name}!`);
        return;
    }
    
    if (gameState.coins >= pokemon.price) {
        gameState.coins -= pokemon.price;
        gameState.ownedPokemon.push(pokemonId);
        
        updateUI();
        updateCollectionInfo();
        populatePokemonGrid();
        populateMarketplace();
        saveGameState();
        
        showNotification(`Congratulations! You bought ${pokemon.name} for 🪙 ${pokemon.price}!`);
    } else {
        showNotification(`Not enough coins to buy ${pokemon.name}!`);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Pokemon navigation
    prevPokemonBtn.addEventListener('click', () => {
        const currentIndex = gameState.ownedPokemon.indexOf(gameState.selectedPokemon);
        setSelectedPokemon(currentIndex - 1);
    });

    nextPokemonBtn.addEventListener('click', () => {
        const currentIndex = gameState.ownedPokemon.indexOf(gameState.selectedPokemon);
        setSelectedPokemon(currentIndex + 1);
    });

    // Select Pokemon button
    selectPokemonBtn.addEventListener('click', () => {
        if (gameState.selectedPokemon) {
            const pokemon = pokemonData.find(p => p.id === gameState.selectedPokemon);
            showNotification(`${pokemon.name} selected for battle!`);
        }
    });

    // Battle button functionality
    document.getElementById('battle-btn').addEventListener('click', function() {
        // Save current game state to ensure selected Pokemon is saved
        saveGameState();
        
        // Get trainer data
        const trainerName = document.getElementById('player-name').textContent;
        const coins = document.getElementById('coin-amount').textContent.replace(/,/g, '');
        
        // Save to localStorage
        localStorage.setItem('trainerName', trainerName);
        localStorage.setItem('playerCoins', coins);
        
        // Add small delay to ensure save is complete
        setTimeout(() => {
            window.location.href = `battle.html?trainer=${encodeURIComponent(trainerName)}`;
        }, 100);
    });

    // Change avatar functionality
    changeAvatarBtn.addEventListener('click', () => {
        avatarUpload.click();
    });

    avatarUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                gameState.currentAvatar = event.target.result;
                updateUI();
                saveGameState();
                showNotification('Avatar updated successfully!');
            };
            reader.readAsDataURL(file);
        }
    });

    // Marketplace functionality
    marketplaceBtn.addEventListener('click', () => {
        marketplaceModal.style.display = 'block';
        populateMarketplace();
    });

    // Save game button
    saveGameBtn.addEventListener('click', () => {
        saveGameState();
    });

    // Marketplace filters
    pokemonSearch.addEventListener('input', populateMarketplace);
    typeFilter.addEventListener('change', populateMarketplace);
    sortFilter.addEventListener('change', populateMarketplace);

    // Marketplace pagination
    prevPageBtn.addEventListener('click', () => {
        if (gameState.marketplacePage > 1) {
            gameState.marketplacePage--;
            populateMarketplace();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        gameState.marketplacePage++;
        populateMarketplace();
    });

    // Close modals when clicking X
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            nameModal.style.display = 'none';
            marketplaceModal.style.display = 'none';
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === nameModal) {
            nameModal.style.display = 'none';
        }
        if (event.target === marketplaceModal) {
            marketplaceModal.style.display = 'none';
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            nameModal.style.display = 'none';
            marketplaceModal.style.display = 'none';
        }
        
        // Arrow key navigation for Pokemon selection
        if (event.key === 'ArrowLeft') {
            const currentIndex = gameState.ownedPokemon.indexOf(gameState.selectedPokemon);
            setSelectedPokemon(currentIndex - 1);
        } else if (event.key === 'ArrowRight') {
            const currentIndex = gameState.ownedPokemon.indexOf(gameState.selectedPokemon);
            setSelectedPokemon(currentIndex + 1);
        }
    });
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #3366cc;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 1001;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.3s ease;
        font-weight: bold;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for notifications and modal animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .modal {
        transition: opacity 0.3s ease;
    }
    
    .modal-open .modal-content {
        animation: modalSlideIn 0.3s ease-out;
    }
    
    @keyframes modalSlideIn {
        from {
            transform: translateY(-50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    #player-name {
        cursor: pointer;
        transition: color 0.2s ease;
    }
    
    #player-name:hover {
        color: #000000ff;
        text-decoration: underline;
    }
`;
document.head.appendChild(style);

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);