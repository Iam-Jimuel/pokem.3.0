// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Serve static files from current directory
app.use(express.static(__dirname));

// Game state
const rooms = new Map();
const players = new Map();

// Battle rooms management
class BattleRoom {
    constructor(roomId, creator, maxPlayers = 2) {
        this.roomId = roomId;
        this.maxPlayers = maxPlayers;
        this.players = [{
            id: creator.id,
            name: creator.name,
            pokemon: creator.pokemon,
            ready: false
        }];
        this.spectators = [];
        this.battleState = {
            player1: null,
            player2: null,
            player1Ready: false,
            player2Ready: false,
            battleStarted: false,
            currentTurn: null,
            player1Health: 100,
            player2Health: 100,
            player1Pokemon: null,
            player2Pokemon: null
        };
    }

    addPlayer(player) {
        if (this.players.length < this.maxPlayers) {
            this.players.push({
                id: player.id,
                name: player.name,
                pokemon: player.pokemon,
                ready: false
            });
            return true;
        }
        return false;
    }

    removePlayer(playerId) {
        this.players = this.players.filter(p => p.id !== playerId);
    }

    isFull() {
        return this.players.length >= this.maxPlayers;
    }

    getOpponent(playerId) {
        return this.players.find(p => p.id !== playerId);
    }

    setPlayerReady(playerId) {
        const player = this.players.find(p => p.id === playerId);
        if (player) {
            player.ready = true;
        }
        return this.players.every(p => p.ready);
    }
}

// Socket connection handling
io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id);

    // Create new battle room
    socket.on('createRoom', (playerData) => {
        try {
            console.log('Creating room for:', playerData);
            const roomId = generateRoomId();

            // Create room with maxPlayers default 4 (or change as needed)
            const room = new BattleRoom(roomId, {
                id: socket.id,
                ...playerData
            }, 4);
            rooms.set(roomId, room);
            
            socket.join(roomId);
            socket.emit('roomCreated', roomId);
            
            console.log(`Room ${roomId} created by ${playerData.name}`);
            
            // Send initial room state
            socket.emit('playerJoined', { room });
            
        } catch (error) {
            console.error('Error creating room:', error);
            socket.emit('error', 'Failed to create room');
        }
    });

    // Join existing room
    socket.on('joinRoom', (data) => {
        try {
            const { roomId, playerData } = data;
            console.log(`Player ${playerData.name} joining room:`, roomId);
            
            const room = rooms.get(roomId);
            if (!room) {
                socket.emit('error', 'Room not found');
                return;
            }
            
            if (room.isFull()) {
                socket.emit('error', 'Room is full');
                return;
            }
            
            // Add player to room
            const success = room.addPlayer({
                id: socket.id,
                ...playerData
            });

            if (!success) {
                socket.emit('error', 'Unable to join room');
                return;
            }
            
            socket.join(roomId);
            socket.emit('roomJoined', { roomId, success: true });
            
            // Notify all players in the room
            io.to(roomId).emit('playerJoined', { room });
            
            console.log(`Player ${playerData.name} joined room ${roomId}`);
            
        } catch (error) {
            console.error('Error joining room:', error);
            socket.emit('error', 'Failed to join room');
        }
    });

    // Player ready up
    socket.on('playerReady', () => {
        try {
            // Find which room the player is in
            let playerRoom = null;
            let roomId = null;
            
            for (const [id, room] of rooms.entries()) {
                if (room.players.find(p => p.id === socket.id)) {
                    playerRoom = room;
                    roomId = id;
                    break;
                }
            }
            
            if (!playerRoom) {
                socket.emit('error', 'Not in a room');
                return;
            }
            
            // Set player as ready
            const allReady = playerRoom.setPlayerReady(socket.id);
            
            // Notify all players in the room
            io.to(roomId).emit('playerReadyUpdate', playerRoom.players);
            
            console.log(`Player ${socket.id} ready in room ${roomId}. All ready: ${allReady}`);
            
            // If both players are ready, start battle
            // if (allReady && playerRoom.isFull()) {
            //     const player1 = playerRoom.players[0];
            //     const player2 = playerRoom.players[1];
                
            //     const battleData = {
            //         player1: player1,
            //         player2: player2,
            //         roomId: roomId
            //     };
                
            //     io.to(roomId).emit('battleStarted', battleData);
            //     console.log(`Battle started in room ${roomId}`);
            // }
            
        } catch (error) {
            console.error('Error setting player ready:', error);
            socket.emit('error', 'Failed to set ready status');
        }
    });

    // New event handler for starting battle on demand
    socket.on('startBattle', () => {
        try {
            let playerRoom = null;
            let roomId = null;

            for (const [id, room] of rooms.entries()) {
                if (room.players.find(p => p.id === socket.id)) {
                    playerRoom = room;
                    roomId = id;
                    break;
                }
            }

            if (!playerRoom) {
                socket.emit('error', 'Not in a room');
                return;
            }

            // Check if all players are ready
            const allReady = playerRoom.players.every(p => p.ready);
            if (!allReady) {
                socket.emit('error', 'Not all players are ready');
                return;
            }

            // Emit battleStarted event to room
            const battleData = {
                player1: playerRoom.players[0],
                player2: playerRoom.players[1],
                roomId: roomId
            };

            io.to(roomId).emit('battleStarted', battleData);
            console.log(`Battle started in room ${roomId} by player ${socket.id}`);
        } catch (error) {
            console.error('Error starting battle:', error);
            socket.emit('error', 'Failed to start battle');
        }
    });

    // New event handler for starting battle on demand
    socket.on('startBattle', () => {
        try {
            let playerRoom = null;
            let roomId = null;
            
            for (const [id, room] of rooms.entries()) {
                if (room.players.find(p => p.id === socket.id)) {
                    playerRoom = room;
                    roomId = id;
                    break;
                }
            }
            
            if (!playerRoom) {
                socket.emit('error', 'Not in a room');
                return;
            }
            
            // Check if all players are ready
            const allReady = playerRoom.players.every(p => p.ready);
            if (!allReady) {
                socket.emit('error', 'Not all players are ready');
                return;
            }
            
            // Emit battleStarted event to room
            const battleData = {
                player1: playerRoom.players[0],
                player2: playerRoom.players[1],
                roomId: roomId
            };
            
            io.to(roomId).emit('battleStarted', battleData);
            console.log(`Battle started in room ${roomId} by player ${socket.id}`);
        } catch (error) {
            console.error('Error starting battle:', error);
            socket.emit('error', 'Failed to start battle');
        }
    });

    // Chat messages
    socket.on('sendMessage', (message) => {
        try {
            // Find which room the player is in
            let roomId = null;
            for (const [id, room] of rooms.entries()) {
                if (room.players.find(p => p.id === socket.id)) {
                    roomId = id;
                    break;
                }
            }
            
            if (roomId) {
                const player = players.get(socket.id);
                const playerName = player ? player.name : 'Unknown';
                
                io.to(roomId).emit('newMessage', {
                    player: socket.id,
                    playerName: playerName,
                    message: message
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    // Player attack
    socket.on('playerAttack', (attackData) => {
        try {
            // Find which room the player is in
            let roomId = null;
            let playerRoom = null;
            
            for (const [id, room] of rooms.entries()) {
                if (room.players.find(p => p.id === socket.id)) {
                    roomId = id;
                    playerRoom = room;
                    break;
                }
            }
            
            if (roomId && playerRoom) {
                const damage = calculateDamage(attackData.moveType);
                
                io.to(roomId).emit('attackResult', {
                    player: socket.id,
                    moveType: attackData.moveType,
                    damage: damage,
                    timestamp: Date.now()
                });
            }
        } catch (error) {
            console.error('Error processing attack:', error);
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('❌ User disconnected:', socket.id);
        
        // Remove player from rooms
        for (const [roomId, room] of rooms.entries()) {
            if (room.players.find(p => p.id === socket.id)) {
                room.removePlayer(socket.id);
                
                // Notify other players
                socket.to(roomId).emit('playerLeft', { playerId: socket.id });
                
                // If room becomes empty, delete it
                if (room.players.length === 0) {
                    rooms.delete(roomId);
                }
                
                console.log(`Player ${socket.id} removed from room ${roomId}`);
                break;
            }
        }
        
        players.delete(socket.id);
    });

    // Error handling
    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
});

// Helper functions
function generateRoomId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function calculateDamage(moveType) {
    const baseDamage = {
        'normal': 20,
        'special': 35,
        'critical': 50
    }[moveType] || 20;
    
    const randomFactor = 0.8 + Math.random() * 0.4;
    return Math.floor(baseDamage * randomFactor);
}

// Basic route for testing
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Pokemon Multiplayer Server</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; background: #1a1a1a; color: white; }
                    .status { background: #4CAF50; padding: 20px; border-radius: 10px; margin: 20px 0; }
                </style>
            </head>
            <body>
                <h1>🎮 Pokemon Multiplayer Server</h1>
                <div class="status">
                    <h2>✅ Server is Running!</h2>
                    <p>Port: ${PORT}</p>
                    <p>Active Rooms: ${rooms.size}</p>
                    <p>Active Players: ${Array.from(rooms.values()).reduce((acc, room) => acc + room.players.length, 0)}</p>
                </div>
                <p>Connect your game to: <code>http://127.0.0.1:${PORT}</code></p>
            </body>
        </html>
    `);
});

const PORT = process.env.PORT || 5500;
server.listen(PORT, () => {
    console.log(`🎯 Server running on http://127.0.0.1:${PORT}`);
    console.log(`📡 Socket.IO server ready for connections`);
});