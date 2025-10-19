import "dotenv/config";
import { http, createPublicClient, defineChain } from "viem";
import { createBundlerClient, createPaymasterClient } from "viem/account-abstraction";
import { privateKeyToAccount } from "viem/accounts";
import { Implementation, toMetaMaskSmartAccount } from "@metamask/delegation-toolkit";

const RPC = "https://api.pimlico.io/v2/10143/rpc?apikey=pim_7s3DQ8rudZmSN52Lv1CYEh";

// Define Monad testnet chain
export const monad = defineChain({
  id: 10143,
  name: "Monad Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Monad",
    symbol: "MON",
  },
  rpcUrls: {
    default: {
      http: [RPC],
    },
    public: {
      http: [RPC],
    },
  },
  blockExplorers: {
    default: { name: "Monad Explorer", url: "https://explorer.monad.xyz" },
  },
  testnet: true,
});

export const publicClient = createPublicClient({
  chain: monad,
  transport: http(RPC),
});

// Create account from private key (server-side signer for Hybrid account)
const serverPrivateKey = process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY;
if (!serverPrivateKey) {
  throw new Error("NEXT_PUBLIC_WALLET_PRIVATE_KEY environment variable is not set");
}

const account = privateKeyToAccount(serverPrivateKey);

// Create smart account (Hybrid) - async initialization
export const smartAccountPromise = (async () => {
  try {
    const smartAccount = await toMetaMaskSmartAccount({
      client: publicClient,
      implementation: Implementation.Hybrid,
      deployParams: [account.address, [], [], []],
      deploySalt: "0x",
      signer: { account },
    });
    console.log("Smart Account initialized:", smartAccount.address);
    return smartAccount;
  } catch (error) {
    console.error("Error initializing smart account:", error);
    throw error;
  }
})();

export const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http(RPC),
});

export const paymasterClient = createPaymasterClient({
  transport: http(RPC),
});
