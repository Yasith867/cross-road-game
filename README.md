# Crossy Road - Blockchain Edition

A 3D Crossy Road game clone with blockchain integration, featuring gasless score submission to Monad testnet using MetaMask Smart Accounts.

## Features

- 🎮 Complete 3D Crossy Road gameplay using Three.js
- 🔗 MetaMask Smart Account integration
- ⛽ Gasless transactions via Pimlico bundler/paymaster
- 📊 On-chain score storage on Monad testnet
- 🎨 Retro pixel art styling with modern blockchain UI

## Prerequisites

- Node.js v18 or later
- A private key for deploying the smart contract
- Access to Monad testnet via Pimlico RPC

## Setup Instructions

### 1. Install Dependencies

All dependencies are already installed.

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` and add your private keys:

```
DEPLOYER_PRIVATE_KEY=0xYOUR_PRIVATE_KEY_FOR_DEPLOY
NEXT_PUBLIC_WALLET_PRIVATE_KEY=0x9700cf7d62c1b0ba4242c93a40007bed796aa6aa997d549563c7d4bc7be0635c
SCOREBOARD_CONTRACT_ADDRESS=
```

**Important**: Never commit your `.env` file to version control!

### 3. Deploy the Smart Contract

Deploy the Scoreboard contract to Monad testnet:

```bash
npx hardhat run --network monad scripts/deploy.js --config hardhat.config.cjs
```

After deployment, copy the contract address from the console output and add it to your `.env` file:

```
SCOREBOARD_CONTRACT_ADDRESS=0xYOUR_DEPLOYED_CONTRACT_ADDRESS
```

### 4. Run the Game Server

Start the Express server that serves the game and handles blockchain interactions:

```bash
node server.js
```

The game will be available at `http://localhost:3000`

## How to Play

1. **Open the game** in your browser at `http://localhost:3000`
2. **Connect your wallet** (optional) - Click "Connect Wallet" to link your MetaMask
3. **Use controls**:
   - Arrow keys OR on-screen buttons
   - Forward: Move chicken forward (increases score)
   - Backward: Move chicken backward
   - Left/Right: Move chicken sideways
4. **Avoid obstacles**:
   - Dodge cars and trucks
   - Navigate around trees
5. **Game Over**: When you hit a vehicle, your score is automatically submitted to the blockchain!

## Architecture

### Frontend (`public/`)
- `index.html` - Game interface with wallet connection UI
- `style.css` - Retro pixel art styling with glassmorphism effects
- `script.js` - Complete game logic + Three.js rendering + blockchain integration

### Backend (`server.js`)
- Express server serving static files
- `/api/submit-score` endpoint for blockchain submission
- CORS enabled for development

### Web3 (`web3/`)
- `config.js` - Viem client, Pimlico bundler/paymaster, Smart Account setup
- `submitScore.js` - User operation creation and submission

### Smart Contract (`contracts/`)
- `Scoreboard.sol` - Simple high score tracking contract

## Smart Contract

The Scoreboard contract stores high scores for each player:

```solidity
function submitScore(address player, uint256 score) external
```

Only updates the score if it's higher than the current high score.

## Technology Stack

- **Frontend**: Vanilla JavaScript, Three.js r99
- **Backend**: Express.js, Node.js
- **Blockchain**: viem, @metamask/delegation-toolkit
- **Smart Contracts**: Solidity 0.8.20, Hardhat
- **Network**: Monad Testnet (via Pimlico)

## Troubleshooting

### Contract deployment fails
- Check that `DEPLOYER_PRIVATE_KEY` is set in `.env`
- Ensure you have testnet MON tokens for gas

### Score submission fails
- Verify `SCOREBOARD_CONTRACT_ADDRESS` is set in `.env`
- Check that `NEXT_PUBLIC_WALLET_PRIVATE_KEY` is configured
- Review server logs for detailed error messages

### Game doesn't load
- Make sure server is running on port 3000
- Check browser console for JavaScript errors
- Verify Three.js CDN is accessible

## Development

To modify the game:
- Edit `public/script.js` for game logic
- Edit `public/style.css` for styling
- Edit `web3/submitScore.js` for blockchain interaction

## License

MIT

## Credits

Original Crossy Road game concept by Hipster Whale
Blockchain integration and implementation by the development team
