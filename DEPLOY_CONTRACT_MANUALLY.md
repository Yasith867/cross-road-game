# Manual Contract Deployment Guide

Due to Hardhat Node.js version incompatibility, here's how to deploy the contract manually using Remix IDE or other tools.

## Option 1: Deploy using Remix IDE (Recommended)

### Step 1: Access Remix
Go to https://remix.ethereum.org

### Step 2: Create the Contract
1. Create a new file `Scoreboard.sol`
2. Copy the following contract code:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Scoreboard {
    mapping(address => uint256) public highScores;
    event ScoreSubmitted(address indexed player, uint256 score);

    function submitScore(address player, uint256 score) external {
        if (score > highScores[player]) {
            highScores[player] = score;
            emit ScoreSubmitted(player, score);
        }
    }
}
```

### Step 3: Compile
1. Go to the "Solidity Compiler" tab
2. Select compiler version `0.8.20`
3. Click "Compile Scoreboard.sol"

### Step 4: Deploy to Monad Testnet
1. Go to "Deploy & Run Transactions" tab
2. Change environment to "Injected Provider - MetaMask"
3. In MetaMask, add Monad testnet:
   - Network Name: Monad Testnet
   - RPC URL: `https://api.pimlico.io/v2/10143/rpc?apikey=pim_7s3DQ8rudZmSN52Lv1CYEh`
   - Chain ID: `10143`
   - Currency Symbol: MON
4. Get testnet MON tokens (if available from faucet)
5. Click "Deploy"
6. Confirm the transaction in MetaMask

### Step 5: Copy Contract Address
After deployment, copy the contract address and add it to your Replit Secrets as `SCOREBOARD_CONTRACT_ADDRESS`

## Option 2: Use Foundry (Advanced)

If you have Foundry installed locally:

```bash
forge create contracts/Scoreboard.sol:Scoreboard \
  --rpc-url https://api.pimlico.io/v2/10143/rpc?apikey=pim_7s3DQ8rudZmSN52Lv1CYEh \
  --private-key $DEPLOYER_PRIVATE_KEY
```

## Option 3: Fix Hardhat Environment

If you have access to upgrade Node.js to version 22:

1. Upgrade Node.js to v22.10.0 or later
2. Run: `npm install`
3. Run: `npx hardhat run --network monad scripts/deploy.js --config hardhat.config.cjs`

## After Deployment

Once you have the contract address:

1. Go to your Replit project
2. Click on "Secrets" (lock icon in left sidebar)
3. Update `SCOREBOARD_CONTRACT_ADDRESS` with your deployed contract address
4. Restart the server: `node server.js`

The game will now submit scores to your deployed contract!
