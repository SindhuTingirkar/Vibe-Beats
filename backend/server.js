import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import emotionRoutes from "./routes/emotionRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { celeryClient } from "./celery.js";

const app = express();

// CORS FIX
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/emotion", emotionRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/playlists", songRoutes);
app.use("/api/admin", adminRoutes);


/* =====================================
   NEW ROUTE → FETCH CELERY RESULT
===================================== */
app.get("/celery/result/:taskId", async (req, res) => {
    const taskId = req.params.taskId;

    try {
        const result = await celeryClient.getResult(taskId);

        if (!result) {
            return res.json({ status: "PENDING" });
        }

        return res.json({
            status: "SUCCESS",
            emotion: result,
        });

    } catch (err) {
        console.error("❌ RESULT FETCH ERROR:", err);
        res.status(500).json({ error: err.message });
    }
});


app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
