// MetaMask event listeners
if (typeof window.ethereum !== 'undefined') {
    // Listen for account changes
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
            // User disconnected MetaMask
            metamaskState.isConnected = false;
            metamaskState.account = null;
            showNotification('MetaMask disconnected');
        } else {
            // Account changed
            metamaskState.account = accounts[0];
            connectMetaMask(); // Reconnect with new account
        }
    });
    
    // Listen for chain changes
    window.ethereum.on('chainChanged', (chainId) => {
        // Reload the page when network changes
        window.location.reload();
    });
}

// Utility functions for crypto transactions
async function sendTransaction(toAddress, amount) {
    if (!metamaskState.isConnected || !metamaskState.web3) {
        throw new Error('MetaMask not connected');
    }
    
    const transactionParameters = {
        to: toAddress,
        from: metamaskState.account,
        value: metamaskState.web3.utils.toWei(amount.toString(), 'ether')
    };
    
    try {
        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters]
        });
        
        return txHash;
    } catch (error) {
        console.error('Transaction failed:', error);
        throw error;
    }
}

// Get current gas price
async function getGasPrice() {
    if (metamaskState.web3) {
        return await metamaskState.web3.eth.getGasPrice();
    }
    return null;
}