class MetaMaskLogin {
    constructor() {
        this.web3 = null;
        this.userAccount = null;
        this.loginBtn = document.getElementById('metamaskLogin');
        this.statusDiv = document.getElementById('loginStatus');
        
        this.init();
    }

    async init() {
        this.loginBtn.addEventListener('click', () => this.loginWithMetaMask());
        
        // Check if MetaMask is already connected
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ 
                    method: 'eth_accounts' 
                });
                
                if (accounts.length > 0) {
                    this.userAccount = accounts[0];
                    this.showStatus('🔗 MetaMask already connected! Click to enter the game.', 'info');
                    this.updateButtonText('Enter Pokemon Arena →');
                }
            } catch (error) {
                console.error('Error checking accounts:', error);
            }
        }

        // Add video error handling
        this.setupVideoFallback();
    }

    setupVideoFallback() {
        const video = document.getElementById('pokemonVideo');
        video.addEventListener('error', () => {
            console.log('Video failed to load, using fallback background');
            document.querySelector('.video-background').style.background = 
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        });
    }

    async loginWithMetaMask() {
        // Check if MetaMask is installed
        if (typeof window.ethereum === 'undefined') {
            this.showStatus('MetaMask is not installed! Please install MetaMask to play the Pokemon game.', 'error');
            this.openMetaMaskInstall();
            return;
        }

        try {
            this.setLoading(true);
            
            // Request account access
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            
            this.userAccount = accounts[0];
            this.web3 = new Web3(window.ethereum);
            
            this.showStatus('Successfully connected! Entering Pokemon Arena...', 'success');
            this.updateButtonText('Welcome Trainer!');
            
            // Save user data to localStorage
            this.saveUserData();
            
            // Add celebration effect
            this.celebrate();
            
            // Redirect to game after short delay
            setTimeout(() => {
                window.location.href = 'game.html';
            }, 2500);
            
        } catch (error) {
            console.error('MetaMask login error:', error);
            this.handleLoginError(error);
        } finally {
            this.setLoading(false);
        }
    }

    handleLoginError(error) {
        if (error.code === 4001) {
            this.showStatus('Connection rejected. Please connect MetaMask to start your Pokemon journey.', 'error');
        } else if (error.code === -32002) {
            this.showStatus('MetaMask request already pending. Please check your MetaMask extension.', 'error');
        } else {
            this.showStatus('Error connecting to MetaMask. Please try again.', 'error');
        }
    }

    openMetaMaskInstall() {
        setTimeout(() => {
            if (confirm('MetaMask is required to play. Would you like to visit the installation page?')) {
                window.open('https://metamask.io/download.html', '_blank');
            }
        }, 1000);
    }

    saveUserData() {
        const userData = {
            walletAddress: this.userAccount,
            loginTime: new Date().toISOString(),
            isLoggedIn: true,
            lastLogin: Date.now()
        };
        
        localStorage.setItem('pokemonUserData', JSON.stringify(userData));
        console.log('User data saved:', userData);
    }

    showStatus(message, type) {
        this.statusDiv.textContent = message;
        this.statusDiv.className = `status-message status-${type}`;
        this.statusDiv.classList.remove('hidden');
        
        // Auto-hide success messages after redirect time
        if (type === 'success') {
            setTimeout(() => {
                this.statusDiv.classList.add('hidden');
            }, 2000);
        }
    }

    setLoading(loading) {
        if (loading) {
            this.loginBtn.classList.add('loading');
            this.loginBtn.innerHTML = `
                <span class="btn-icon">⏳</span>
                <span class="btn-text">Connecting to MetaMask...</span>
                <span class="btn-arrow"></span>
            `;
        } else {
            this.loginBtn.classList.remove('loading');
            // Text will be updated by updateButtonText
        }
    }

    updateButtonText(text) {
        const btnText = this.loginBtn.querySelector('.btn-text');
        if (btnText) {
            btnText.textContent = text;
        }
    }

    celebrate() {
        // Add a simple celebration effect
        this.loginBtn.style.background = 'linear-gradient(135deg, #00b894, #00cec9)';
        this.loginBtn.style.transform = 'scale(1.05)';
        
        // Add confetti effect (simple version)
        this.createConfetti();
    }

    createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
        const confettiCount = 20;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.innerHTML = ['⭐', '⚡', '🔥', '💧', '🌿'][Math.floor(Math.random() * 5)];
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-50px';
                confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
                confetti.style.opacity = '0.8';
                confetti.style.zIndex = '1000';
                confetti.style.pointerEvents = 'none';
                confetti.style.animation = `confettiFall ${Math.random() * 2 + 1}s linear forwards`;
                
                document.body.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => confetti.remove(), 2000);
            }, i * 100);
        }
        
        // Add confetti animation to CSS
        if (!document.querySelector('#confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.textContent = `
                @keyframes confettiFall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize the login system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MetaMaskLogin();
});

// Listen for account changes
if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
            // User disconnected their wallet
            localStorage.removeItem('pokemonUserData');
            console.log('User disconnected wallet');
            
            // Update UI if still on login page
            const loginBtn = document.getElementById('metamaskLogin');
            if (loginBtn) {
                loginBtn.querySelector('.btn-text').textContent = 'Connect MetaMask';
            }
        }
    });
    
    // Listen for chain changes
    window.ethereum.on('chainChanged', (chainId) => {
        console.log('Chain changed:', chainId);
   
    });
}