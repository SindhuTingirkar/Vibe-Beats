import express from "express";
import { sendTask } from "../celery.js";
import Redis from "ioredis";
import Song from "../models/Song.js";

const router = express.Router();
const redis = new Redis(); // auto connects to Redis localhost

// Mood normalizer
function normalize(mood) {
  const map = {
    happy: "joy",
    joyful: "joy",
    happiness: "joy",
    sad: "sadness",
    anger: "anger",
    angry: "anger",
    fear: "fear",
    scared: "fear",
    love: "love",
    excited: "excitement",
    surprise: "excitement",
    calm: "calm",
    neutral: "calm",
    joy: "joy"
  };
  return map[mood.toLowerCase()] || mood.toLowerCase();
}

router.post("/", async (req, res) => {
  const { text } = req.body;

  // 1️⃣ SEND TASK TO CELERY
  const taskId = await sendTask(text);
  console.log("📤 TASK SENT TO CELERY:", taskId);

  // Celery stores results like this:
  const redisKey = `celery-task-meta-${taskId}`;

  // 2️⃣ WAIT FOR CELERY RESULT (MAX 20 seconds)
  let result = null;

  for (let i = 0; i < 40; i++) { // 40 * 500ms = 20 seconds
    result = await redis.get(redisKey);
    if (result) break;
    await new Promise((r) => setTimeout(r, 500));
  }

  if (!result) {
    return res.status(500).json({ error: "AI Timeout" });
  }

  const parsed = JSON.parse(result);
  const predictedEmotion = parsed.result;

  const finalMood = normalize(predictedEmotion);

  // 3️⃣ GET PLAYLIST FROM MONGO
  const playlist = await Song.findOne({ mood: finalMood });

  // 4️⃣ SEND RESPONSE
  res.json({
    mood: finalMood,
    playlist: playlist,
  });
});

export default router;
