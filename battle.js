class PokemonBattle {
    constructor() {
        this.battleState = {
            playerPokemon: null,
            opponentPokemon: null,
            playerHealth: 100,
            opponentHealth: 100,
            playerMaxHealth: 100,
            opponentMaxHealth: 100,
            battleActive: false,
            playerTurn: true,
            battleLog: [],
            rewards: {
                coins: 0,
                exp: 0
            }
        };

        this.initializeBattle();
        this.setupEventListeners();
        this.startBattle();
    }

    initializeBattle() {
        // Get trainer data from localStorage or URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const trainerName = urlParams.get('trainer') || localStorage.getItem('trainerName') || 'Player';
        
        // Set player info
        document.getElementById('player-name').textContent = trainerName;
        
        // Load player avatar
        const savedAvatar = localStorage.getItem('playerAvatar');
        if (savedAvatar) {
            document.getElementById('player-avatar').src = savedAvatar;
        }

        // Initialize Pokemon
        this.initializePokemon();
        this.updateUI();
    }

    initializePokemon() {
        // Get selected Pokemon from game state or use default
        const gameState = JSON.parse(localStorage.getItem('pokemonGameState') || '{}');
        const selectedPokemonId = gameState.selectedPokemon || 25; // Default to Pikachu
        
        this.battleState.playerPokemon = this.getPokemonData(selectedPokemonId);
        
        // Random opponent Pokemon (different from player's)
        let opponentId;
        do {
            opponentId = Math.floor(Math.random() * 50) + 1;
        } while (opponentId === selectedPokemonId);
        
        this.battleState.opponentPokemon = this.getPokemonData(opponentId);

        // Set up Pokemon sprites
        document.getElementById('player-pokemon-sprite').style.backgroundImage = 
            `url('${this.battleState.playerPokemon.gif}')`;
        document.getElementById('opponent-pokemon-sprite').style.backgroundImage = 
            `url('${this.battleState.opponentPokemon.gif}')`;

        // Update names and health
        document.getElementById('player-pokemon-name').textContent = this.battleState.playerPokemon.name;
        document.getElementById('opponent-pokemon-name').textContent = this.battleState.opponentPokemon.name;

        // Calculate stats based on Pokemon
        this.battleState.playerMaxHealth = this.calculateHealth(this.battleState.playerPokemon);
        this.battleState.opponentMaxHealth = this.calculateHealth(this.battleState.opponentPokemon);
        this.battleState.playerHealth = this.battleState.playerMaxHealth;
        this.battleState.opponentHealth = this.battleState.opponentMaxHealth;
    }

    getPokemonData(id) {
        const pokemonList = [
            { id: 1, name: "Bulbasaur", type: "Grass/Poison", price: 500, gif: "https://projectpokemon.org/images/normal-sprite/bulbasaur.gif" },
            { id: 2, name: "Ivysaur", type: "Grass/Poison", price: 800, gif: "https://projectpokemon.org/images/normal-sprite/ivysaur.gif" },
            { id: 3, name: "Venusaur", type: "Grass/Poison", price: 1200, gif: "https://projectpokemon.org/images/normal-sprite/venusaur.gif" },
            { id: 4, name: "Charmander", type: "Fire", price: 500, gif: "https://projectpokemon.org/images/normal-sprite/charmander.gif" },
            { id: 5, name: "Charmeleon", type: "Fire", price: 800, gif: "https://projectpokemon.org/images/normal-sprite/charmeleon.gif" },
            { id: 6, name: "Charizard", type: "Fire/Flying", price: 1200, gif: "https://projectpokemon.org/images/normal-sprite/charizard.gif" },
            { id: 7, name: "Squirtle", type: "Water", price: 500, gif: "https://projectpokemon.org/images/normal-sprite/squirtle.gif" },
            { id: 8, name: "Wartortle", type: "Water", price: 800, gif: "https://projectpokemon.org/images/normal-sprite/wartortle.gif" },
            { id: 9, name: "Blastoise", type: "Water", price: 1200, gif: "https://projectpokemon.org/images/normal-sprite/blastoise.gif" },
            { id: 25, name: "Pikachu", type: "Electric", price: 800, gif: "https://projectpokemon.org/images/normal-sprite/pikachu.gif" }
        ];
        
        return pokemonList.find(p => p.id === id) || pokemonList[0];
    }

    calculateHealth(pokemon) {
        // Base health calculation based on Pokemon stats
        return 80 + (pokemon.price / 10);
    }

    startBattle() {
        this.battleState.battleActive = true;
        this.addToLog(`A wild ${this.battleState.opponentPokemon.name} appeared!`);
        this.addToLog(`Go! ${this.battleState.playerPokemon.name}!`);
        
        // Enable battle controls
        document.getElementById('battle-controls').style.opacity = '1';
        document.getElementById('battle-controls').style.pointerEvents = 'all';
    }

    setupEventListeners() {
        // Attack buttons
        document.querySelectorAll('.attack-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!this.battleState.battleActive || !this.battleState.playerTurn) return;
                
                const attackType = e.currentTarget.dataset.type;
                this.playerAttack(attackType);
            });
        });

        // Action buttons
        document.getElementById('flee-btn').addEventListener('click', () => {
            this.fleeBattle();
        });

        document.getElementById('items-btn').addEventListener('click', () => {
            this.useItem();
        });

        // Result buttons
        document.getElementById('rematch-btn').addEventListener('click', () => {
            this.rematch();
        });

        document.getElementById('menu-btn').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    playerAttack(attackType) {
        if (!this.battleState.battleActive) return;

        this.battleState.playerTurn = false;
        this.disableControls();

        const damage = this.calculateDamage(attackType, true);
        const isCritical = this.isCriticalHit(attackType);
        const finalDamage = isCritical ? Math.floor(damage * 1.5) : damage;

        // Attack animation and effects
        this.animateAttack('player', attackType, isCritical);
        
        setTimeout(() => {
            this.opponentTakeDamage(finalDamage, isCritical);
            
            setTimeout(() => {
                if (this.battleState.opponentHealth > 0) {
                    this.opponentAttack();
                } else {
                    this.endBattle(true);
                }
            }, 1000);
        }, 600);
    }

    opponentAttack() {
        const attackTypes = ['normal', 'special', 'critical'];
        const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];
        const damage = this.calculateDamage(attackType, false);
        const isCritical = this.isCriticalHit(attackType);
        const finalDamage = isCritical ? Math.floor(damage * 1.5) : damage;

        this.animateAttack('opponent', attackType, isCritical);
        
        setTimeout(() => {
            this.playerTakeDamage(finalDamage, isCritical);
            
            setTimeout(() => {
                if (this.battleState.playerHealth > 0) {
                    this.battleState.playerTurn = true;
                    this.enableControls();
                } else {
                    this.endBattle(false);
                }
            }, 1000);
        }, 600);
    }

    calculateDamage(attackType, isPlayer) {
        const baseDamage = {
            normal: 40,
            special: 70,
            critical: 100
        }[attackType];

        // Add some randomness
        const randomFactor = 0.8 + Math.random() * 0.4;
        return Math.floor(baseDamage * randomFactor);
    }

    isCriticalHit(attackType) {
        const criticalChance = {
            normal: 0.1,
            special: 0.2,
            critical: 0.4
        }[attackType];
        
        return Math.random() < criticalChance;
    }

    playerTakeDamage(damage, isCritical) {
        this.battleState.playerHealth = Math.max(0, this.battleState.playerHealth - damage);
        this.updateHealthBars();
        
        const playerSprite = document.getElementById('player-pokemon-sprite');
        playerSprite.classList.add('taking-damage');
        if (isCritical) playerSprite.classList.add('critical-hit');
        
        this.addToLog(`${this.battleState.opponentPokemon.name} attacks for ${damage} damage!${isCritical ? ' Critical hit!' : ''}`);
        
        setTimeout(() => {
            playerSprite.classList.remove('taking-damage', 'critical-hit');
        }, 500);

        if (this.battleState.playerHealth === 0) {
            playerSprite.classList.add('fainted');
            this.addToLog(`${this.battleState.playerPokemon.name} fainted!`);
        }
    }

    opponentTakeDamage(damage, isCritical) {
        this.battleState.opponentHealth = Math.max(0, this.battleState.opponentHealth - damage);
        this.updateHealthBars();
        
        const opponentSprite = document.getElementById('opponent-pokemon-sprite');
        opponentSprite.classList.add('taking-damage');
        if (isCritical) opponentSprite.classList.add('critical-hit');
        
        this.addToLog(`${this.battleState.playerPokemon.name} attacks for ${damage} damage!${isCritical ? ' Critical hit!' : ''}`);
        
        setTimeout(() => {
            opponentSprite.classList.remove('taking-damage', 'critical-hit');
        }, 500);

        if (this.battleState.opponentHealth === 0) {
            opponentSprite.classList.add('fainted');
            this.addToLog(`${this.battleState.opponentPokemon.name} fainted!`);
        }
    }

    animateAttack(attacker, attackType, isCritical) {
        const attackerSprite = document.getElementById(`${attacker}-pokemon-sprite`);
        const defenderSprite = document.getElementById(`${attacker === 'player' ? 'opponent' : 'player'}-pokemon-sprite`);
        
        // Zoom and shake effect
        attackerSprite.classList.add('attacking');
        defenderSprite.classList.add('taking-damage');
        if (isCritical) defenderSprite.classList.add('critical-hit');

        // VFX based on attack type
        this.createVFX(attackType, defenderSprite);

        setTimeout(() => {
            attackerSprite.classList.remove('attacking');
        }, 500);
    }

    createVFX(attackType, target) {
        const vfx = document.createElement('div');
        vfx.className = `vfx-${attackType}`;
        vfx.style.cssText = `
            position: absolute;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 4;
            animation: vfxPulse 0.5s ease-out;
        `;

        const rect = target.getBoundingClientRect();
        vfx.style.left = `${rect.left + rect.width / 2 - 100}px`;
        vfx.style.top = `${rect.top + rect.height / 2 - 100}px`;

        document.querySelector('.battle-effects').appendChild(vfx);

        setTimeout(() => {
            vfx.remove();
        }, 500);
    }

    updateHealthBars() {
        const playerHealthPercent = (this.battleState.playerHealth / this.battleState.playerMaxHealth) * 100;
        const opponentHealthPercent = (this.battleState.opponentHealth / this.battleState.opponentMaxHealth) * 100;

        document.getElementById('player-health-bar').style.width = `${playerHealthPercent}%`;
        document.getElementById('opponent-health-bar').style.width = `${opponentHealthPercent}%`;

        document.getElementById('player-health-text').textContent = 
            `${this.battleState.playerHealth}/${this.battleState.playerMaxHealth}`;
        document.getElementById('opponent-health-text').textContent = 
            `${this.battleState.opponentHealth}/${this.battleState.opponentMaxHealth}`;

        // Change color based on health percentage
        this.updateHealthBarColor('player', playerHealthPercent);
        this.updateHealthBarColor('opponent', opponentHealthPercent);
    }

    updateHealthBarColor(target, percent) {
        const healthBar = document.getElementById(`${target}-health-bar`);
        if (percent > 60) {
            healthBar.style.background = 'linear-gradient(90deg, #4cd964, #5de876)';
        } else if (percent > 30) {
            healthBar.style.background = 'linear-gradient(90deg, #ffcc00, #ffd700)';
        } else {
            healthBar.style.background = 'linear-gradient(90deg, #ff0d00ff, #760000ff)';
        }
    }

    endBattle(playerWon) {
        this.battleState.battleActive = false;
        this.disableControls();

        setTimeout(() => {
            this.showBattleResult(playerWon);
        }, 1500);
    }

    showBattleResult(playerWon) {
        const modal = document.getElementById('battle-modal');
        const resultHeader = document.getElementById('result-header');
        const resultMessage = document.getElementById('result-message');
        const rewardsDiv = document.getElementById('rewards');

        modal.style.display = 'flex';
        
        if (playerWon) {
            modal.className = 'battle-modal victory';
            resultHeader.innerHTML = '<h2>Victory!</h2>';
            resultMessage.textContent = `Congratulations! Your ${this.battleState.playerPokemon.name} defeated ${this.battleState.opponentPokemon.name}!`;
            
            // Calculate rewards
            const baseReward = 500;
            const bonusReward = Math.floor(this.battleState.opponentMaxHealth / 10);
            const totalReward = baseReward + bonusReward;
            
            this.battleState.rewards.coins = totalReward;
            
            rewardsDiv.innerHTML = `
                <div class="reward-item">
                    <span>Coins Earned:</span>
                    <span class="reward-amount">🪙 ${totalReward}</span>
                </div>
                <div class="reward-item">
                    <span>Experience:</span>
                    <span class="reward-amount">⭐ 100</span>
                </div>
            `;

            // Update player coins
            this.updatePlayerCoins(totalReward);
            
            // Play victory sound
            this.playSound('win');
        } else {
            modal.className = 'battle-modal defeat';
            resultHeader.innerHTML = '<h2>Defeat!</h2>';
            resultMessage.textContent = `Your ${this.battleState.playerPokemon.name} was defeated!`;
            rewardsDiv.innerHTML = '<div class="reward-item">Better luck next time!</div>';
            
            // Play defeat sound
            this.playSound('lose');
        }
    }

    updatePlayerCoins(coins) {
        // Update coins in localStorage
        const gameState = JSON.parse(localStorage.getItem('pokemonGameState') || '{}');
        gameState.coins = (gameState.coins || 0) + coins;
        localStorage.setItem('pokemonGameState', JSON.stringify(gameState));
    }

    fleeBattle() {
        if (!this.battleState.battleActive) return;
        
        this.addToLog('You fled from battle!');
        this.battleState.battleActive = false;
        this.disableControls();
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }

    useItem() {
        // Placeholder for item usage
        this.addToLog('No items available!');
    }

    rematch() {
        document.getElementById('battle-modal').style.display = 'none';
        
        // Reset battle state
        this.battleState.playerHealth = this.battleState.playerMaxHealth;
        this.battleState.opponentHealth = this.battleState.opponentMaxHealth;
        this.battleState.battleActive = true;
        this.battleState.playerTurn = true;
        this.battleState.battleLog = [];
        
        // Reset visuals
        document.getElementById('player-pokemon-sprite').classList.remove('fainted');
        document.getElementById('opponent-pokemon-sprite').classList.remove('fainted');
        document.getElementById('battle-log').innerHTML = '';
        
        this.updateUI();
        this.enableControls();
        this.startBattle();
    }

    addToLog(message) {
        this.battleState.battleLog.push(message);
        const logElement = document.getElementById('battle-log');
        const logMessage = document.createElement('div');
        logMessage.className = 'log-message';
        logMessage.textContent = message;
        logElement.appendChild(logMessage);
        logElement.scrollTop = logElement.scrollHeight;
    }

    disableControls() {
        document.querySelectorAll('.attack-btn, .action-btn').forEach(btn => {
            btn.disabled = true;
        });
    }

    enableControls() {
        document.querySelectorAll('.attack-btn, .action-btn').forEach(btn => {
            btn.disabled = false;
        });
    }

    updateUI() {
        this.updateHealthBars();
    }

    playSound(soundType) {
        const audio = document.getElementById(`${soundType}-sound`);
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log('Audio play failed:', e));
        }
    }
}

// Add VFX animation to CSS
const vfxStyle = document.createElement('style');
vfxStyle.textContent = `
    @keyframes vfxPulse {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
    }
`;
document.head.appendChild(vfxStyle);

// Initialize battle when page loads
document.addEventListener('DOMContentLoaded', () => {
    new PokemonBattle();
});