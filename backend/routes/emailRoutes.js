import express from "express";
import redisClient from "../redis.js";
import User from "../models/User.js";

const router = express.Router();

// =========================
// Send Bulk Email
// =========================
router.post("/send-bulk-email", async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.json({ msg: "Subject and message are required" });
    }

    // Get all user emails automatically from DB
    const users = await User.find({});
    const emails = users.map((u) => u.email);

    console.log("📧 Found emails:", emails);

    // Push each email job into queue
    emails.forEach((email) => {
      redisClient.rPush(
        "email_queue",
        JSON.stringify({
          email,
          subject,
          message,
        })
      );
    });

    res.json({ msg: "Bulk emails queued successfully!" });

  } catch (err) {
    console.error("Bulk Email Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
