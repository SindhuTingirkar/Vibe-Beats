import redisClient from "./redisClient.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

console.log("📨 Email Worker Started...");
console.log("📥 Listening for email jobs...");

// Gmail Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function processQueue() {
    try {
        const job = await redisClient.rPop("emailQueue");

        if (!job) {
            setTimeout(processQueue, 1000);
            return;
        }

        const { emails, message } = JSON.parse(job);

        console.log("📩 Sending email to →", emails);

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: emails,   // SEND TO ALL USERS
            subject: "Bulk Email from Admin",
            text: message
        });

        console.log("✅ Emails sent successfully!");
    } 
    catch (err) {
        console.error("❌ Email worker error:", err);
    }

    setTimeout(processQueue, 1000);
}

processQueue();
