import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  playlistUrl: { type: String, required: true }
});

export default mongoose.model("Song", SongSchema);
