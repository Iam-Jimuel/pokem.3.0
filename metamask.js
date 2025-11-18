// metamask.js - MetaMask Integration for Pokemon Game

class MetaMaskIntegration {
    constructor() {
        this.connected = false;
        this.account = null;
        this.balance = null;
        this.provider = null;
        
        this.checkMetaMaskInstallation();
        this.setupEventListeners();
    }

    // Check if MetaMask is installed
    checkMetaMaskInstallation() {
        if (typeof window.ethereum === 'undefined') {
            this.showMetaMaskAlert();
            return false;
        }
        return true;
    }

    // Show alert if MetaMask is not installed
    showMetaMaskAlert() {
        const alertDiv = document.createElement('div');
        alertDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        `;
        alertDiv.innerHTML = `
            <strong>MetaMask Required</strong>
            <p>Please install MetaMask to use blockchain features.</p>
            <a href="https://metamask.io/download.html" target="_blank" style="color: white; text-decoration: underline;">
                Download MetaMask
            </a>
        `;
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            document.body.removeChild(alertDiv);
        }, 10000);
    }

    // Connect to MetaMask
    async connectWallet() {
        try {
            if (!this.checkMetaMaskInstallation()) {
                return;
            }

            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            this.account = accounts[0];
            this.connected = true;
            
            // Get account balance
            await this.getAccountBalance();
            
            // Update UI
            this.updateWalletUI();
            
            // Save connection state
            this.saveConnectionState();
            
            // Initialize game features
            this.initializeGameFeatures();
            
            console.log('Connected to MetaMask:', this.account);
            
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            this.handleConnectionError(error);
        }
    }

    // Get account balance
    async getAccountBalance() {
        try {
            const balance = await window.ethereum.request({
                method: 'eth_getBalance',
                params: [this.account, 'latest']
            });
            
            // Convert balance from wei to ETH
            this.balance = parseInt(balance) / 1e18;
            
        } catch (error) {
            console.error('Error getting balance:', error);
            this.balance = 0;
        }
    }

    // Update wallet UI
    updateWalletUI() {
        const connectBtn = document.getElementById('connect-wallet');
        const walletInfo = document.getElementById('wallet-info');
        const walletAddress = document.getElementById('wallet-address');
        const walletBalance = document.getElementById('wallet-balance');

        if (this.connected) {
            connectBtn.textContent = 'Connected';
            connectBtn.classList.add('connected');
            walletInfo.style.display = 'block';
            
            // Format address: 0x1234...5678
            const formattedAddress = `${this.account.slice(0, 6)}...${this.account.slice(-4)}`;
            walletAddress.textContent = formattedAddress;
            walletBalance.textContent = `${this.balance.toFixed(4)} ETH`;
        } else {
            connectBtn.textContent = 'Connect MetaMask';
            connectBtn.classList.remove('connected');
            walletInfo.style.display = 'none';
        }
    }

    // Initialize game features that use blockchain
    initializeGameFeatures() {
        // Enable blockchain-based features
        this.enableBlockchainRewards();
        this.setupBattleRewards();
    }

    // Enable blockchain rewards system
    enableBlockchainRewards() {
        // Add blockchain rewards to existing coin system
        const originalAddCoins = window.gameState?.addCoins;
        
        if (window.gameState) {
            window.gameState.addCoins = (amount, source = 'game') => {
                // Call original function
                if (originalAddCoins) {
                    originalAddCoins.call(window.gameState, amount);
                }
                
                // Add blockchain reward for significant achievements
                if (this.connected && amount >= 1000) {
                    this.recordAchievementOnChain(source, amount);
                }
            };
        }
    }

    // Setup battle rewards on blockchain
    setupBattleRewards() {
        // Override battle result handling to include blockchain rewards
        const originalShowBattleResult = window.showBattleResult;
        
        window.showBattleResult = (victory, reward) => {
            // Call original function
            if (originalShowBattleResult) {
                originalShowBattleResult(victory, reward);
            }
            
            // Add blockchain reward for battle victories
            if (this.connected && victory && reward >= 500) {
                this.distributeBattleReward(reward);
            }
        };
    }

    // Record achievement on blockchain (simulated - in real app, this would be a smart contract call)
    async recordAchievementOnChain(achievement, amount) {
        try {
            // In a real dApp, this would interact with a smart contract
            console.log(`Recording achievement: ${achievement} with reward: ${amount}`);
            
            // Simulate transaction
            this.showTransactionNotification('Achievement recorded on blockchain!');
            
        } catch (error) {
            console.error('Error recording achievement:', error);
        }
    }

    // Distribute battle reward (simulated)
    async distributeBattleReward(reward) {
        try {
            console.log(`Distributing battle reward: ${reward}`);
            
            // In a real dApp, this would mint tokens or transfer ETH
            this.showTransactionNotification('Battle reward distributed on blockchain!');
            
        } catch (error) {
            console.error('Error distributing reward:', error);
        }
    }

    // Show transaction notification
    showTransactionNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            animation: slideInRight 0.3s ease;
        `;
        notification.innerHTML = `
            <strong>Blockchain Update</strong>
            <p>${message}</p>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Handle connection errors
    handleConnectionError(error) {
        let errorMessage = 'Failed to connect to MetaMask';
        
        if (error.code === 4001) {
            errorMessage = 'Please connect to MetaMask to continue.';
        } else if (error.code === -32002) {
            errorMessage = 'MetaMask is already processing a request. Please check your extension.';
        }
        
        this.showErrorNotification(errorMessage);
    }

    // Show error notification
    showErrorNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            animation: slideInRight 0.3s ease;
        `;
        notification.innerHTML = `
            <strong>MetaMask Error</strong>
            <p>${message}</p>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Save connection state to localStorage
    saveConnectionState() {
        const connectionState = {
            connected: this.connected,
            account: this.account,
            lastConnected: Date.now()
        };
        localStorage.setItem('metamaskConnection', JSON.stringify(connectionState));
    }

    // Load connection state from localStorage
    loadConnectionState() {
        const savedState = localStorage.getItem('metamaskConnection');
        if (savedState) {
            const state = JSON.parse(savedState);
            
            // Auto-connect if connected recently (within 24 hours)
            const timeSinceLastConnect = Date.now() - state.lastConnected;
            if (state.connected && timeSinceLastConnect < 24 * 60 * 60 * 1000) {
                this.account = state.account;
                this.connected = true;
                this.updateWalletUI();
                this.getAccountBalance();
            }
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Connect button
        const connectBtn = document.getElementById('connect-wallet');
        if (connectBtn) {
            connectBtn.addEventListener('click', () => this.connectWallet());
        }

        // Listen for account changes
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    // User disconnected
                    this.connected = false;
                    this.account = null;
                } else {
                    // User switched accounts
                    this.account = accounts[0];
                    this.getAccountBalance();
                }
                this.updateWalletUI();
            });

            // Listen for chain changes
            window.ethereum.on('chainChanged', (chainId) => {
                console.log('Chain changed:', chainId);
                // Reload the page when network changes
                window.location.reload();
            });
        }
    }

    // Get current network
    async getCurrentNetwork() {
        if (!window.ethereum) return null;
        
        try {
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            return chainId;
        } catch (error) {
            console.error('Error getting network:', error);
            return null;
        }
    }

    // Switch network (example for Polygon)
    async switchNetwork(chainId = '0x89') { // Polygon Mainnet
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chainId }],
            });
        } catch (error) {
            console.error('Error switching network:', error);
        }
    }
}

// Initialize MetaMask integration when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.metaMaskIntegration = new MetaMaskIntegration();
    window.metaMaskIntegration.loadConnectionState();
});

// Add CSS for animations
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
`;
document.head.appendChild(style);