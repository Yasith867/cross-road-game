# Deployment Guide

Complete step-by-step guide to deploy the Crossy Road Blockchain game.

## Step 1: Environment Setup

### Create `.env` file

```bash
cp .env.example .env
```

### Add your private keys

Edit `.env` and replace with your actual keys:

```
DEPLOYER_PRIVATE_KEY=0xYOUR_ACTUAL_DEPLOYER_KEY
NEXT_PUBLIC_WALLET_PRIVATE_KEY=0xYOUR_ACTUAL_WALLET_KEY
SCOREBOARD_CONTRACT_ADDRESS=
```

⚠️ **Security Note**: These private keys should be for **testnet only**. Never use mainnet keys!

## Step 2: Deploy Smart Contract

Run the deployment script:

```bash
npx hardhat run --network monad scripts/deploy.js --config hardhat.config.cjs
```

Expected output:
```
Scoreboard deployed to: 0x1234567890abcdef...
```

Copy the deployed contract address.

## Step 3: Update Configuration

Add the contract address to `.env`:

```
SCOREBOARD_CONTRACT_ADDRESS=0x1234567890abcdef...
```

## Step 4: Start the Server

```bash
node server.js
```

Expected output:
```
🎮 Crossy Road Blockchain Server running at http://localhost:3000
🔗 API endpoint: http://localhost:3000/api/submit-score
⚙️  Environment: development
Smart Account initialized: 0xabcdef...
```

## Step 5: Test the Game

1. Open browser to `http://localhost:3000`
2. Play the game using arrow keys
3. Get hit by a vehicle to trigger game over
4. Watch the blockchain submission in the console

## Verification

### Check Smart Account

The server logs should show:
```
Smart Account initialized: 0x...
```

### Test Score Submission

Play the game and check server logs for:
```
Submitting score: 5
UserOperation sent: 0x...
```

### Verify on Explorer

Check the transaction on Monad explorer:
```
https://explorer.monad.xyz/tx/0xYOUR_TX_HASH
```

## Production Deployment

For production deployment:

1. **Use a production server** (not localhost)
2. **Set environment variables** securely (don't use .env file)
3. **Enable HTTPS** for secure wallet connections
4. **Configure CORS** appropriately
5. **Use production RPC** endpoints
6. **Monitor gas usage** and adjust fees

### Environment Variables for Production

```bash
export DEPLOYER_PRIVATE_KEY=...
export NEXT_PUBLIC_WALLET_PRIVATE_KEY=...
export SCOREBOARD_CONTRACT_ADDRESS=...
export PORT=3000
export NODE_ENV=production
```

### Run in Production

```bash
NODE_ENV=production node server.js
```

## Troubleshooting

### "Smart Account initialization failed"
- Check that `NEXT_PUBLIC_WALLET_PRIVATE_KEY` is valid
- Verify RPC endpoint is accessible
- Review delegation-toolkit compatibility

### "Contract address not configured"
- Ensure `SCOREBOARD_CONTRACT_ADDRESS` is set in `.env`
- Verify the contract was deployed successfully

### "Transaction failed"
- Check gas settings in `web3/submitScore.js`
- Verify Pimlico paymaster is working
- Review bundler client configuration

## Next Steps

After successful deployment:

1. **Test thoroughly** with different scores
2. **Monitor transaction costs** on the bundler
3. **Add error handling** for edge cases
4. **Implement leaderboard** display
5. **Add user profiles** linked to wallet addresses

## Support

For issues:
- Check server logs for detailed errors
- Review browser console for frontend errors
- Verify all environment variables are set
- Test with a fresh private key if issues persist
