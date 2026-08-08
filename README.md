🎵 VibeBeats
AI-Powered Mood-Based Music Recommendation & Engagement Platform
![GitHub repo size](https://img.shields.io/github/repo-size/SindhuTingirkar/Vibe-Beats) ![GitHub stars](https://img.shields.io/github/stars/SindhuTingirkar/Vibe-Beats) ![GitHub forks](https://img.shields.io/github/forks/SindhuTingirkar/Vibe-Beats) ![GitHub issues](https://img.shields.io/github/issues/SindhuTingirkar/Vibe-Beats)
VibeBeats is a full-stack intelligent music recommendation platform that combines Artificial Intelligence, Natural Language Processing, Spotify integration, Redis caching, Celery distributed task processing, MongoDB, and bulk email automation to deliver personalized music experiences based on a user's emotional state.
Instead of manually searching for songs, users can describe how they feel in natural language. VibeBeats analyzes the emotional context using an AI model and generates a personalized music experience around the detected mood.
---
✨ Why VibeBeats?
Traditional music applications primarily depend on listening history, likes, playlists, and search behavior.
VibeBeats introduces an additional dimension:
> ***"Tell us how you feel, and we'll find the music that matches your mood."***
A user can enter something like:
```text
"I've had a really stressful day and just want something calm."
```
The system analyzes the text, identifies the emotional context, maps it to a suitable music mood, and retrieves an appropriate music experience.
---
🚀 Key Features
🤖 AI-Based Emotion Detection
Accepts natural-language mood descriptions.
Uses a Hugging Face emotion classification model.
Detects emotions from user input.
Converts detected emotions into music-oriented moods.
Generates personalized recommendations.
🎧 Music Recommendation
Integrates with Spotify.
Retrieves songs and playlists based on the detected mood.
Provides users with mood-oriented music discovery.
Supports dynamic recommendations rather than fixed playlists.
⚡ Redis Caching
Redis is used to improve application performance by caching frequently requested information.
Benefits include:
Faster repeated requests
Reduced database/API calls
Better response times
Improved scalability
🔄 Celery Distributed Task Processing
VibeBeats uses Celery with Redis as a message broker for background processing.
Tasks include:
AI emotion analysis
Email processing
Asynchronous operations
Background jobs
This prevents long-running operations from blocking the main Node.js server.
📧 Bulk Email Processing
The application includes asynchronous email processing for large-scale email operations.
Instead of processing every email directly through the web server, email tasks can be placed into a queue and processed by Celery workers.
This architecture allows the application to remain responsive while background tasks are executed independently.
👤 User Management
The application supports user-oriented functionality including:
User registration
User authentication
Login
Personalized dashboard
Mood analysis
Music recommendations
🛠️ Admin Functionality
The platform includes administrative capabilities for managing and monitoring the application.
User management
Platform monitoring
Music/recommendation management
Engagement information
Administrative controls
---
💡 How It Works
Step	Process
1️⃣	User describes their current mood
2️⃣	AI analyzes the emotional context
3️⃣	Detected emotion is mapped to a music mood
4️⃣	Music is retrieved based on the mood
5️⃣	User receives personalized recommendations
```text
User Input
    ↓
AI Emotion Detection
    ↓
Emotion → Mood Mapping
    ↓
Music Recommendation
    ↓
Personalized Vibe 🎧
```
---
🏗️ System Architecture
```text
                     ┌────────────────────┐
                     │      Frontend      │
                     │    React + Vite    │
                     └─────────┬──────────┘
                               │
                               │ HTTP / REST API
                               ▼
                     ┌────────────────────┐
                     │      Backend       │
                     │ Node.js + Express  │
                     └──────┬─────┬───────┘
                            │     │
            ┌───────────────┘     └────────────────┐
            │                                      │
            ▼                                      ▼
   ┌─────────────────┐                    ┌─────────────────┐
   │    MongoDB      │                    │      Redis      │
   │ Persistent Data │                    │ Cache + Broker  │
   └─────────────────┘                    └────────┬────────┘
                                                   │
                                                   ▼
                                         ┌──────────────────┐
                                         │      Celery      │
                                         │ Background Tasks │
                                         └────────┬─────────┘
                                                  │
                                  ┌───────────────┴───────────────┐
                                  │                               │
                                  ▼                               ▼
                          ┌───────────────┐              ┌────────────────┐
                          │ Hugging Face  │              │ Email Worker   │
                          │ Emotion Model │              │ Bulk Emails    │
                          └───────────────┘              └────────────────┘

                                  │
                                  ▼
                          ┌────────────────┐
                          │    Spotify     │
                          │ Music Services │
                          └────────────────┘
```
---
🧰 Technology Stack
Layer	Technology
Frontend	React.js
Frontend Build Tool	Vite
Backend	Node.js
Backend Framework	Express.js
Database	MongoDB
ODM	Mongoose
Cache	Redis
Task Queue	Celery
Message Broker	Redis
AI / NLP	Hugging Face
Music Platform	Spotify
Email Processing	Python + Celery
Authentication	JWT / Application Authentication
API Communication	REST APIs
Version Control	Git + GitHub
---
📁 Project Structure
```text
VibeBeats
│
├── backend
│   ├── models
│   ├── routes
│   ├── server.js
│   └── seedSongs.js
│
├── frontend
│   ├── index.html
│   ├── dashboard.html
│   ├── login.html
│   ├── signup.html
│   ├── adminDashboard.html
│   ├── dashboard.js
│   └── style.css
│
├── screenshots
├── README.md
└── package.json
```
> The exact contents of individual directories may evolve as the project is extended.
---
⚙️ Prerequisites
Before running VibeBeats, install:
Node.js
npm
Python 3.x
MongoDB
Redis
Git
You will also need accounts/API credentials for services used by the application, such as:
Hugging Face
Spotify
Email provider
---
📥 Installation
Follow these steps to install and set up VibeBeats locally.
1️⃣ Clone the Repository
```bash
git clone https://github.com/SindhuTingirkar/Vibe-Beats.git
cd Vibe-Beats
```
2️⃣ Install Node.js Dependencies
From the project root:
```bash
npm install
```
3️⃣ Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```
4️⃣ Set Up Python Environment
Create a Python virtual environment for the Celery worker:
```bash
python -m venv api_worker/venv
```
Activate it on Windows:
```powershell
.\api_worker\venv\Scripts\Activate.ps1
```
Install the required Python packages:
```powershell
pip install -r api_worker/requirements.txt
```
---
▶️ Running the Application
VibeBeats uses multiple services. Run them in separate terminals and keep each service running while using the application.
1️⃣ Start MongoDB
If MongoDB is installed as a Windows service:
```powershell
net start MongoDB
```
Or start the MongoDB server according to your local installation.
2️⃣ Start Redis
```powershell
redis-server
```
Redis should be available at:
```text
localhost:6379
```
3️⃣ Start Celery Worker
From the project root:
```powershell
.\api_worker\venv\Scripts\Activate.ps1
celery -A api_worker.celery_app worker --loglevel=info --pool=solo
```
The worker should eventually display:
```text
celery@... ready.
```
4️⃣ Start Node.js Backend
Open another terminal:
```powershell
node backend/server.js
```
The backend runs on:
```text
http://localhost:5000
```
5️⃣ Start React Frontend
Open another terminal:
```powershell
cd frontend
npm run dev
```
Vite will provide a local URL similar to:
```text
http://localhost:5173
```
Open that URL in your browser.
---
🔌 Application Services
Service	Purpose	Default Address
React + Vite	User interface	`localhost:5173`
Node.js + Express	REST API	`localhost:5000`
MongoDB	Persistent database	`localhost:27017`
Redis	Cache + message broker	`localhost:6379`
Celery	Background processing	Worker process
---
🎯 Emotion Analysis
The emotion analysis pipeline works conceptually as:
```text
Text Input
↓
Preprocessing
↓
Hugging Face Emotion Model
↓
Emotion Prediction
↓
Mood Mapping
↓
Music Recommendation
```
For example:
```text
"I feel extremely happy today!"
↓
Emotion
↓
Joy
↓
Happy
↓
Music Recommendation
```
The exact emotion-to-mood mapping depends on the application's configured logic.
---
⚡ Why Redis + Celery?
Without Background Processing
```text
User Request
↓
Node.js
↓
AI Processing
↓
Email Processing
↓
Response
```
The user may have to wait for expensive operations to finish.
With Redis + Celery
```text
User Request
↓
Node.js
↓
Queue Task
↓
Immediate Response / Continued Processing
│
▼
Redis
│
▼
Celery Worker
│
├── AI Processing
└── Email Processing
```
This makes the architecture more suitable for applications that need to handle increasing workloads.
---
📧 Bulk Email Architecture
Bulk email operations are handled asynchronously.
```text
Admin / Application
│
▼
Email Request
│
▼
Redis
│
▼
Celery Email Worker
│
▼
Email Provider
│
▼
Recipient
```
This prevents bulk email operations from blocking normal API requests.
---
🗄️ Database
MongoDB is used for persistent application data.
Typical data categories may include:
Users
Authentication information
Music-related data
Playlists
Application activity
Recommendation-related information
Mongoose provides structured interaction between Node.js and MongoDB.
---
🧪 Testing the Application
After starting all services, verify:
Frontend loads at `http://localhost:5173`
Backend runs at `http://localhost:5000`
Redis accepts connections
Celery worker displays `ready`
Backend displays `MongoDB Connected`
---
🔮 Future Enhancements
The platform can be extended with:
🤖 Advanced AI
Multimodal emotion detection
Voice-based mood detection
Facial-expression analysis
Personalized recommendation models
User preference learning
Reinforcement-learning-based recommendations
🎵 Recommendation Engine
Listening-history-based recommendations
Collaborative filtering
Content-based filtering
Hybrid recommendation system
Personalized playlists
Daily mood playlists
📊 Analytics Dashboard
User engagement
Most detected emotions
Most popular moods
Recommendation success rate
Playlist engagement
User retention
System performance
☁️ Production Deployment
Potential deployment architecture:
```text
                    ┌───────────────┐
                    │    Users      │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │   Frontend    │
                    │   Deployment  │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  Node Backend │
                    └───────┬───────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
          MongoDB         Redis       External APIs
              │             │
              │             ▼
              │          Celery
              │             │
              │      ┌──────┴──────┐
              │      ▼             ▼
              │   AI Worker    Email Worker
              │
              └──────────┬──────────┘
                         ▼
                       Data
```
Possible production improvements include:
Docker containerization
CI/CD
Cloud deployment
Load balancing
Monitoring
Centralized logging
Redis Cluster
Horizontal worker scaling
Rate limiting
API security
Automated testing
---
📌 Development Workflow
The project follows a Git-based development workflow:
```bash
git status
git add .
git commit -m "Describe your changes"
git push
```
Before committing, always verify that sensitive files are excluded:
```bash
git status
```
---
📸 Screenshots
🏠 Home Page
![VibeBeats Home](screenshots/home.png)
🔐 Login
![VibeBeats Login](screenshots/login.png)
📝 User Sign Up
![VibeBeats Sign Up](screenshots/signup.png)
🧠 Mood Analysis
![VibeBeats Mood Analysis](screenshots/mood_analysis.png)
🛡️ Admin Login
![VibeBeats Admin Login](screenshots/admin-login.png)
🛠️ Admin Dashboard
![VibeBeats Admin Dashboard](screenshots/admin_dashboard.png)
📧 Bulk Email
![VibeBeats Bulk Email](screenshots/bulk_email.png)
---
👩‍💻 Author
Sindhu Tingirkar
GitHub: @SindhuTingirkar
---
📄 License
This project is currently intended for educational, research, and portfolio purposes.
---
💡 Project Vision
> ***VibeBeats transforms emotions into music by combining AI-powered emotion understanding with intelligent music discovery and scalable backend architecture.***
Feel it. Analyze it. Vibe with it.