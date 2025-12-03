// metamask.js - Complete Web3 Integration for Pokemon Game
class PokemonWeb3 {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.contracts = {};
        this.connectedAddress = null;
        this.isConnected = false;
        
        
        this.contractAddresses = {
            pokemonToken: "0x63257cd5864aeFdd162bc8437392292860FECa03", // token contract address
            pokemonGame: "0x5940BfEd0e34d7720Cac7c5DA9b1D6F80c243B54"   // nft game contract address
        };
        
        this.contractABIs = {
            pokemonToken: [
                "function balanceOf(address) view returns (uint256)",
                "function transfer(address to, uint256 amount) returns (bool)",
                "function mintCoins(address to, uint256 amount)",
                "function burnCoins(address from, uint256 amount)",
                "function buyTokens() payable",
                "function setGameContract(address _gameContract)",
                "function name() view returns (string)",
                "function symbol() view returns (string)",
                "function decimals() view returns (uint8)"
            ],
            pokemonGame: [
                "function battleWin(address player)",
                "function battleLoss(address player)",
                "function battleEntryFee() view returns (uint256)",
                "function winReward() view returns (uint256)",
                "function lossPenalty() view returns (uint256)",
                "function getBattleCount(address player) view returns (uint256 wins, uint256 losses)"
            ]
        };
        
        this.init();
    }

    async init() {
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
            this.provider = window.ethereum;
            
            const accounts = await this.provider.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                await this.handleAccountsChanged(accounts);
            }
            
            this.provider.on('accountsChanged', (accounts) => {
                this.handleAccountsChanged(accounts);
            });
            
            this.provider.on('chainChanged', () => {
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
            this.isConnected = false;
            this.connectedAddress = null;
            this.resetGameToZero();
        } else {
            this.connectedAddress = accounts[0];
            this.isConnected = true;
            await this.setupContracts();
            await this.syncGameWithBlockchain();
        }
        this.updateUI();
    }

    async setupContracts() {
        try {
            const { ethers } = await import('https://cdn.ethers.io/lib/ethers-5.2.umd.min.js');
            this.provider = new ethers.providers.Web3Provider(window.ethereum);
            this.signer = this.provider.getSigner();
            
            this.contracts.pokemonToken = new ethers.Contract(
                this.contractAddresses.pokemonToken,
                this.contractABIs.pokemonToken,
                this.signer
            );
            
            this.contracts.pokemonGame = new ethers.Contract(
                this.contractAddresses.pokemonGame,
                this.contractABIs.pokemonGame,
                this.signer
            );
            
            console.log('Smart contracts initialized');
            return true;
        } catch (error) {
            console.error('Error setting up contracts:', error);
            return false;
        }
    }

    async syncGameWithBlockchain() {
        if (!this.isConnected) return;
        
        try {
            const tokenBalance = await this.getTokenBalance();
            
            if (window.gameState) {
                // Convert from wei to tokens (18 decimals)
                const balanceInTokens = ethers.utils.formatUnits(tokenBalance, 18);
                window.gameState.coins = Math.floor(parseFloat(balanceInTokens));
                
                // Update UI
                if (window.updateUI) window.updateUI();
                if (window.updateCollectionInfo) window.updateCollectionInfo();
                
                console.log('Game synced with blockchain. Balance:', window.gameState.coins);
                this.showNotification(`Synced: ${window.gameState.coins} POKE tokens`);
            }
        } catch (error) {
            console.error('Error syncing with blockchain:', error);
        }
    }

    resetGameToZero() {
        if (window.gameState) {
            window.gameState.coins = 0;
            if (window.updateUI) window.updateUI();
            console.log('Game reset to zero (wallet disconnected)');
        }
    }

    async getTokenBalance() {
        try {
            if (this.contracts.pokemonToken && this.connectedAddress) {
                const balance = await this.contracts.pokemonToken.balanceOf(this.connectedAddress);
                return balance;
            }
            return ethers.constants.Zero;
        } catch (error) {
            console.error('Error getting token balance:', error);
            return ethers.constants.Zero;
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
            
            await this.syncGameWithBlockchain();
            
            const tokens = ethAmount * 100;
            this.showTransactionSuccess(`Purchased ${tokens} POKE tokens!`);
            return true;
        } catch (error) {
            console.error('Error buying tokens:', error);
            this.showTransactionError('Failed to buy tokens');
            return false;
        }
    }

    // REAL BATTLE FUNCTIONS - ACTUAL BLOCKCHAIN TRANSACTIONS
    async processBattleWin() {
        if (!this.isConnected) {
            this.showConnectionError('Please connect your wallet first');
            return false;
        }

        try {
            const tx = await this.contracts.pokemonGame.battleWin(this.connectedAddress);
            await tx.wait();
            
            await this.syncGameWithBlockchain();
            
            this.showTransactionSuccess('You won 100 POKE tokens!');
            return true;
        } catch (error) {
            console.error('Error processing win:', error);
            this.showTransactionError('Failed to process battle win');
            return false;
        }
    }

    async processBattleLoss() {
        if (!this.isConnected) {
            this.showConnectionError('Please connect your wallet first');
            return false;
        }

        try {
            const tx = await this.contracts.pokemonGame.battleLoss(this.connectedAddress);
            await tx.wait();
            
            await this.syncGameWithBlockchain();
            
            this.showTransactionSuccess('Lost 25 POKE tokens from defeat');
            return true;
        } catch (error) {
            console.error('Error processing loss:', error);
            this.showTransactionError('Failed to process battle loss');
            return false;
        }
    }

    async payBattleEntryFee() {
        if (!this.isConnected) {
            this.showConnectionError('Please connect your wallet first');
            return false;
        }

        try {
            // Check if player has enough tokens
            const balance = await this.getTokenBalance();
            const entryFee = ethers.utils.parseUnits("50", 18); // 50 tokens
            
            if (balance.lt(entryFee)) {
                this.showTransactionError('Not enough POKE tokens for battle entry (need 50)');
                return false;
            }
            
            // Approve game contract to spend tokens
            const approveTx = await this.contracts.pokemonToken.approve(
                this.contractAddresses.pokemonGame,
                entryFee
            );
            await approveTx.wait();
            
            // The actual deduction will happen in battleLoss() function
            this.showTransactionSuccess('Battle entry fee approved');
            return true;
        } catch (error) {
            console.error('Error paying entry fee:', error);
            this.showTransactionError('Failed to pay battle entry fee');
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
            const ethBalance = await this.provider.request({
                method: 'eth_getBalance',
                params: [this.connectedAddress, 'latest']
            });
            
            const tokenBalance = await this.getTokenBalance();
            const tokenBalanceFormatted = ethers.utils.formatUnits(tokenBalance, 18);
            
            const balanceElement = document.getElementById('wallet-balance');
            if (balanceElement) {
                balanceElement.textContent = `${parseFloat(tokenBalanceFormatted).toFixed(2)} POKE`;
            }
        } catch (error) {
            console.error('Error loading balance:', error);
        }
    }

    showMetaMaskPrompt() {
        const notification = document.createElement('div');
        notification.className = 'web3-notification error';
        notification.innerHTML = '<span>Please install MetaMask to use blockchain features</span>';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }

    showConnectionError(message) {
        this.showNotification(`${message}`, 'error');
    }

    showTransactionSuccess(message) {
        this.showNotification(`${message}`, 'success');
    }

    showTransactionError(message) {
        this.showNotification(`${message}`, 'error');
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