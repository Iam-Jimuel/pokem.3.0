const BATTLE_ENTRY_FEE = 50;
const WIN_REWARD = 100;
const LOSS_PENALTY = 25;

class PokemonBattle {
    constructor() {
        this.battleState = {
            playerPokemon: null,
            opponentPokemon: null,
            playerTeam: [], // 4 pokemon
            opponentTeam: [], // 4 pokemon
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
            },
            roundRobin: {
                playerPokemonIndex: 0,
                opponentPokemonIndex: 0,
                playerFaintedCount: 0,
                opponentFaintedCount: 0,
                totalRounds: 0,
                playerAlivePokemon: new Set([0, 1, 2, 3, 4]), // Track alive Pokemon
                opponentAlivePokemon: new Set([0, 1, 2, 3, 4]) // Track alive Pokemon
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

        // Initialize Pokemon Teams
        this.initializeTeams();
        this.updateUI();
    }

    initializeTeams() {
        // Get player's team from game state or create default team
        const gameState = JSON.parse(localStorage.getItem('pokemonGameState') || '{}');
        
        // Player team: 5 Pokemon (1 active + 4 reserves)
        this.battleState.playerTeam = this.getPlayerTeam(gameState);
        this.battleState.playerPokemon = this.battleState.playerTeam[0];
        
        // Opponent team: 5 random Pokemon
        this.battleState.opponentTeam = this.generateOpponentTeam();
        this.battleState.opponentPokemon = this.battleState.opponentTeam[0];

        // Set up initial Pokemon sprites
        this.updatePokemonSprites();
        
        // Display team panels
        this.createTeamPanels();
        
        // Reset fainted status
        this.resetFaintedVisuals();
    }

    getPlayerTeam(gameState) {
        let team = [];
        
        // Try to get team from game state
        if (gameState.team && Array.isArray(gameState.team) && gameState.team.length > 0) {
            // Use existing team, fill with default if less than 5
            team = gameState.team.map(pokemonId => this.getPokemonData(pokemonId));
            while (team.length < 5) {
                team.push(this.getPokemonData(Math.floor(Math.random() * 50) + 1));
            }
        } else {
            // Create default team
            const defaultTeamIds = [25, 4, 7, 1, 16]; // Pikachu, Charmander, Squirtle, Bulbasaur, Pidgey
            team = defaultTeamIds.map(id => this.getPokemonData(id));
        }
        
        return team.slice(0, 5); // Ensure only 5 Pokemon
    }

    generateOpponentTeam() {
        const team = [];
        const usedIds = new Set();
        
        // Generate 5 unique Pokemon
        while (team.length < 5) {
            const randomId = Math.floor(Math.random() * 50) + 1;
            if (!usedIds.has(randomId)) {
                team.push(this.getPokemonData(randomId));
                usedIds.add(randomId);
            }
        }
        
        return team;
    }

    updatePokemonSprites() {
        // Clear any fainted classes first
        const playerSprite = document.getElementById('player-pokemon-sprite');
        const opponentSprite = document.getElementById('opponent-pokemon-sprite');
        
        playerSprite.classList.remove('fainted', 'taking-damage', 'critical-hit', 'attacking');
        opponentSprite.classList.remove('fainted', 'taking-damage', 'critical-hit', 'attacking');
        
        // Set up active Pokemon sprites
        playerSprite.style.backgroundImage = `url('${this.battleState.playerPokemon.gif}')`;
        opponentSprite.style.backgroundImage = `url('${this.battleState.opponentPokemon.gif}')`;

        // Update names
        document.getElementById('player-pokemon-name').textContent = this.battleState.playerPokemon.name;
        document.getElementById('opponent-pokemon-name').textContent = this.battleState.opponentPokemon.name;

        // Calculate stats based on Pokemon
        this.battleState.playerMaxHealth = this.calculateHealth(this.battleState.playerPokemon);
        this.battleState.opponentMaxHealth = this.calculateHealth(this.battleState.opponentPokemon);
        this.battleState.playerHealth = this.battleState.playerMaxHealth;
        this.battleState.opponentHealth = this.battleState.opponentMaxHealth;
        
        // Add entry animation
        playerSprite.classList.add('pokemon-entry');
        opponentSprite.classList.add('pokemon-entry');
        
        setTimeout(() => {
            playerSprite.classList.remove('pokemon-entry');
            opponentSprite.classList.remove('pokemon-entry');
        }, 600);
    }

    resetFaintedVisuals() {
        // Reset main battle sprites
        document.getElementById('player-pokemon-sprite').classList.remove('fainted', 'taking-damage', 'critical-hit', 'attacking');
        document.getElementById('opponent-pokemon-sprite').classList.remove('fainted', 'taking-damage', 'critical-hit', 'attacking');
    }

    createTeamPanels() {
        const playerTeamPanel = document.getElementById('player-team-panel');
        const opponentTeamPanel = document.getElementById('opponent-team-panel');
        
        // Clear existing panels
        playerTeamPanel.innerHTML = '';
        opponentTeamPanel.innerHTML = '';
        
        // Create player team panel
        this.battleState.playerTeam.forEach((pokemon, index) => {
            const pokemonElement = this.createTeamPokemonElement(pokemon, index === 0);
            pokemonElement.addEventListener('click', () => this.switchPokemon(index, true));
            playerTeamPanel.appendChild(pokemonElement);
        });
        
        // Create opponent team panel (read-only)
        this.battleState.opponentTeam.forEach((pokemon, index) => {
            const pokemonElement = this.createTeamPokemonElement(pokemon, index === 0, false);
            opponentTeamPanel.appendChild(pokemonElement);
        });
        
        // Show team panels
        playerTeamPanel.style.display = 'flex';
        opponentTeamPanel.style.display = 'flex';
    }

    createTeamPokemonElement(pokemon, isActive = false, isPlayer = true) {
        const element = document.createElement('div');
        element.className = `team-pokemon ${isActive ? 'active' : 'reserve'} ${isPlayer ? 'player' : 'opponent'}`;
        
        element.innerHTML = `
            <div class="team-pokemon-sprite" style="background-image: url('${pokemon.gif}')"></div>
            <div class="team-pokemon-info">
                <span class="team-pokemon-name">${pokemon.name}</span>
                <span class="team-pokemon-type">${pokemon.type}</span>
            </div>
            ${isActive ? '<div class="active-indicator">⚡</div>' : ''}
        `;
        
        return element;
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
            { id: 46, name: "Snoorlax", type: "Happy", price: 500, gif: "https://projectpokemon.org/home/uploads/monthly_2018_05/large.ShinySnorlax.Gif.a3f81dc2af71384a08a36aae27ac67d1.Gif" }
        ];
        
        return pokemonList.find(p => p.id === id) || pokemonList[0];
    }

    calculateHealth(pokemon) {
        return 80 + (pokemon.price / 10);
    }

    startBattle() {
        this.battleState.battleActive = true;
        this.addToLog(`Round Robin Battle Start!`);
        this.addToLog(`You sent out ${this.battleState.playerPokemon.name}!`);
        this.addToLog(`Opponent sent out ${this.battleState.opponentPokemon.name}!`);
        
        // Enable battle controls
        document.getElementById('battle-controls').style.opacity = '1';
        document.getElementById('battle-controls').style.pointerEvents = 'all';
        
        // Show switch Pokemon button
        document.getElementById('switch-btn').style.display = 'block';
        
        // Make sure controls are enabled
        this.enableControls();
    }

    setupEventListeners() {
        // Attack buttons
        document.querySelectorAll('.attack-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!this.battleState.battleActive || !this.battleState.playerTurn) {
                    console.log("Can't attack: battleActive=", this.battleState.battleActive, "playerTurn=", this.battleState.playerTurn);
                    return;
                }
                
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

        document.getElementById('switch-btn').addEventListener('click', () => {
            this.showSwitchMenu();
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
        if (!this.battleState.battleActive || !this.battleState.playerTurn) {
            console.log("Attack prevented: battleActive=", this.battleState.battleActive, "playerTurn=", this.battleState.playerTurn);
            return;
        }

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
                    this.handlePokemonFainted(false); // Opponent Pokemon fainted
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
                    this.addToLog(`Your turn!`);
                } else {
                    this.handlePokemonFainted(true); // Player Pokemon fainted
                }
            }, 1000);
        }, 600);
    }

    handlePokemonFainted(isPlayer) {
        if (isPlayer) {
            this.battleState.roundRobin.playerFaintedCount++;
            const faintedIndex = this.battleState.roundRobin.playerPokemonIndex;
            this.battleState.roundRobin.playerAlivePokemon.delete(faintedIndex);
            this.addToLog(`${this.battleState.playerPokemon.name} fainted!`);
            
            // Check if player has remaining Pokemon
            if (this.battleState.roundRobin.playerAlivePokemon.size === 0) {
                this.endBattle(false);
                return;
            }
            
            // Automatically switch to next available Pokemon
            setTimeout(() => {
                this.autoSwitchPokemon(true);
            }, 1500);
        } else {
            this.battleState.roundRobin.opponentFaintedCount++;
            const faintedIndex = this.battleState.roundRobin.opponentPokemonIndex;
            this.battleState.roundRobin.opponentAlivePokemon.delete(faintedIndex);
            this.addToLog(`${this.battleState.opponentPokemon.name} fainted!`);
            
            // Check if opponent has remaining Pokemon
            if (this.battleState.roundRobin.opponentAlivePokemon.size === 0) {
                this.endBattle(true);
                return;
            }
            
            // Opponent switches to next Pokemon
            setTimeout(() => {
                this.autoSwitchPokemon(false);
                
                // Player's turn after opponent switches
                setTimeout(() => {
                    this.battleState.playerTurn = true;
                    this.enableControls(); 
                    this.addToLog(`Your turn!`);
                }, 1000);
            }, 1500);
        }
    }

    autoSwitchPokemon(isPlayer) {
        if (isPlayer) {
            // Find next available player Pokemon
            for (let i = 0; i < 5; i++) {
                if (this.battleState.roundRobin.playerAlivePokemon.has(i) && 
                    i !== this.battleState.roundRobin.playerPokemonIndex) {
                    this.switchPokemon(i, true, true);
                    return;
                }
            }
        } else {
            // Opponent switches to next alive Pokemon
            for (let i = 0; i < 5; i++) {
                if (this.battleState.roundRobin.opponentAlivePokemon.has(i) && 
                    i !== this.battleState.roundRobin.opponentPokemonIndex) {
                    this.switchPokemon(i, false, true);
                    return;
                }
            }
        }
    }

    switchPokemon(index, isPlayer, isAuto = false) {
        if (!isAuto && !this.battleState.playerTurn) {
            this.addToLog("Cannot switch Pokemon now!");
            return;
        }

        if (isPlayer) {
            // Check if Pokemon is alive
            if (!this.battleState.roundRobin.playerAlivePokemon.has(index)) {
                this.addToLog(`${this.battleState.playerTeam[index].name} has fainted!`);
                return;
            }

            // Validate switch
            if (index === this.battleState.roundRobin.playerPokemonIndex) {
                this.addToLog(`${this.battleState.playerPokemon.name} is already active!`);
                return;
            }

            // Update active Pokemon
            this.battleState.roundRobin.playerPokemonIndex = index;
            this.battleState.playerPokemon = this.battleState.playerTeam[index];
            
            // Reset health for new Pokemon
            this.battleState.playerMaxHealth = this.calculateHealth(this.battleState.playerPokemon);
            this.battleState.playerHealth = this.battleState.playerMaxHealth;
            
            // Update UI
            this.updatePokemonSprites();
            this.updateTeamPanel();
            
            if (!isAuto) {
                this.addToLog(`Go! ${this.battleState.playerPokemon.name}!`);
                
                // Opponent gets to attack after player switches
                setTimeout(() => {
                    this.opponentAttack();
                }, 1000);
            } else {
                // auto switch 
                this.addToLog(`Go! ${this.battleState.playerPokemon.name}!`);
                
                // Enable controls for the player's turn
                setTimeout(() => {
                    this.battleState.playerTurn = true;
                    this.enableControls(); // Enable controls after auto-switch
                    this.addToLog(`Your turn!`);
                }, 1000);
            }
        } else {
            // Opponent switch
            this.battleState.roundRobin.opponentPokemonIndex = index;
            this.battleState.opponentPokemon = this.battleState.opponentTeam[index];
            
            // Reset health for new Pokemon
            this.battleState.opponentMaxHealth = this.calculateHealth(this.battleState.opponentPokemon);
            this.battleState.opponentHealth = this.battleState.opponentMaxHealth;
            
            // Update UI
            this.updatePokemonSprites();
            this.updateTeamPanel();
            
            this.addToLog(`Opponent sent out ${this.battleState.opponentPokemon.name}!`);
        }
    }

    showSwitchMenu() {
        if (!this.battleState.playerTurn) {
            this.addToLog("Cannot switch Pokemon now!");
            return;
        }

        const switchMenu = document.getElementById('switch-menu');
        const switchList = document.getElementById('switch-list');
        
        // Clear existing list
        switchList.innerHTML = '';
        
        // Create switch options for alive reserve Pokemon
        let hasAlivePokemon = false;
        this.battleState.playerTeam.forEach((pokemon, index) => {
            if (index !== this.battleState.roundRobin.playerPokemonIndex && 
                this.battleState.roundRobin.playerAlivePokemon.has(index)) {
                const switchItem = document.createElement('div');
                switchItem.className = 'switch-item';
                switchItem.innerHTML = `
                    <div class="switch-sprite" style="background-image: url('${pokemon.gif}')"></div>
                    <div class="switch-info">
                        <span class="switch-name">${pokemon.name}</span>
                        <span class="switch-type">${pokemon.type}</span>
                    </div>
                `;
                
                switchItem.addEventListener('click', () => {
                    this.switchPokemon(index, true);
                    switchMenu.style.display = 'none';
                });
                
                switchList.appendChild(switchItem);
                hasAlivePokemon = true;
            }
        });
        
        if (!hasAlivePokemon) {
            const noPokemon = document.createElement('div');
            noPokemon.className = 'switch-item';
            noPokemon.innerHTML = `<div style="color: #aaa; text-align: center; width: 100%;">No available Pokemon to switch!</div>`;
            switchList.appendChild(noPokemon);
        }
        
        // Show switch menu
        switchMenu.style.display = 'block';
    }

    updateTeamPanel() {
        // Update player team panel
        const playerTeamElements = document.querySelectorAll('#player-team-panel .team-pokemon');
        playerTeamElements.forEach((element, index) => {
            element.classList.toggle('active', index === this.battleState.roundRobin.playerPokemonIndex);
            element.classList.toggle('fainted', !this.battleState.roundRobin.playerAlivePokemon.has(index));
            
            // Update active indicator
            const indicator = element.querySelector('.active-indicator');
            if (indicator) {
                indicator.style.display = index === this.battleState.roundRobin.playerPokemonIndex ? 'block' : 'none';
            }
            
            // Update cursor
            if (this.battleState.roundRobin.playerAlivePokemon.has(index)) {
                element.style.cursor = 'pointer';
            } else {
                element.style.cursor = 'not-allowed';
            }
        });
        
        // Update opponent team panel
        const opponentTeamElements = document.querySelectorAll('#opponent-team-panel .team-pokemon');
        opponentTeamElements.forEach((element, index) => {
            element.classList.toggle('active', index === this.battleState.roundRobin.opponentPokemonIndex);
            element.classList.toggle('fainted', !this.battleState.roundRobin.opponentAlivePokemon.has(index));
        });
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
            `${Math.round(this.battleState.playerHealth)}/${Math.round(this.battleState.playerMaxHealth)}`;
        document.getElementById('opponent-health-text').textContent = 
            `${Math.round(this.battleState.opponentHealth)}/${Math.round(this.battleState.opponentMaxHealth)}`;

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
            this.battleState.rewards.exp = 100;
            this.addToLog(`You won the Round Robin battle!`);
        } else {
            this.battleState.rewards.coins = -LOSS_PENALTY;
            this.addToLog(`You lost the Round Robin battle!`);
        }

        setTimeout(() => {
            this.showBattleResult(playerWon);
            this.saveBattleResult(playerWon);
        }, 1500);
    }

    saveBattleResult(playerWon) {
        if (playerWon) {
            localStorage.setItem('battleResult', 'win');
            localStorage.setItem('coinsEarned', WIN_REWARD.toString());
        } else {
            localStorage.setItem('battleResult', 'lose');
            localStorage.setItem('coinsLost', LOSS_PENALTY.toString());
        }
    }

    showBattleResult(playerWon) {
        const modal = document.getElementById('battle-modal');
        const resultHeader = document.getElementById('result-header');
        const resultMessage = document.getElementById('result-message');
        const rewardsDiv = document.getElementById('rewards');

        modal.style.display = 'flex';
        
        // Add team summary
        const playerFainted = 5 - this.battleState.roundRobin.playerAlivePokemon.size;
        const opponentFainted = 5 - this.battleState.roundRobin.opponentAlivePokemon.size;
        
        if (playerWon) {
            modal.className = 'battle-modal victory';
            resultHeader.innerHTML = '<h2>Victory!</h2>';
            resultMessage.textContent = `You defeated all opponent Pokemon!`;
            
            rewardsDiv.innerHTML = `
                <div class="reward-item">
                    <span>Coins Earned:</span>
                    <span class="reward-amount">+🪙 ${WIN_REWARD}</span>
                </div>
                <div class="reward-item">
                    <span>Experience:</span>
                    <span class="reward-amount">⭐ 100</span>
                </div>
                <div class="reward-item">
                    <span>Opponent Pokemon Defeated:</span>
                    <span class="reward-amount">${opponentFainted}/5</span>
                </div>
                <div class="reward-item">
                    <span>Your Pokemon Remaining:</span>
                    <span class="reward-amount">${this.battleState.roundRobin.playerAlivePokemon.size}/5</span>
                </div>
            `;
            this.updatePlayerCoins(WIN_REWARD);
            this.playSound('win');
        } else {
            modal.className = 'battle-modal defeat';
            resultHeader.innerHTML = '<h2>Defeat!</h2>';
            resultMessage.textContent = `You defeated ${opponentFainted} opponent Pokemon.`;
            
            rewardsDiv.innerHTML = `
                <div class="reward-item">
                    <span>Coins Lost:</span>
                    <span class="reward-amount" style="color: #ff4444;">-🪙 ${LOSS_PENALTY}</span>
                </div>
                <div class="reward-item">
                    <span>Battle Fee:</span>
                    <span class="reward-amount" style="color: #ff4444;">-🪙 ${BATTLE_ENTRY_FEE}</span>
                </div>
                <div class="reward-item">
                    <span>Opponent Pokemon Defeated:</span>
                    <span class="reward-amount">${opponentFainted}/5</span>
                </div>
                <div class="reward-item">
                    <span>Your Pokemon Remaining:</span>
                    <span class="reward-amount">${this.battleState.roundRobin.playerAlivePokemon.size}/5</span>
                </div>
            `;

            this.updatePlayerCoins(-LOSS_PENALTY);
            this.playSound('lose');
        }
    }

    updatePlayerCoins(coins) {
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
        document.getElementById('switch-menu').style.display = 'none';
        
        // Reset battle state
        this.battleState.playerHealth = this.battleState.playerMaxHealth;
        this.battleState.opponentHealth = this.battleState.opponentMaxHealth;
        this.battleState.battleActive = true;
        this.battleState.playerTurn = true;
        this.battleState.battleLog = [];
        this.battleState.roundRobin = {
            playerPokemonIndex: 0,
            opponentPokemonIndex: 0,
            playerFaintedCount: 0,
            opponentFaintedCount: 0,
            totalRounds: 0,
            playerAlivePokemon: new Set([0, 1, 2, 3, 4]),
            opponentAlivePokemon: new Set([0, 1, 2, 3, 4])
        };
        
        // Reset visuals
        this.resetFaintedVisuals();
        document.getElementById('battle-log').innerHTML = '';
        
        // Reset to first Pokemon in team
        this.battleState.playerPokemon = this.battleState.playerTeam[0];
        this.battleState.opponentPokemon = this.battleState.opponentTeam[0];
        
        this.updatePokemonSprites();
        this.updateTeamPanel();
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
        console.log("Disabling controls");
        document.querySelectorAll('.attack-btn, .action-btn, #switch-btn').forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
        });
    }

    enableControls() {
        if (!this.battleState.battleActive || !this.battleState.playerTurn) {
            console.log("Not enabling controls: battleActive=", this.battleState.battleActive, "playerTurn=", this.battleState.playerTurn);
            return;
        }
        
        console.log("Enabling controls");
        document.querySelectorAll('.attack-btn, .action-btn, #switch-btn').forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
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
    
    /* Team Panel Styles */
    .team-panel {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 15px;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 10px;
        margin: 10px;
        max-width: 250px;
    }
    
    .team-pokemon {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid transparent;
    }
    
    .team-pokemon:hover:not(.fainted) {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
    }
    
    .team-pokemon.active {
        border-color: #4cd964;
        background: rgba(76, 217, 100, 0.2);
    }
    
    .team-pokemon.fainted {
        opacity: 0.5;
        filter: grayscale(1);
        cursor: not-allowed;
    }
    
    .team-pokemon.player.active {
        border-color: #4cd964;
    }
    
    .team-pokemon.opponent.active {
        border-color: #ff4444;
    }
    
    .team-pokemon-sprite {
        width: 40px;
        height: 40px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    
    .team-pokemon-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }
    
    .team-pokemon-name {
        font-weight: bold;
        color: white;
        font-size: 14px;
    }
    
    .team-pokemon-type {
        font-size: 12px;
        color: #aaa;
    }
    
    .active-indicator {
        margin-left: auto;
        font-size: 18px;
        color: #ffcc00;
    }
    
    /* Switch Menu Styles */
    .switch-menu {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        border: 3px solid #4cd964;
        border-radius: 15px;
        padding: 20px;
        z-index: 1000;
        min-width: 300px;
        display: none;
    }
    
    .switch-header {
        text-align: center;
        margin-bottom: 15px;
        color: white;
        font-size: 18px;
        border-bottom: 2px solid #4cd964;
        padding-bottom: 10px;
    }
    
    .switch-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: 300px;
        overflow-y: auto;
    }
    
    .switch-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 10px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .switch-item:hover {
        background: rgba(76, 217, 100, 0.3);
        transform: scale(1.02);
    }
    
    .switch-sprite {
        width: 50px;
        height: 50px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    
    .switch-info {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    
    .switch-name {
        font-weight: bold;
        color: white;
        font-size: 16px;
    }
    
    .switch-type {
        font-size: 14px;
        color: #aaa;
    }
    
    /* Close button for switch menu */
    .switch-close {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
    }
    
    /* Entry Animation for New Pokemon */
    @keyframes pokemonEntry {
        0% { 
            transform: scale(0) translateY(-50px);
            opacity: 0;
        }
        70% {
            transform: scale(1.1) translateY(5px);
            opacity: 1;
        }
        100% {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }
    
    .pokemon-entry {
        animation: pokemonEntry 0.6s ease-out forwards;
    }
    
    /* Battle Controls Styling */
    .attack-btn, .action-btn, #switch-btn {
        transition: all 0.3s ease;
    }
    
    .attack-btn:disabled, .action-btn:disabled, #switch-btn:disabled {
        opacity: 0.5 !important;
        cursor: not-allowed !important;
        transform: none !important;
    }
    
    .attack-btn:not(:disabled):hover, .action-btn:not(:disabled):hover, #switch-btn:not(:disabled):hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
`;
document.head.appendChild(vfxStyle);

// Initialize battle when page loads
document.addEventListener('DOMContentLoaded', () => {
    new PokemonBattle();
    
    // Add close button functionality for switch menu
    const closeSwitch = document.createElement('button');
    closeSwitch.className = 'switch-close';
    closeSwitch.innerHTML = '✕';
    closeSwitch.addEventListener('click', () => {
        document.getElementById('switch-menu').style.display = 'none';
    });
    document.getElementById('switch-menu').appendChild(closeSwitch);
    
    // Close switch menu when clicking outside
    document.addEventListener('click', (e) => {
        const switchMenu = document.getElementById('switch-menu');
        if (switchMenu.style.display === 'block' && !switchMenu.contains(e.target) && 
            !document.getElementById('switch-btn').contains(e.target)) {
            switchMenu.style.display = 'none';
        }
    });
});