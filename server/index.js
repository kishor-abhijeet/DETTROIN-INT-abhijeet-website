import "dotenv/config";
import express from "express";
import cors from "cors";
import { getRelevantSchoolContext } from "./services/ragService.js";
import { askGemini } from "./services/geminiService.js";

const app = express();
const port = process.env.PORT || 8787;
const requests = new Map();
app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
app.use(express.json({ limit: "10kb" }));
app.post("/api/assistant", async (req, res) => {
  const question = String(req.body?.question || "").trim();
  if (!question || question.length > 500)
    return res
      .status(400)
      .json({ error: "Please enter a concise school-related question." });
  const client = req.ip;
  const now = Date.now();
  const history = (requests.get(client) || []).filter(
    (time) => now - time < 60000,
  );
  if (history.length >= 20)
    return res
      .status(429)
      .json({ error: "Please wait a moment before asking another question." });
  history.push(now);
  requests.set(client, history);
  try {
    const context = await getRelevantSchoolContext(question);
    if (!context.length)
      return res.json({
        answer: "I couldn't find this information in our school database.",
        sources: [],
      });
    let answer;
    try {
      answer = await askGemini(question, context);
    } catch (error) {
      console.error(error.message);
    }
    res.json({
      answer: answer || context.map((item) => item.content).join("\n\n"),
      sources: context.map((item) => item.title),
    });
  } catch {
    res
      .status(500)
      .json({
        error:
          "The school assistant is temporarily unavailable. Please try again.",
      });
  }
});
app.listen(port, () =>
  console.log(`School assistant API running on http://localhost:${port}`),
);
