// metamask.js - Complete Web3 Integration for Pokemon Game

class PokemonWeb3 {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.contracts = {};
        this.connectedAddress = null;
        this.isConnected = false;
        
        // Contract addresses
        this.contractAddresses = {
            pokemonToken: "0xYOUR_TOKEN_ADDRESS_HERE", // Replace after deploy
            pokemonNFT: "0xYOUR_NFT_ADDRESS_HERE",     // Replace after deploy  
            pokemonGame: "0xYOUR_GAME_ADDRESS_HERE"    // Replace after deploy
        };
        
        // Contract ABIs
        this.contractABIs = {
            pokemonToken: [
                "function balanceOf(address) view returns (uint256)",
                "function transfer(address to, uint256 amount) returns (bool)",
                "function mintCoins(address to, uint256 amount)",
                "function burnCoins(address from, uint256 amount)",
                "function buyTokens() payable",
                "function setGameContract(address _gameContract)"
            ],
            pokemonNFT: [
                "function mintPokemon(address to, string name, string pokemonType, uint256 price, string tokenURI) returns (uint256)",
                "function getPokemon(uint256 tokenId) view returns (tuple(uint256 id, string name, string pokemonType, uint256 price, uint256 level, uint256 experience, uint256 battlesWon, uint256 battlesLost))",
                "function setGameContract(address _gameContract)"
            ],
            pokemonGame: [
                "function getStarterCoins()",
                "function buyPokemon(string name, string pokemonType, string tokenURI) returns (uint256)",
                "function battleWin(address player)",
                "function battleLoss(address player)"
            ]
        };
        
        this.init();
    }

    async init() {
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
            this.provider = window.ethereum;
            
            // Check if already connected
            const accounts = await this.provider.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                await this.handleAccountsChanged(accounts);
            }
            
            // Listen for account changes
            this.provider.on('accountsChanged', (accounts) => {
                this.handleAccountsChanged(accounts);
            });
            
            this.provider.on('chainChanged', (chainId) => {
                window.location.reload();
            });
            
        } else {
            console.log('Please install MetaMask!');
            this.showMetaMaskPrompt();
        }
    }

    async connectWallet() {
        try {
            const accounts = await this.provider.request({ 
                method: 'eth_requestAccounts' 
            });
            
            await this.handleAccountsChanged(accounts);
            return true;
            
        } catch (error) {
            console.error('User rejected connection:', error);
            this.showConnectionError('User rejected wallet connection');
            return false;
        }
    }

    async handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            // User disconnected - RESET TO ZERO
            this.isConnected = false;
            this.connectedAddress = null;
            this.resetGameToZero();
            this.updateUI();
        } else {
            // User connected - SYNC WITH BLOCKCHAIN
            this.connectedAddress = accounts[0];
            this.isConnected = true;
            await this.setupContracts();
            await this.syncGameWithBlockchain();
            this.updateUI();
        }
    }

    async setupContracts() {
        try {
            // Load ethers.js
            const { ethers } = await import('https://cdn.ethers.io/lib/ethers-5.2.umd.min.js');
            this.provider = new ethers.providers.Web3Provider(window.ethereum);
            this.signer = this.provider.getSigner();
            
            // Initialize contracts
            this.contracts.pokemonToken = new ethers.Contract(
                this.contractAddresses.pokemonToken,
                this.contractABIs.pokemonToken,
                this.signer
            );
            
            this.contracts.pokemonNFT = new ethers.Contract(
                this.contractAddresses.pokemonNFT, 
                this.contractABIs.pokemonNFT,
                this.signer
            );
            
            this.contracts.pokemonGame = new ethers.Contract(
                this.contractAddresses.pokemonGame,
                this.contractABIs.pokemonGame,
                this.signer
            );
            
            console.log('✅ Smart contracts initialized');
            return true;
        } catch (error) {
            console.error('❌ Error setting up contracts:', error);
            return false;
        }
    }

    async syncGameWithBlockchain() {
        if (!this.isConnected) return;
        
        try {
            // Get token balance from blockchain
            const tokenBalance = await this.getTokenBalance();
            
            // Update game state with REAL blockchain balance
            if (window.gameState) {
                window.gameState.coins = parseInt(tokenBalance);
                
                // If balance is 0, clear owned Pokemon (they cost coins)
                if (tokenBalance === 0) {
                    window.gameState.ownedPokemon = [];
                    window.gameState.selectedPokemon = null;
                }
                
                // Update UI
                if (window.updateUI) window.updateUI();
                if (window.populatePokemonGrid) window.populatePokemonGrid();
                if (window.updateCollectionInfo) window.updateCollectionInfo();
                
                console.log('🔄 Game synced with blockchain. Balance:', tokenBalance);
                this.showNotification(`🔄 Synced with blockchain: ${tokenBalance} coins`);
            }
        } catch (error) {
            console.error('Error syncing with blockchain:', error);
        }
    }

    resetGameToZero() {
        if (window.gameState) {
            window.gameState.coins = 0;
            window.gameState.ownedPokemon = [];
            window.gameState.selectedPokemon = null;
            
            if (window.updateUI) window.updateUI();
            if (window.populatePokemonGrid) window.populatePokemonGrid();
            if (window.updateCollectionInfo) window.updateCollectionInfo();
            if (window.saveGameState) window.saveGameState();
            
            console.log('🔄 Game reset to zero (wallet disconnected)');
        }
    }

    async getTokenBalance() {
        try {
            if (this.contracts.pokemonToken) {
                const balance = await this.contracts.pokemonToken.balanceOf(this.connectedAddress);
                return ethers.utils.formatEther(balance);
            }
            return '0';
        } catch (error) {
            console.error('Error getting token balance:', error);
            return '0';
        }
    }

    async getStarterCoins() {
        if (!this.isConnected) {
            this.showConnectionError('Please connect your wallet first');
            return false;
        }

        try {
            const tx = await this.contracts.pokemonGame.getStarterCoins();
            await tx.wait();
            
            // Sync balance after transaction
            await this.syncGameWithBlockchain();
            
            this.showTransactionSuccess('🎉 Received 500 starter coins!');
            return true;
        } catch (error) {
            console.error('Error getting starter coins:', error);
            this.showTransactionError('Failed to get starter coins');
            return false;
        }
    }

    async buyPokemon(pokemonId, price) {
        if (!this.isConnected) {
            this.showConnectionError('Please connect your wallet first');
            return false;
        }

        try {
            const pokemon = window.pokemonData.find(p => p.id === pokemonId);
            if (!pokemon) return false;

            // Call game contract to buy Pokemon
            const tx = await this.contracts.pokemonGame.buyPokemon(
                pokemon.name,
                pokemon.type,
                pokemon.gif
            );
            
            await tx.wait();
            
            // Sync after purchase
            await this.syncGameWithBlockchain();
            
            this.showTransactionSuccess(`🎉 Purchased ${pokemon.name}!`);
            return true;
        } catch (error) {
            console.error('Error buying Pokemon:', error);
            
            if (error.message.includes('insufficient balance')) {
                this.showTransactionError('Not enough coins to buy this Pokemon');
            } else {
                this.showTransactionError('Failed to purchase Pokemon');
            }
            return false;
        }
    }

    async buyTokens(ethAmount) {
        if (!this.isConnected) {
            this.showConnectionError('Please connect your wallet first');
            return false;
        }

        try {
            const tx = await this.contracts.pokemonToken.buyTokens({
                value: ethers.utils.parseEther(ethAmount.toString())
            });
            await tx.wait();
            
            // Sync balance after purchase
            await this.syncGameWithBlockchain();
            
            this.showTransactionSuccess(`💰 Purchased ${ethAmount * 100} POKE tokens!`);
            return true;
        } catch (error) {
            console.error('Error buying tokens:', error);
            this.showTransactionError('Failed to buy tokens');
            return false;
        }
    }

    updateUI() {
        const connectBtn = document.getElementById('connect-wallet-btn');
        const walletInfo = document.getElementById('wallet-info');
        
        if (this.isConnected && walletInfo) {
            const shortAddress = `${this.connectedAddress.slice(0,6)}...${this.connectedAddress.slice(-4)}`;
            walletInfo.innerHTML = `
                <div class="wallet-connected">
                    <span class="wallet-address">${shortAddress}</span>
                    <span class="wallet-balance" id="wallet-balance">Loading...</span>
                </div>
            `;
            
            if (connectBtn) {
                connectBtn.textContent = 'Connected';
                connectBtn.classList.add('connected');
            }
            
            this.loadWalletBalance();
        } else if (connectBtn) {
            connectBtn.textContent = 'Connect Wallet';
            connectBtn.classList.remove('connected');
            if (walletInfo) walletInfo.innerHTML = '';
        }
    }

    async loadWalletBalance() {
        try {
            const balance = await this.provider.request({
                method: 'eth_getBalance',
                params: [this.connectedAddress, 'latest']
            });
            
            const balanceInEth = parseInt(balance) / 1e18;
            const balanceElement = document.getElementById('wallet-balance');
            
            if (balanceElement) {
                balanceElement.textContent = `${balanceInEth.toFixed(4)} ETH`;
            }
        } catch (error) {
            console.error('Error loading balance:', error);
        }
    }

    // UI Helper Methods
    showMetaMaskPrompt() {
        const notification = document.createElement('div');
        notification.className = 'web3-notification error';
        notification.innerHTML = '<span>❌ Please install MetaMask to use blockchain features</span>';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }

    showConnectionError(message) {
        this.showNotification(`❌ ${message}`, 'error');
    }

    showTransactionSuccess(message) {
        this.showNotification(`✅ ${message}`, 'success');
    }

    showTransactionError(message) {
        this.showNotification(`❌ ${message}`, 'error');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `web3-notification ${type}`;
        notification.innerHTML = `<span>${message}</span>`;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }
}

// Initialize Web3 when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pokemonWeb3 = new PokemonWeb3();
});