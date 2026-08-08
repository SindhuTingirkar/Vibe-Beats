import pkg from "uuid";
const { v4: uuidv4 } = pkg;

import { spawn } from "child_process";
import redisClient from "./redis.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ALWAYS use venv python — this makes it work on any laptop
const pythonPath = path.join(
  __dirname,
  "..",
  "api_worker",
  "venv",
  "Scripts",
  "python.exe"
);

/* ============================================================
   1) SEND EMOTION TASK → run Celery from Python venv
============================================================ */
export async function sendTask(text) {
  console.log("📤 Sending text to Celery:", text);

  const py = spawn(
    pythonPath,
    [
      "-c",
      `
from api_worker.tasks.emotion_task import analyze_emotion
task = analyze_emotion.delay("${text}")
print(task.id)
      `,
    ],
    { cwd: path.join(__dirname, "..") }
  );

  return new Promise((resolve, reject) => {
    py.stdout.on("data", (data) => {
      console.log("📥 Celery Task ID:", data.toString());
      resolve(data.toString().trim());
    });

    py.stderr.on("data", (data) => {
      console.error("❌ CELERY ERROR:", data.toString());
      reject(data.toString());
    });
  });
}

/* ============================================================
   2) CHECK TASK RESULT (Node → Celery → Node)
============================================================ */
export const celeryClient = {
  async getResult(taskId) {
    const py = spawn(
      pythonPath,
      [
        "-c",
        `
from celery.result import AsyncResult
from api_worker.celery_app import app

res = AsyncResult("${taskId}", app=app)
print(res.result)
      `,
      ],
      { cwd: path.join(__dirname, "..") }
    );

    return new Promise((resolve, reject) => {
      py.stdout.on("data", (data) => resolve(data.toString().trim()));
      py.stderr.on("data", (data) => reject(data.toString()));
    });
  },
};

/* ============================================================
   3) BULK EMAIL
============================================================ */
export async function sendEmailBulk(email, subject, message) {
  const jobId = uuidv4();

  await redisClient.rPush(
    "email_queue",
    JSON.stringify({ id: jobId, email, subject, message })
  );

  console.log("📧 Email queued →", email);
  return jobId;
}
