import { smartAccountPromise, bundlerClient, paymasterClient } from "./config.js";
import { encodeFunctionData } from "viem";

// Replace with actual deployed contract address after deployment
const SCORE_CONTRACT = process.env.SCOREBOARD_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";

export async function submitScore(score) {
  if (!SCORE_CONTRACT || SCORE_CONTRACT === "0x0000000000000000000000000000000000000000") {
    throw new Error("SCOREBOARD_CONTRACT_ADDRESS not configured. Please deploy the contract first.");
  }

  const smartAccount = await smartAccountPromise;

  // Encode call to submitScore(address player, uint256 score)
  const data = encodeFunctionData({
    abi: [
      {
        name: "submitScore",
        type: "function",
        inputs: [
          { name: "player", type: "address" },
          { name: "score", type: "uint256" },
        ],
      },
    ],
    args: [smartAccount.address, BigInt(score)],
  });

  const maxFeePerGas = 1000000000n; // 1 gwei
  const maxPriorityFeePerGas = 1000000000n; // 1 gwei

  try {
    const userOperationHash = await bundlerClient.sendUserOperation({
      account: smartAccount,
      calls: [{ to: SCORE_CONTRACT, data }],
      maxFeePerGas,
      maxPriorityFeePerGas,
      paymaster: paymasterClient,
    });

    console.log("UserOperation sent:", userOperationHash);
    return userOperationHash;
  } catch (error) {
    console.error("Error submitting score:", error);
    throw error;
  }
}
