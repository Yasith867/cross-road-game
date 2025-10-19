# Crossy Road Blockchain Game

## Overview
A 3D Crossy Road game clone with blockchain integration for submitting high scores to Monad testnet. Built with Three.js for the game engine and Express.js for the backend.

## Current State
- ✅ Server running successfully on port 5000
- ✅ Three.js game engine loading correctly  
- ✅ Game is fully playable without blockchain features
- ⚠️ Blockchain features disabled (requires configuration)

## Recent Changes (Migration)
- Installed all npm dependencies
- Fixed web3 config to handle missing environment variables gracefully
- Disabled automatic blockchain score submission (optional feature)
- Cleaned up React/main.tsx conflicts with vanilla JS game

## Blockchain Configuration (Optional)
To enable blockchain score submission:
1. Set environment variables in Replit Secrets:
   - `NEXT_PUBLIC_WALLET_PRIVATE_KEY` - Server-side wallet for smart account
   - `SCOREBOARD_CONTRACT_ADDRESS` - Deployed contract address on Monad testnet
   - `DEPLOYER_PRIVATE_KEY` - For deploying the contract

2. Deploy the Scoreboard smart contract:
   - See `DEPLOY_CONTRACT_MANUALLY.md` for instructions
   - Contract is in `contracts/Scoreboard.sol`

3. Uncomment the blockchain submission in `client/src/script.js` (line 704):
   ```javascript
   // submitScoreToBackend(currentLane);
   ```

## Project Structure
- `client/` - Frontend game (vanilla JS + THREE.js)
- `server/` - Express backend with API endpoints
- `web3/` - Blockchain integration (viem + MetaMask Smart Accounts)
- `contracts/` - Solidity smart contracts

## Notes
- The game works without blockchain configuration
- WebGL warnings in console are normal and can be ignored
- Blockchain submission is currently disabled by default for development
