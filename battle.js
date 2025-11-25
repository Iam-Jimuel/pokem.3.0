const BATTLE_ENTRY_FEE = 50;
const WIN_REWARD = 100;
const LOSS_PENALTY = 25;

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

    // Calculate rewards/penalties
    if (playerWon) {
        this.battleState.rewards.coins = WIN_REWARD;
    } else {
        this.battleState.rewards.coins = -LOSS_PENALTY;
    }

    setTimeout(() => {
        this.showBattleResult(playerWon);
        this.saveBattleResult(playerWon);
    }, 1500);
}

// Add this new function to save battle results
saveBattleResult(playerWon) {
    if (playerWon) {
        localStorage.setItem('battleResult', 'win');
        localStorage.setItem('coinsEarned', WIN_REWARD.toString());
    } else {
        localStorage.setItem('battleResult', 'lose');
        localStorage.setItem('coinsLost', LOSS_PENALTY.toString());
    }
}

    // Update the showBattleResult function to show penalties
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
        
        rewardsDiv.innerHTML = `
            <div class="reward-item">
                <span>Coins Earned:</span>
                <span class="reward-amount">+🪙 ${WIN_REWARD}</span>
            </div>
            <div class="reward-item">
                <span>Experience:</span>
                <span class="reward-amount">⭐ 100</span>
            </div>
        `;
        this.updatePlayerCoins(WIN_REWARD);
        this.playSound('win');
    } else {
        modal.className = 'battle-modal defeat';
        resultHeader.innerHTML = '<h2>Defeat!</h2>';
        resultMessage.textContent = `Your ${this.battleState.playerPokemon.name} was defeated!`;
        
        rewardsDiv.innerHTML = `
            <div class="reward-item">
                <span>Coins Lost:</span>
                <span class="reward-amount" style="color: #ff4444;">-🪙 ${LOSS_PENALTY}</span>
            </div>
            <div class="reward-item">
                <span>Battle Fee:</span>
                <span class="reward-amount" style="color: #ff4444;">-🪙 ${BATTLE_ENTRY_FEE}</span>
            </div>
        `;

        this.updatePlayerCoins(-LOSS_PENALTY);
        this.playSound('lose');
    }
}

    updatePlayerCoins(coins) {
    // This will be handled by the main game when returning from battle
    // We just save the result to localStorage
    console.log(`Coin update: ${coins}`);
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
// Battle VFX System
class BattleVFX {
    constructor() {
        this.vfxContainer = null;
        this.initVFXContainer();
    }

    initVFXContainer() {
        this.vfxContainer = document.createElement('div');
        this.vfxContainer.className = 'vfx-container';
        document.querySelector('.battle-container').appendChild(this.vfxContainer);
    }

    // Quick Attack VFX
    createQuickAttack(startX, startY, isHit) {
        const vfx = document.createElement('div');
        vfx.className = 'vfx-quick-attack';
        vfx.style.left = startX + 'px';
        vfx.style.top = startY + 'px';
        
        this.vfxContainer.appendChild(vfx);
        
        // Add particles
        if (isHit) {
            this.createParticles(startX + 100, startY, 5, 'rgba(200,200,255,0.8)');
        }
        
        setTimeout(() => {
            vfx.remove();
        }, 600);
    }

    // Super Attack VFX
    createSuperAttack(x, y, isHit) {
        const vfx = document.createElement('div');
        vfx.className = 'vfx-super-attack';
        vfx.style.left = (x - 60) + 'px';
        vfx.style.top = (y - 60) + 'px';
        
        this.vfxContainer.appendChild(vfx);
        
        // Add explosion particles
        if (isHit) {
            this.createParticles(x, y, 12, 'rgba(255,100,100,0.9)');
            this.createScreenShake();
        }
        
        setTimeout(() => {
            vfx.remove();
        }, 800);
    }

    // Combo Attack VFX
    createComboAttack(x, y, isHit) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const vfx = document.createElement('div');
                vfx.className = 'vfx-combo-attack';
                vfx.style.left = (x - 50 + Math.random() * 40 - 20) + 'px';
                vfx.style.top = (y - 50 + Math.random() * 40 - 20) + 'px';
                vfx.style.animationDelay = (i * 0.1) + 's';
                
                this.vfxContainer.appendChild(vfx);
                
                if (isHit && i === 1) {
                    this.createParticles(x, y, 8, 'rgba(150,50,255,0.8)');
                    this.createScreenShake();
                }
                
                setTimeout(() => {
                    vfx.remove();
                }, 1000);
            }, i * 150);
        }
    }

    // Hit/Miss VFX
    createHitEffect(x, y, isCritical = false) {
        const hit = document.createElement('div');
        hit.className = 'vfx-hit';
        hit.style.left = (x - 30) + 'px';
        hit.style.top = (y - 30) + 'px';
        
        if (isCritical) {
            hit.style.background = 'radial-gradient(circle, rgba(255,255,0,0.9) 0%, rgba(255,150,0,0.8) 30%, rgba(255,100,0,0.6) 60%, transparent 80%)';
            hit.style.filter = 'blur(1px) brightness(3)';
        }
        
        this.vfxContainer.appendChild(hit);
        
        setTimeout(() => {
            hit.remove();
        }, 400);
    }

    createMissEffect(x, y) {
        const miss = document.createElement('div');
        miss.className = 'vfx-miss';
        miss.style.left = (x - 40) + 'px';
        miss.style.top = (y - 40) + 'px';
        
        this.vfxContainer.appendChild(miss);
        
        setTimeout(() => {
            miss.remove();
        }, 600);
    }

    // Damage Text
    createDamageText(x, y, damage, isCritical = false, isMiss = false) {
        const text = document.createElement('div');
        text.className = 'damage-text';
        text.textContent = isMiss ? 'MISS!' : damage;
        
        if (isCritical) {
            text.className += ' critical';
        } else if (isMiss) {
            text.className += ' miss';
        } else {
            text.className += ' hit';
        }
        
        text.style.left = x + 'px';
        text.style.top = y + 'px';
        
        this.vfxContainer.appendChild(text);
        
        setTimeout(() => {
            text.remove();
        }, 1000);
    }

    // Particle System
    createParticles(x, y, count, color) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.backgroundColor = color;
            particle.style.width = (Math.random() * 8 + 4) + 'px';
            particle.style.height = particle.style.width;
            
            // Random direction and distance
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 60 + 30;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            
            this.vfxContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    // Screen Shake
    createScreenShake() {
        const battleContainer = document.querySelector('.battle-container');
        battleContainer.classList.add('screen-shake');
        
        setTimeout(() => {
            battleContainer.classList.remove('screen-shake');
        }, 300);
    }

    // Pokemon Hit Flash
    createPokemonHitFlash(pokemonElement) {
        pokemonElement.classList.add('pokemon-hit-flash');
        
        setTimeout(() => {
            pokemonElement.classList.remove('pokemon-hit-flash');
        }, 300);
    }

    // Clear all VFX
    clearVFX() {
        this.vfxContainer.innerHTML = '';
    }
}

// Initialize VFX System
const battleVFX = new BattleVFX();

// Updated Battle Attack Function with VFX
function performAttack(attackType) {
    const playerPokemon = document.querySelector('.player-pokemon .pokemon-sprite');
    const opponentPokemon = document.querySelector('.opponent-pokemon .pokemon-sprite');
    
    // Get positions for VFX
    const playerRect = playerPokemon.getBoundingClientRect();
    const opponentRect = opponentPokemon.getBoundingClientRect();
    
    const playerX = playerRect.left + playerRect.width / 2;
    const playerY = playerRect.top + playerRect.height / 2;
    const opponentX = opponentRect.left + opponentRect.width / 2;
    const opponentY = opponentRect.top + opponentRect.height / 2;
    
    // Calculate hit chance (80% base chance)
    const hitChance = Math.random();
    const isHit = hitChance < 0.8;
    const isCritical = isHit && Math.random() < 0.2;
    
    // Player attack animation
    playerPokemon.classList.add('attacking');
    
    setTimeout(() => {
        playerPokemon.classList.remove('attacking');
        
        // Create attack VFX based on type
        switch(attackType) {
            case 'normal':
                battleVFX.createQuickAttack(playerX, playerY, isHit);
                break;
            case 'special':
                battleVFX.createSuperAttack(opponentX, opponentY, isHit);
                break;
            case 'critical':
                battleVFX.createComboAttack(opponentX, opponentY, isHit);
                break;
        }
        
        if (isHit) {
            // Hit VFX
            setTimeout(() => {
                battleVFX.createHitEffect(opponentX, opponentY, isCritical);
                battleVFX.createPokemonHitFlash(opponentPokemon);
                
                // Damage calculation
                const baseDamage = attackType === 'normal' ? 20 : 
                                 attackType === 'special' ? 35 : 50;
                const damage = isCritical ? Math.floor(baseDamage * 1.5) : baseDamage;
                
                // Show damage text
                battleVFX.createDamageText(opponentX, opponentY, damage, isCritical);
                
                // Update health bar
                updateOpponentHealth(damage);
                
                // Add to battle log
                addToBattleLog(`Hit! ${getCurrentPokemonName()} dealt ${damage} damage${isCritical ? ' (CRITICAL!)' : ''}`);
                
            }, 300);
        } else {
            // Miss VFX
            setTimeout(() => {
                battleVFX.createMissEffect(opponentX, opponentY);
                battleVFX.createDamageText(opponentX, opponentY, 0, false, true);
                addToBattleLog(`${getCurrentPokemonName()} missed the attack!`);
            }, 300);
        }
        
        // Opponent counter attack after delay
        setTimeout(() => {
            performOpponentAttack();
        }, 1500);
        
    }, 500);
}

// Opponent Attack with VFX
function performOpponentAttack() {
    const playerPokemon = document.querySelector('.player-pokemon .pokemon-sprite');
    const opponentPokemon = document.querySelector('.opponent-pokemon .pokemon-sprite');
    
    const playerRect = playerPokemon.getBoundingClientRect();
    const opponentRect = opponentPokemon.getBoundingClientRect();
    
    const playerX = playerRect.left + playerRect.width / 2;
    const playerY = playerRect.top + playerRect.height / 2;
    const opponentX = opponentRect.left + opponentRect.width / 2;
    const opponentY = opponentRect.top + opponentRect.height / 2;
    
    // Opponent attack choices
    const attacks = ['normal', 'special', 'critical'];
    const opponentAttack = attacks[Math.floor(Math.random() * attacks.length)];
    
    // Hit chance for opponent (75% base chance)
    const hitChance = Math.random();
    const isHit = hitChance < 0.75;
    const isCritical = isHit && Math.random() < 0.15;
    
    // Opponent attack animation
    opponentPokemon.classList.add('attacking');
    
    setTimeout(() => {
        opponentPokemon.classList.remove('attacking');
        
        // Create opponent attack VFX
        switch(opponentAttack) {
            case 'normal':
                battleVFX.createQuickAttack(opponentX, opponentY, isHit);
                break;
            case 'special':
                battleVFX.createSuperAttack(playerX, playerY, isHit);
                break;
            case 'critical':
                battleVFX.createComboAttack(playerX, playerY, isHit);
                break;
        }
        
        if (isHit) {
            setTimeout(() => {
                battleVFX.createHitEffect(playerX, playerY, isCritical);
                battleVFX.createPokemonHitFlash(playerPokemon);
                
                const baseDamage = opponentAttack === 'normal' ? 15 : 
                                 opponentAttack === 'special' ? 30 : 40;
                const damage = isCritical ? Math.floor(baseDamage * 1.5) : baseDamage;
                
                battleVFX.createDamageText(playerX, playerY, damage, isCritical);
                updatePlayerHealth(damage);
                
                addToBattleLog(`Opponent's ${getOpponentAttackName(opponentAttack)} hit for ${damage} damage${isCritical ? ' (CRITICAL!)' : ''}`);
                
            }, 300);
        } else {
            setTimeout(() => {
                battleVFX.createMissEffect(playerX, playerY);
                battleVFX.createDamageText(playerX, playerY, 0, false, true);
                addToBattleLog(`Opponent's attack missed!`);
            }, 300);
        }
        
    }, 500);
}

// Helper functions
function getCurrentPokemonName() {
    return document.querySelector('.player-health .pokemon-name').textContent;
}

function getOpponentAttackName(attackType) {
    const names = {
        'normal': 'Quick Attack',
        'special': 'Super Attack', 
        'critical': 'Combo'
    };
    return names[attackType];
}

// Initialize attack buttons
function initializeAttackButtons() {
    const attackButtons = document.querySelectorAll('.attack-btn');
    
    attackButtons.forEach(button => {
        button.addEventListener('click', function() {
            const attackType = this.dataset.type;
            performAttack(attackType);
            
            // Disable buttons during attack sequence
            attackButtons.forEach(btn => btn.disabled = true);
            setTimeout(() => {
                attackButtons.forEach(btn => btn.disabled = false);
            }, 2500);
        });
    });
}

// Call this when battle starts
initializeAttackButtons();

// Multiplayer Battle System
class MultiplayerBattle {
    constructor() {
        this.socket = io();
        this.roomId = null;
        this.battleData = null;
        this.isMultiplayer = false;
        
        this.initializeMultiplayer();
    }

    initializeMultiplayer() {
        // Check if this is a multiplayer battle
        const urlParams = new URLSearchParams(window.location.search);
        const mode = urlParams.get('mode');
        this.roomId = urlParams.get('room');
        
        if (mode === 'multiplayer' && this.roomId) {
            this.isMultiplayer = true;
            this.setupMultiplayer();
        } else {
            // Single player battle
            new PokemonBattle();
        }
    }

    setupMultiplayer() {
        console.log('Initializing multiplayer battle for room:', this.roomId);
        
        // Show multiplayer status
        document.getElementById('multiplayer-status').style.display = 'block';
        document.getElementById('battle-room-id').textContent = this.roomId;
        
        // Get battle data from localStorage or server
        const savedBattleData = localStorage.getItem('battleData');
        if (savedBattleData) {
            this.battleData = JSON.parse(savedBattleData);
            this.initializeBattleFromData();
        } else {
            // Request battle data from server
            this.socket.emit('getRoomInfo', this.roomId);
        }

        this.setupSocketEvents();
    }

    setupSocketEvents() {
        // Battle events from server
        this.socket.on('attackResult', (data) => {
            this.handleOpponentAttack(data);
        });

        this.socket.on('battleActionUpdate', (data) => {
            this.handleBattleAction(data);
        });

        this.socket.on('playerLeft', (data) => {
            this.handlePlayerLeft(data);
        });

        this.socket.on('roomInfo', (data) => {
            if (!data.error) {
                this.battleData = data;
                this.initializeBattleFromData();
            }
        });

        this.socket.on('error', (data) => {
            console.error('Battle error:', data);
            this.addToLog(`Error: ${data.message}`);
        });
    }

    initializeBattleFromData() {
        if (!this.battleData) return;

        // Determine if current player is player1 or player2
        const currentPlayerId = this.socket.id;
        let isPlayer1 = false;
        
        if (this.battleData.players) {
            isPlayer1 = this.battleData.players[0].id === currentPlayerId;
        } else if (this.battleData.player1 && this.battleData.player2) {
            isPlayer1 = this.battleData.player1.id === currentPlayerId;
        }

        // Initialize battle state
        this.battleState = {
            isMultiplayer: true,
            isPlayer1: isPlayer1,
            playerPokemon: null,
            opponentPokemon: null,
            playerHealth: 100,
            opponentHealth: 100,
            playerMaxHealth: 100,
            opponentMaxHealth: 100,
            battleActive: true,
            playerTurn: isPlayer1, // Player 1 goes first
            battleLog: [],
            roomId: this.roomId
        };

        this.setupPlayers();
        this.setupEventListeners();
        this.startMultiplayerBattle();
    }

    setupPlayers() {
        // Set player and opponent based on multiplayer data
        if (this.battleState.isPlayer1) {
            this.battleState.playerPokemon = this.getPokemonData(this.battleData.player1.pokemon);
            this.battleState.opponentPokemon = this.getPokemonData(this.battleData.player2.pokemon);
            
            document.getElementById('player-name').textContent = this.battleData.player1.name;
            document.getElementById('opponent-name').textContent = this.battleData.player2.name;
        } else {
            this.battleState.playerPokemon = this.getPokemonData(this.battleData.player2.pokemon);
            this.battleState.opponentPokemon = this.getPokemonData(this.battleData.player1.pokemon);
            
            document.getElementById('player-name').textContent = this.battleData.player2.name;
            document.getElementById('opponent-name').textContent = this.battleData.player1.name;
        }

        // Set up Pokemon sprites and info
        this.initializePokemonVisuals();
    }

    initializePokemonVisuals() {
        // Player Pokemon
        document.getElementById('player-pokemon-sprite').style.backgroundImage = 
            `url('${this.battleState.playerPokemon.gif}')`;
        document.getElementById('player-pokemon-name').textContent = this.battleState.playerPokemon.name;

        // Opponent Pokemon
        document.getElementById('opponent-pokemon-sprite').style.backgroundImage = 
            `url('${this.battleState.opponentPokemon.gif}')`;
        document.getElementById('opponent-pokemon-name').textContent = this.battleState.opponentPokemon.name;

        // Calculate stats
        this.battleState.playerMaxHealth = this.calculateHealth(this.battleState.playerPokemon);
        this.battleState.opponentMaxHealth = this.calculateHealth(this.battleState.opponentPokemon);
        this.battleState.playerHealth = this.battleState.playerMaxHealth;
        this.battleState.opponentHealth = this.battleState.opponentMaxHealth;

        this.updateHealthBars();
    }

    startMultiplayerBattle() {
        this.addToLog(`Multiplayer battle started!`);
        this.addToLog(`You are facing ${this.battleState.isPlayer1 ? this.battleData.player2.name : this.battleData.player1.name}!`);
        
        if (this.battleState.playerTurn) {
            this.addToLog(`Your turn first!`);
            this.enableControls();
        } else {
            this.addToLog(`Waiting for opponent's turn...`);
            this.disableControls();
        }
    }

    // Override player attack for multiplayer
    playerAttack(attackType) {
        if (!this.battleState.battleActive || !this.battleState.playerTurn) return;

        this.battleState.playerTurn = false;
        this.disableControls();

        const damage = this.calculateDamage(attackType, true);
        const isCritical = this.isCriticalHit(attackType);
        const finalDamage = isCritical ? Math.floor(damage * 1.5) : damage;

        // Send attack to server
        this.socket.emit('playerAttack', {
            moveType: attackType,
            target: 'opponent',
            damage: finalDamage,
            roomId: this.roomId
        });

        // Local attack animation
        this.animateAttack('player', attackType, isCritical);
        
        setTimeout(() => {
            this.opponentTakeDamage(finalDamage, isCritical);
            this.addToLog(`You used ${attackType} attack!`);
        }, 600);
    }

    handleOpponentAttack(data) {
        if (data.playerId === this.socket.id) return; // Ignore our own attacks

        this.addToLog(`${data.playerName} used ${data.moveType} attack!`);
        
        this.animateAttack('opponent', data.moveType, false);
        
        setTimeout(() => {
            this.playerTakeDamage(data.damage, false);
            
            // After opponent's attack, it becomes our turn
            setTimeout(() => {
                this.battleState.playerTurn = true;
                this.enableControls();
                this.addToLog(`Your turn!`);
            }, 1000);
        }, 600);
    }

    handlePlayerLeft(data) {
        this.addToLog(`${data.playerName} left the battle. You win!`);
        this.endBattle(true);
    }

}

// Initialize appropriate battle type
document.addEventListener('DOMContentLoaded', () => {
    new MultiplayerBattle();
});