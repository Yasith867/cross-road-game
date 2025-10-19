import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import cors from "cors";
// @ts-ignore - JavaScript module without types
import { submitScore } from "../web3/submitScore.js";

export async function registerRoutes(app: Express): Promise<Server> {
  // Enable CORS for blockchain requests
  app.use(cors());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Crossy Road Blockchain Server" });
  });

  // Submit score endpoint - blockchain integration
  app.post("/api/submit-score", async (req, res) => {
    try {
      const { score, walletAddress } = req.body;
      
      if (typeof score !== "number" || score < 0) {
        return res.status(400).json({ error: "score must be a positive number" });
      }

      console.log(`Submitting score: ${score} for wallet: ${walletAddress || 'server'}`);
      const txHash = await submitScore(score, walletAddress);
      
      res.json({ 
        success: true, 
        userOperationHash: txHash,
        score: score,
        player: walletAddress || 'server'
      });
    } catch (err: any) {
      console.error("Error in submit-score:", err);
      // Always return JSON, never HTML error pages
      res.status(500).json({ 
        error: err.message || String(err),
        success: false
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
