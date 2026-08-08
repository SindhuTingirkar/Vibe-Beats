
import express from "express";
import Song from "../models/Song.js";
import redisClient from "../redis.js";
console.log("✅ songRoutes loaded");

const router = express.Router();

// ✅ GET ALL PLAYLISTS FOR ADMIN with Redis caching
router.get("/", async (req, res) => {
  try {
    const cacheKey = 'playlists:all';

    // Check cache first
    const cachedPlaylists = await redisClient.get(cacheKey);
    if (cachedPlaylists) {
      console.log('Playlists served from cache');
      return res.json(JSON.parse(cachedPlaylists));
    }

    const playlists = await Song.find();

    // Cache for 30 minutes
    await redisClient.setEx(cacheKey, 1800, JSON.stringify(playlists));

    res.json(playlists);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
});

export default router;


