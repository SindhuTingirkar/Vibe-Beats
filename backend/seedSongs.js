import mongoose from "mongoose";
import Song from "./models/Song.js";
import dotenv from "dotenv";

// Load .env correctly (seedSongs.js is already inside backend/)
dotenv.config({ path: "./.env" });

// Correct variable name
const MONGO_URI = process.env.MONGO_URI;
console.log("Loaded MONGO_URI =", MONGO_URI);

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.log("❌ Mongo error:", err));

const playlists = [
  { mood: "joy", playlistUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC" },
  { mood: "sadness", playlistUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdpQPPZq3F7n" },
  { mood: "love", playlistUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX5q67ZpWyRrZ" },
  { mood: "calm", playlistUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO" },
  { mood: "anger", playlistUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX76Wlfdnj7AP" },
  { mood: "focus", playlistUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX8Uebhn9wzrS" },
  { mood: "excitement", playlistUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DXaXB8fQg7xif" },
  { mood: "fear", playlistUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX3Ogo9pFvBkY" },
  { mood: "confidence", playlistUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4fpCWaHOned" }
];

(async () => {
  await Song.deleteMany({});
  await Song.insertMany(playlists);
  console.log("🎉 Spotify playlists inserted!");
  process.exit();
})();
