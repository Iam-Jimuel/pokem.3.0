// metamask.js - Web3 Integration for Pokemon Marketplace

class PokemonWeb3 {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.contract = null;
        this.connectedAddress = null;
        this.isConnected = false;
        
        // Mock contract ABI - Replace with your actual contract ABI
        this.contractABI = [
            "function buyPokemon(uint256 pokemonId) public payable",
            "function sellPokemon(uint256 pokemonId, uint256 price) public",
            "function getPokemonPrice(uint256 pokemonId) public view returns (uint256)",
            "function getPlayerPokemons(address player) public view returns (uint256[])",
            "event PokemonPurchased(address indexed buyer, uint256 indexed pokemonId, uint256 price)",
            "event PokemonListed(address indexed seller, uint256 indexed pokemonId, uint256 price)"
        ];
        
        // Mock contract address - Replace with your deployed contract
        this.contractAddress = "0x742d35Cc6634C0532925a3b8D6B3981d6F2F1e5A";
        
        this.init();
    }

    async init() {
        // Check if MetaMask is installed
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
            
            // Listen for chain changes
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
            // Request account access
            const accounts = await this.provider.request({ 
                method: 'eth_requestAccounts' 
            });
            
            await this.handleAccountsChanged(accounts);
            
            // Get chain ID
            const chainId = await this.provider.request({ 
                method: 'eth_chainId' 
            });
            
            console.log('Connected to chain:', chainId);
            
        } catch (error) {
            console.error('User rejected connection:', error);
            this.showConnectionError('User rejected wallet connection');
        }
    }

    async handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            // User disconnected
            this.isConnected = false;
            this.connectedAddress = null;
            this.updateUI();
            console.log('Please connect to MetaMask.');
        } else {
            // User connected/switched accounts
            this.connectedAddress = accounts[0];
            this.isConnected = true;
            await this.setupContract();
            this.updateUI();
            console.log('Connected account:', this.connectedAddress);
        }
    }

    async setupContract() {
        // We'd use ethers.js or web3.js in production
        // For now, we'll mock the contract interaction
        console.log('Setting up contract interactions...');
        
        // In a real implementation:
        // const { ethers } = await import('https://cdn.ethers.io/lib/ethers-5.2.umd.min.js');
        // this.provider = new ethers.providers.Web3Provider(window.ethereum);
        // this.signer = this.provider.getSigner();
        // this.contract = new ethers.Contract(this.contractAddress, this.contractABI, this.signer);
    }

    updateUI() {
        const connectBtn = document.getElementById('connect-wallet-btn');
        const walletInfo = document.getElementById('wallet-info');
        
        if (this.isConnected && walletInfo) {
            // Update wallet info display
            const shortAddress = `${this.connectedAddress.slice(0,6)}...${this.connectedAddress.slice(-4)}`;
            walletInfo.innerHTML = `
                <div class="wallet-connected">
                    <span class="wallet-address">${shortAddress}</span>
                    <span class="wallet-balance" id="wallet-balance">Loading...</span>
                </div>
            `;
            
            // Update connect button
            if (connectBtn) {
                connectBtn.textContent = 'Connected';
                connectBtn.classList.add('connected');
            }
            
            // Load wallet balance
            this.loadWalletBalance();
            
        } else if (connectBtn) {
            connectBtn.textContent = 'Connect Wallet';
            connectBtn.classList.remove('connected');
        }
    }

    async loadWalletBalance() {
        try {
            // Get balance in wei
            const balance = await this.provider.request({
                method: 'eth_getBalance',
                params: [this.connectedAddress, 'latest']
            });
            
            // Convert from wei to ETH
            const balanceInEth = parseInt(balance) / 1e18;
            
            const balanceElement = document.getElementById('wallet-balance');
            if (balanceElement) {
                balanceElement.textContent = `${balanceInEth.toFixed(4)} ETH`;
            }
            
        } catch (error) {
            console.error('Error loading balance:', error);
        }
    }

    async buyPokemon(pokemonId, price) {
        if (!this.isConnected) {
            this.showConnectionError('Please connect your wallet first');
            return false;
        }

        try {
            // Mock transaction - replace with actual contract call
            console.log(`Buying Pokemon ${pokemonId} for ${price} ETH`);
            
            // In real implementation:
            // const tx = await this.contract.buyPokemon(pokemonId, {
            //     value: ethers.utils.parseEther(price.toString())
            // });
            // await tx.wait();
            
            this.showTransactionSuccess(`Successfully purchased Pokemon #${pokemonId}!`);
            return true;
            
        } catch (error) {
            console.error('Error buying Pokemon:', error);
            this.showTransactionError('Failed to purchase Pokemon');
            return false;
        }
    }

    async sellPokemon(pokemonId, price) {
        if (!this.isConnected) {
            this.showConnectionError('Please connect your wallet first');
            return false;
        }

        try {
            // Mock transaction - replace with actual contract call
            console.log(`Selling Pokemon ${pokemonId} for ${price} ETH`);
            
            // In real implementation:
            // const tx = await this.contract.sellPokemon(pokemonId, price);
            // await tx.wait();
            
            this.showTransactionSuccess(`Pokemon #${pokemonId} listed for sale!`);
            return true;
            
        } catch (error) {
            console.error('Error selling Pokemon:', error);
            this.showTransactionError('Failed to list Pokemon for sale');
            return false;
        }
    }

    // UI Helper Methods
    showMetaMaskPrompt() {
        // You could show a modal or notification here
        console.log('Please install MetaMask to use blockchain features');
    }

    showConnectionError(message) {
        alert(`Connection Error: ${message}`);
    }

    showTransactionSuccess(message) {
        // Create a nice success notification
        const notification = document.createElement('div');
        notification.className = 'web3-notification success';
        notification.innerHTML = `
            <span>✅ ${message}</span>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    showTransactionError(message) {
        const notification = document.createElement('div');
        notification.className = 'web3-notification error';
        notification.innerHTML = `
            <span>❌ ${message}</span>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Initialize Web3 when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pokemonWeb3 = new PokemonWeb3();
});