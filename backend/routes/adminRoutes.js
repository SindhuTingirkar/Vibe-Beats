import express from "express";
import User from "../models/User.js";
import redisClient from "../redisClient.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    const { adminId, password } = req.body;

    // Replace this with your own admin credentials
    if (adminId === process.env.ADMIN_ID && password === process.env.ADMIN_PASSWORD) {
        return res.json({
            success: true,
            token: "admin-token-123"
        });
    }

    return res.json({
        success: false,
        msg: "Invalid credentials"
    });
});


router.post("/send-bulk-email", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || message.trim() === "") {
            return res.status(400).json({ msg: "Message is required" });
        }

        // 1️⃣ Get all user emails from MongoDB
        const users = await User.find({}, "email");
        const emails = users.map(u => u.email);

        if (emails.length === 0) {
            return res.status(400).json({ msg: "No users found in database" });
        }

        console.log("📥 Bulk email request → sending to:", emails);

        // 2️⃣ Push the email job to Redis queue
        await redisClient.lPush("emailQueue", JSON.stringify({
            emails,
            message
        }));

        return res.json({ msg: "Bulk email queued successfully!" });

    } catch (err) {
        console.error("SEND BULK EMAIL ERROR:", err);
        res.status(500).json({ msg: "Server error" });
    }
});

export default router;
