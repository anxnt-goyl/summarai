# SummarAI

An AI-powered multilingual text summarization platform. This repository contains the end-to-end boilerplate for a premium SaaS application.

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Backend**: FastAPI (Python)
- **Database**: MongoDB

## Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set your environment variables (optional, defaults are provided for local dev):
   - `MONGODB_URL`: Default is `mongodb://localhost:27017`
   - `SECRET_KEY`: Default is a dev key
5. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```

## Design Architecture
- **Glassmorphism**: Achieved using `backdrop-blur-md` and semi-transparent backgrounds (`bg-surface/60`).
- **Neon Accents**: Used gradients and text shadows for primary CTA buttons and critical stats.
- **Deep Dark Theme**: Custom Tailwind configuration (`bg-gray-950`).
