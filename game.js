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
    { id: 45, name: "Diglett", type: "Ground", price: 200, gif: "https://projectpokemon.org/images/normal-sprite/diglett.gif" },
    {id: 46, name: "Snoorlax", type: "Happy", price: 500, gif: "https://projectpokemon.org/home/uploads/monthly_2018_05/large.ShinySnorlax.Gif.a3f81dc2af71384a08a36aae27ac67d1.Gif"}
];

// Game State
let gameState = {
    playerName: "Jim",
    coins: 0, // 0
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


// Sync with blockchain
async function syncWithBlockchain() {
    if (window.pokemonWeb3 && window.pokemonWeb3.isConnected) {
        try {
            // Get token balance from blockchain
            const blockchainBalance = await window.pokemonWeb3.getTokenBalance();
            gameState.coins = parseInt(blockchainBalance);
            updateUI();
            console.log('Synced with blockchain:', gameState.coins, 'coins');
        } catch (error) {
            console.log('Blockchain sync failed, using local storage');
        }
    }
}





function updateCoinsFromBattle(coinsEarned) {
    if (window.pokemonWeb3 && window.pokemonWeb3.isConnected) {
        // If MetaMask is connected, use blockchain for coins
        updateBlockchainCoins(coinsEarned);
    } else {
        // Use local storage for coins
        gameState.coins += coinsEarned;
        updateUI();
        saveGameState();
        showNotification(`You earned ${coinsEarned} coins from battle!`);
    }
}

function deductCoinsFromLoss(coinsLost) {
    if (window.pokemonWeb3 && window.pokemonWeb3.isConnected) {
        // If MetaMask is connected blockchain for coins
        deductBlockchainCoins(coinsLost);
    } else {
        // local storage for coins
        gameState.coins = Math.max(0, gameState.coins - coinsLost);
        updateUI();
        saveGameState();
        showNotification(`Lost ${coinsLost} coins from defeat!`);
    }
}

// Blockchain coin functions
async function updateBlockchainCoins(coinsEarned) {
    try {
        // interact with smart contract
        console.log(`Adding ${coinsEarned} coins via blockchain`);
        
        // simulate the blockchain transaction
        const transactionSuccess = await simulateBlockchainTransaction('addCoins', coinsEarned);
        
        if (transactionSuccess) {
            // Update local display
            gameState.coins += coinsEarned;
            updateUI();
            showNotification(`🎉 ${coinsEarned} coins added to your wallet!`);
        }
    } catch (error) {
        console.error('Blockchain transaction failed:', error);
        // Fallback to local storage
        gameState.coins += coinsEarned;
        updateUI();
        saveGameState();
    }
}
async function deductBlockchainCoins(coinsLost) {
    try {
        console.log(`Deducting ${coinsLost} coins via blockchain`);
        
        const transactionSuccess = await simulateBlockchainTransaction('deductCoins', coinsLost);
        
        if (transactionSuccess) {
            gameState.coins = Math.max(0, gameState.coins - coinsLost);
            updateUI();
            showNotification(`💸 ${coinsLost} coins deducted from your wallet!`);
        }
    } catch (error) {
        console.error('Blockchain transaction failed:', error);
        gameState.coins = Math.max(0, gameState.coins - coinsLost);
        updateUI();
        saveGameState();
    }
}

// Simulate blockchain transactions (replace with actual contract calls)
async function simulateBlockchainTransaction(action, amount) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate successful transaction 90% of the time
            resolve(Math.random() < 0.9);
        }, 1000);
    });
}

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
let nameChangeManager = document.getElementById('new-name-input');

// Initialize the game
function initGame() {
    loadGameState();
    
    // SYNC WITH BLOCKCHAIN FIRST
    syncWithBlockchain().then(() => {
        updateUI();
        populatePokemonGrid();
        setSelectedPokemon(gameState.ownedPokemon.indexOf(gameState.selectedPokemon));
        
        nameChangeManager = new NameChangeManager();
        setupEventListeners();
        updateCollectionInfo();
        updateBlockchainStatus();
        checkBattleResults();
    });
}


// Check for battle results when returning from battle
function checkBattleResults() {
    const battleResult = localStorage.getItem('battleResult');
    const coinsEarned = localStorage.getItem('coinsEarned');
    const coinsLost = localStorage.getItem('coinsLost');
    
    if (battleResult === 'win' && coinsEarned) {
        updateCoinsFromBattle(parseInt(coinsEarned));
        localStorage.removeItem('battleResult');
        localStorage.removeItem('coinsEarned');
    } else if (battleResult === 'lose' && coinsLost) {
        deductCoinsFromLoss(parseInt(coinsLost));
        localStorage.removeItem('battleResult');
        localStorage.removeItem('coinsLost');
    }
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

// Update the Web3 integration to sync coins
function setupMarketplaceWeb3() {
    const connectBtn = document.getElementById('connect-wallet-btn');
    if (connectBtn) {
        connectBtn.addEventListener('click', async () => {
            await window.pokemonWeb3.connectWallet();
            // Sync coins after connecting
            syncCoinsWithBlockchain();
        });
    }
    
    // Update marketplace items to show blockchain prices
    updateMarketplaceWeb3UI();
}

function syncCoinsWithBlockchain() {
    if (window.pokemonWeb3 && window.pokemonWeb3.isConnected) {
        // Simulate getting coin balance from blockchain
        setTimeout(() => {
            const blockchainCoins = Math.floor(Math.random() * 1000); // Simulated balance
            gameState.coins = blockchainCoins;
            updateUI();
            showNotification(`🔄 Synced with blockchain: ${blockchainCoins} coins`);
        }, 1000);
    }
}

function updateMarketplaceWeb3UI() {
    const marketplaceItems = document.querySelectorAll('.marketplace-item');
    
    marketplaceItems.forEach(item => {
        const pokemonId = item.dataset.pokemonId;
        const price = item.dataset.price;
        
        const buyBtn = document.createElement('button');
        
        if (window.pokemonWeb3 && window.pokemonWeb3.isConnected) {
            buyBtn.className = 'buy-button blockchain-buy';
            buyBtn.textContent = `Buy for ${price} ETH`;
            buyBtn.onclick = () => {
                window.pokemonWeb3.buyPokemon(pokemonId, price);
            };
        } else {
            buyBtn.className = 'buy-button local-buy';
            buyBtn.textContent = `Buy for 🪙 ${price}`;
            buyBtn.onclick = () => {
                buyPokemon(parseInt(pokemonId));
            };
        }
        
        const actions = item.querySelector('.item-actions');
        if (actions) {
            actions.innerHTML = '';
            actions.appendChild(buyBtn);
        }
    });
}
// Add blockchain status indicator
function updateBlockchainStatus() {
    const statusElement = document.getElementById('blockchain-status') || createBlockchainStatusElement();
    
    if (window.pokemonWeb3 && window.pokemonWeb3.isConnected) {
        statusElement.innerHTML = `
            <span style="color: #4CAF50;">●</span> Connected to Blockchain
            <span style="margin-left: 10px; font-size: 0.8em;">Coins: ${gameState.coins}</span>
        `;
    } else {
        statusElement.innerHTML = `
            <span style="color: #ff4444;">●</span> Local Mode
            <span style="margin-left: 10px; font-size: 0.8em;">Coins: ${gameState.coins}</span>
        `;
    }
}
function createBlockchainStatusElement() {
    const statusElement = document.createElement('div');
    statusElement.id = 'blockchain-status';
    statusElement.style.cssText = `
        position: fixed;
        top: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 5px;
        font-size: 0.9em;
        z-index: 1000;
        border: 1px solid #333;
    `;
    document.body.appendChild(statusElement);
    return statusElement;
}

// Multiplayer System
class MultiplayerManager {
    constructor() {
        this.socket = null;
        this.currentRoom = null;
        this.opponent = null;
        this.isMultiplayer = false;
        this.battleState = 'idle';
        this.modal = null;
    }

    connect() {
        try {
            // Connect to local server
            this.socket = io('http://127.0.0.1:5500');
            
            this.socket.on('connect', () => {
                console.log('✅ Connected to multiplayer server');
                this.showMultiplayerMenu();
            });

            this.socket.on('roomCreated', (roomId) => {
                this.currentRoom = roomId;
                this.battleState = 'waiting';
                this.showWaitingRoom(roomId);
            });

            this.socket.on('roomJoined', (data) => {
                this.currentRoom = data.roomId;
                this.showWaitingRoom(data.roomId);
            });

            this.socket.on('playerJoined', (data) => {
                this.opponent = data.room.players.find(p => p.id !== this.socket.id);
                this.updateWaitingRoom(data.room);
            });

            this.socket.on('playerReadyUpdate', (players) => {
                this.updateReadyStatus(players);
            });

            this.socket.on('battleStarted', (data) => {
                // Automatically redirect to battle page with multiplayer mode and room id
                if (data && data.roomId) {
                    // Close modal if open
                    if (this.modal) {
                        this.modal.style.display = 'none';
                        this.modal.remove();
                        this.modal = null;
                    }
                    // Redirect to battle.html with mode=multiplayer and room id
                    window.location.href = `battle.html?mode=multiplayer&room=${encodeURIComponent(data.roomId)}`;
                } else {
                    // Fallback to old method
                    this.startMultiplayerBattle(data);
                }
            });

            this.socket.on('attackResult', (data) => {
                this.processOpponentAttack(data);
            });

            this.socket.on('battleFinished', (data) => {
                this.endMultiplayerBattle(data);
            });

            this.socket.on('newMessage', (data) => {
                this.addChatMessage(data);
            });

            this.socket.on('error', (message) => {
                this.showNotification(`${message}`);
            });

            this.socket.on('disconnect', () => {
                this.showNotification('Disconnected from server');
            });

        } catch (error) {
            console.error('Multiplayer connection failed:', error);
            this.showNotification('Cannot connect to multiplayer server. Make sure server is running');
        }
    }

    showMultiplayerMenu() {
        // Remove any existing modal first
        const existingModal = document.querySelector('.multiplayer-modal');
        if (existingModal) {
            existingModal.remove();
        }

        this.modal = this.createMultiplayerModal();
        document.body.appendChild(this.modal);
        
        // Show the modal
        this.modal.style.display = 'block';
    }

    createMultiplayerModal() {
        const modal = document.createElement('div');
        modal.className = 'modal multiplayer-modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px; background: linear-gradient(135deg, #1a1a1a, #2d2d2d); border: 3px solid #ff9900;">
                <span class="close" style="color: white; font-size: 24px;">&times;</span>
                <h2 style="color: #ff9900; text-align: center; margin-bottom: 20px;"> Multiplayer Battle</h2>
                
                <div class="multiplayer-options">
                    <button id="create-room-btn" class="nav-btn" style="background: linear-gradient(45deg, #4CAF50, #45a049); width: 100%; margin-bottom: 15px; padding: 15px;">
                        Create New Room
                    </button>
                    
                    <div style="text-align: center; margin: 15px 0; color: white;">- OR -</div>
                    
                    <div class="join-room-section" style="display: flex; gap: 10px;">
                        <input type="text" id="room-code-input" placeholder="Enter 6-digit Code" maxlength="6" 
                               style="flex: 1; padding: 12px; border: 2px solid #ff9900; border-radius: 5px; background: rgba(0,0,0,0.8); color: white; font-size: 16px; text-align: center;">
                        <button id="join-room-btn" class="nav-btn" style="background: linear-gradient(45deg, #2196F3, #1976D2); padding: 12px 20px;">
                            Join
                        </button>
                    </div>
                </div>

                <div id="waiting-room" style="display: none; margin-top: 20px;">
                    <h3 style="color: #ff9900; text-align: center;">Room Code: <span id="room-code" style="background: #ff9900; color: black; padding: 5px 10px; border-radius: 5px;"></span></h3>
                    
                    <div class="players-list" style="margin: 20px 0;">
                        <div class="player-item" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 5px; margin: 10px 0;">
                            <span style="color: white;">You (${gameState.playerName})</span>
                            <span id="player-ready-status" style="color: #ff4444;"> Not Ready</span>
                        </div>
                        <div class="player-item" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 5px; margin: 10px 0;">
                            <span id="opponent-name" style="color: white;">Waiting for opponent...</span>
                            <span id="opponent-ready-status"></span>
                        </div>
                    </div>
                    
                    <button id="start-battle-btn" class="nav-btn" style="background: linear-gradient(45deg, #FF5722, #E64A19); width: 100%; padding: 12px; margin-bottom: 15px; display: none;">
                        Start Battle
                    </button>
                    
                    <button id="ready-btn" class="nav-btn" style="background: linear-gradient(45deg, #FF9800, #F57C00); width: 100%; padding: 12px; margin-bottom: 15px;">
                        Ready Up
                    </button>
                    
                    <div class="chat-box" style="border: 2px solid #ff9900; border-radius: 5px; padding: 10px; background: rgba(0,0,0,0.8);">
                        <div id="chat-messages" style="height: 100px; overflow-y: auto; margin-bottom: 10px; padding: 5px; background: rgba(255,255,255,0.1); border-radius: 3px; color: white;"></div>
                        <div style="display: flex; gap: 5px;">
                            <input type="text" id="chat-input" placeholder="Type a message..." 
                                   style="flex: 1; padding: 8px; border: 1px solid #ff9900; border-radius: 3px; background: rgba(0,0,0,0.8); color: white;">
                            <button id="send-chat-btn" class="nav-btn" style="padding: 8px 15px;">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupMultiplayerEvents(modal);
        return modal;
    }

    setupMultiplayerEvents(modal) {
        // Create room
        modal.querySelector('#create-room-btn').addEventListener('click', () => {
            console.log('Creating room...');
            this.createRoom();
        });

        // Join room
        modal.querySelector('#join-room-btn').addEventListener('click', () => {
            const roomCode = modal.querySelector('#room-code-input').value.toUpperCase();
            if (roomCode && roomCode.length === 6) {
                console.log('Joining room:', roomCode);
                this.joinRoom(roomCode);
            } else {
                this.showNotification('Please enter a 6-digit room code');
            }
        });

        // Enter key for room code
        modal.querySelector('#room-code-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const roomCode = modal.querySelector('#room-code-input').value.toUpperCase();
                if (roomCode && roomCode.length === 6) {
                    this.joinRoom(roomCode);
                }
            }
        });

        // Ready up
        modal.querySelector('#ready-btn').addEventListener('click', () => {
            this.socket.emit('playerReady');
        });

        // Chat
        modal.querySelector('#send-chat-btn').addEventListener('click', () => {
            this.sendChatMessage(modal);
        });

        modal.querySelector('#chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendChatMessage(modal);
            }
        });

        // Close modal
        modal.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        // Close when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    closeModal() {
        if (this.modal) {
            this.modal.remove();
            this.modal = null;
        }
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    createRoom() {
        if (!this.socket || !this.socket.connected) {
            this.showNotification('Not connected to server');
            return;
        }

        const playerData = {
            name: gameState.playerName,
            pokemon: this.getCurrentPokemonData()
        };
        
        this.socket.emit('createRoom', playerData);
        this.showNotification('Creating room...');
    }

    joinRoom(roomId) {
        if (!this.socket || !this.socket.connected) {
            this.showNotification('Not connected to server');
            return;
        }

        const playerData = {
            name: gameState.playerName,
            pokemon: this.getCurrentPokemonData()
        };
        
        this.socket.emit('joinRoom', { roomId, playerData });
        this.showNotification(`Joining room ${roomId}...`);
    }

    getCurrentPokemonData() {
        const pokemon = pokemonData.find(p => p.id === gameState.selectedPokemon);
        return pokemon || pokemonData[0]; // Fallback to first pokemon
    }

    showWaitingRoom(roomId) {
        if (!this.modal) return;

        this.modal.querySelector('.multiplayer-options').style.display = 'none';
        this.modal.querySelector('#waiting-room').style.display = 'block';
        this.modal.querySelector('#room-code').textContent = roomId;
        
        this.showNotification(`Room ${roomId} created! Share this code with your friend.`);
    }

    updateWaitingRoom(room) {
        if (!this.modal) return;

        const playersListContainer = this.modal.querySelector('.players-list');
        if (!playersListContainer) return;

        playersListContainer.innerHTML = '';

        room.players.forEach(player => {
            const isLocalPlayer = player.id === this.socket.id;
            const playerItem = document.createElement('div');
            playerItem.className = 'player-item';
            playerItem.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 5px; margin: 10px 0;';
            playerItem.innerHTML = `
                <span style="color: white;">${isLocalPlayer ? 'You' : player.name}</span>
                <span style="color: ${player.ready ? '#4CAF50' : '#ff4444'};">${player.ready ? '✅ Ready' : '❌ Not Ready'}</span>
            `;
            playersListContainer.appendChild(playerItem);
        });

        this.showNotification(`${room.players.length} player(s) in the room.`);
    }

    updateReadyStatus(players) {
        if (!this.modal) return;

        // Re-use updateWaitingRoom to refresh player ready statuses
        const roomPlayers = players || [];
        if (roomPlayers.length === 0) return;

        // Construct temp room object to use updateWaitingRoom
        const tempRoom = {
            players: roomPlayers
        };
        this.updateWaitingRoom(tempRoom);
    }

    startMultiplayerBattle(data) {
        this.isMultiplayer = true;
        this.battleState = 'battling';
        
        // Close modal
        this.closeModal();
        
        // Start battle
        this.initializeMultiplayerBattle(data);
    }

    initializeMultiplayerBattle(data) {
        this.showNotification('⚔️ Multiplayer battle starting!');
        
        // For now, just show a simple battle screen
        setTimeout(() => {
            this.showSimpleBattleScreen(data);
        }, 1000);
    }

    showSimpleBattleScreen(data) {
        const battleScreen = document.createElement('div');
        battleScreen.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, #1a1a1a, #2d2d2d); z-index: 10000; color: white; padding: 20px;">
                <h1 style="text-align: center; color: #ff9900;">⚔️ Multiplayer Battle</h1>
                <div style="text-align: center; margin: 20px 0;">
                    <p>Battle started between you and opponent!</p>
                    <p>This is a simplified battle view.</p>
                </div>
                <button onclick="this.parentElement.remove()" style="display: block; margin: 20px auto; padding: 10px 20px; background: #ff9900; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Close Battle
                </button>
            </div>
        `;
        document.body.appendChild(battleScreen);
    }

    processOpponentAttack(data) {
        this.showNotification(`Opponent attacked for ${data.damage} damage!`);
    }

    endMultiplayerBattle(data) {
        const winner = data.winner === this.socket.id ? 'You' : 'Opponent';
        this.showNotification(`🎉 ${winner} won the battle!`);
    }

    addChatMessage(data) {
        if (!this.modal) return;

        const chatContainer = this.modal.querySelector('#chat-messages');
        if (chatContainer) {
            const messageElement = document.createElement('div');
            messageElement.style.margin = '5px 0';
            messageElement.style.fontSize = '0.9em';
            messageElement.innerHTML = `
                <span style="color: #888;">[${new Date().toLocaleTimeString()}] </span>
                <span style="color: #ff9900; font-weight: bold;">${data.player === this.socket.id ? 'You' : 'Opponent'}:</span>
                <span style="color: white;"> ${data.message}</span>
            `;
            chatContainer.appendChild(messageElement);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }

    sendChatMessage(modal) {
        const input = modal.querySelector('#chat-input');
        const message = input.value.trim();
        
        if (message) {
            this.socket.emit('sendMessage', message);
            input.value = '';
        }
    }

    showNotification(message) {
        // Use your existing notification system or create a simple one
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
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Add multiplayer button to main game UI
function addMultiplayerButton() {
    // Check if button already exists
    if (document.getElementById('multiplayer-btn')) return;

    const multiplayerBtn = document.createElement('button');
    multiplayerBtn.id = 'multiplayer-btn';
    multiplayerBtn.className = 'nav-btn';
    multiplayerBtn.textContent = '🎮 Multiplayer';
    multiplayerBtn.style.background = 'linear-gradient(45deg, #9C27B0, #E91E63)';
    
    multiplayerBtn.addEventListener('click', () => {
        console.log('Multiplayer button clicked');
        const multiplayerManager = new MultiplayerManager();
        multiplayerManager.connect();
    });

    // Add to your navigation menu
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.appendChild(multiplayerBtn);
    } else {
        console.error('Nav menu not found');
    }
}

// Initialize multiplayer when game loads
document.addEventListener('DOMContentLoaded', () => {
    addMultiplayerButton();
});


// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupMarketplaceWeb3();
});
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

// Update marketplace to work with blockchain
function buyPokemon(pokemonId) {
    const pokemon = pokemonData.find(p => p.id === pokemonId);
    
    if (!pokemon) return;
    
    if (gameState.ownedPokemon.includes(pokemonId)) {
        showNotification(`You already own ${pokemon.name}!`);
        return;
    }
    
    // Check if using blockchain or local coins
    if (window.pokemonWeb3 && window.pokemonWeb3.isConnected) {
        buyPokemonWithBlockchain(pokemonId, pokemon.price);
    } else {
        buyPokemonWithLocalCoins(pokemonId, pokemon.price);
    }
}

function buyPokemonWithLocalCoins(pokemonId, price) {
    if (gameState.coins >= price) {
        gameState.coins -= price;
        gameState.ownedPokemon.push(pokemonId);
        
        updateUI();
        updateCollectionInfo();
        populatePokemonGrid();
        populateMarketplace();
        saveGameState();
        
        showNotification(`Congratulations! You bought ${pokemonData.find(p => p.id === pokemonId).name} for 🪙 ${price}!`);
    } else {
        showNotification(`Not enough coins to buy ${pokemonData.find(p => p.id === pokemonId).name}!`);
    }
}
async function buyPokemonWithBlockchain(pokemonId, price) {
    try {
        showNotification(`Processing blockchain purchase...`);
        
        // Simulate blockchain purchase
        const purchaseSuccess = await simulateBlockchainPurchase(pokemonId, price);
        
        if (purchaseSuccess) {
            gameState.ownedPokemon.push(pokemonId);
            
            updateCollectionInfo();
            populatePokemonGrid();
            populateMarketplace();
            saveGameState();
            
            showNotification(`🎉 Purchased ${pokemonData.find(p => p.id === pokemonId).name} via blockchain!`);
        } else {
            showNotification(`❌ Blockchain purchase failed!`);
        }
    } catch (error) {
        console.error('Blockchain purchase error:', error);
        showNotification(`❌ Purchase failed: ${error.message}`);
    }
}

async function simulateBlockchainPurchase(pokemonId, price) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate successful purchase 85% of the time
            resolve(Math.random() < 0.85);
        }, 2000);
    });
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

    // Update the battle button to handle coin transfers
document.getElementById('battle-btn').addEventListener('click', function() {
    // Check if player has enough coins for battle entry fee
    const battleEntryFee = 50; // 50 coins to enter battle
    
    if (gameState.coins < battleEntryFee && !window.pokemonWeb3?.isConnected) {
        showNotification(`You need at least ${battleEntryFee} coins to enter battle!`);
        return;
    }
    
    // Deduct entry fee if using local coins
    if (!window.pokemonWeb3?.isConnected) {
        gameState.coins -= battleEntryFee;
        updateUI();
        saveGameState();
        showNotification(`🎫 Paid ${battleEntryFee} coins battle entry fee!`);
    }
    
    // Save current game state
    saveGameState();
    
    // Get trainer data
    const trainerName = document.getElementById('player-name').textContent;
    const coins = gameState.coins;
    
    // Save to localStorage for battle
    localStorage.setItem('trainerName', trainerName);
    localStorage.setItem('playerCoins', coins);
    localStorage.setItem('usingBlockchain', window.pokemonWeb3?.isConnected ? 'true' : 'false');
    
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupMarketplaceWeb3();
    initGame();
});