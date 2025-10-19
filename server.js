import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { submitScore } from "./web3/submitScore.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Crossy Road Blockchain Server" });
});

// Submit score endpoint
app.post("/api/submit-score", async (req, res) => {
  try {
    const { score } = req.body;
    
    if (typeof score !== "number" || score < 0) {
      return res.status(400).json({ error: "score must be a positive number" });
    }

    console.log(`Submitting score: ${score}`);
    const txHash = await submitScore(score);
    
    res.json({ 
      success: true, 
      userOperationHash: txHash,
      score: score
    });
  } catch (err) {
    console.error("Error in submit-score:", err);
    res.status(500).json({ 
      error: err.message || String(err),
      success: false
    });
  }
});

// Serve index.html for all other routes (SPA fallback)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = 5000;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`🎮 Crossy Road Blockchain Server running at http://0.0.0.0:${PORT}`);
  console.log(`🔗 API endpoint: http://0.0.0.0:${PORT}/api/submit-score`);
  console.log(`⚙️  Environment: ${process.env.NODE_ENV || "development"}`);
});

export default server;
