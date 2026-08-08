from celery import shared_task
import requests
import json

HF_URL = "https://router.huggingface.co/hf-inference/models/j-hartmann/emotion-english-distilroberta-base"
import os

HF_API_KEY = os.getenv("HF_API_KEY")


@shared_task(name="emotion.analyze")
def analyze_emotion(text):
    print("\n===== EMOTION TASK STARTED =====")
    print("Received text:", text)

    try:
        print("Sending request to HuggingFace...")
        response = requests.post(
            HF_URL,
            headers={"Authorization": f"Bearer {HF_KEY}"},
            json={"inputs": text},
            timeout=20
        )

        print("HF RAW RESPONSE:", response.text)

        data = response.json()
        best = max(data[0], key=lambda x: x["score"])

        print("Predicted Emotion:", best["label"])
        print("===== TASK FINISHED =====\n")

        return best["label"]

    except Exception as e:
        print("ERROR in emotion task:", str(e))
        return "neutral"
