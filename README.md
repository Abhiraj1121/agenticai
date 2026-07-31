<div align="center">

```
███████╗██╗  ██╗ █████╗
██╔════╝██║ ██╔╝██╔══██╗
█████╗  █████╔╝ ███████║
██╔══╝  ██╔═██╗ ██╔══██║
███████╗██║  ██╗██║  ██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
```

### ✦ Intelligent AI Chat Assistant & Agentic Tool Orchestrator ✦

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-6c63ff?style=for-the-badge)](https://abhiraj1121.github.io/eka/)
[![GitHub](https://img.shields.io/badge/GitHub-eka-181717?style=for-the-badge&logo=github)](https://github.com/Abhiraj1121/eka)
[![License](https://img.shields.io/badge/Legal_Docs-Read_Here-ff6b6b?style=for-the-badge)](https://abhiraj1121.github.io/ai-tc/)
[![Render](https://img.shields.io/badge/Deployed_on-Render-46E3B7?style=for-the-badge&logo=render)](https://render.com)

*Conversational AI with voice, markdown, web search, and a full agentic tool orchestrator — beautifully packaged.*

</div>

---

## ⚡ What is Eka?

**Eka** is a modern, full-stack **Agentic AI Orchestrator** built for real conversations *and* real work. It combines a Flask backend with a sleek, animated frontend to deliver fast, intelligent responses — with voice I/O, web search, rich Markdown, and a router model that can generate avatars, code, diagrams, and documents on demand, either via slash commands or plain natural language.

Whether you're building a personal assistant, a knowledge bot, a dev tool, or exploring agentic AI interfaces, Eka gives you a solid, extensible foundation.

---

## 🚀 Features

### 🧠 AI Core
- Cloud-based text generation via any OpenAI / OpenRouter-compatible API
- Smart fallback logic for resilient, reliable responses
- Clean and concise replies by default

### 🌐 Web Search
- Toggle-based Wikipedia lookup (off by default)
- Auto-fallback to AI when no wiki result is found
- Fast, safe, non-intrusive

### 📝 Markdown Rendering
- Full support for headings, bullets, bold/italic, code blocks
- Clean reading experience for long-form answers

### 🎤 Voice Interaction
- 🎙️ Voice input via Web Speech API
- 🔊 Voice output via SpeechSynthesis API
- Auto language detection (English / Hindi)

### 💬 Chat UX
- Smooth typing animation & auto-scroll
- Chat bubbles with timestamps
- Quick-reply action buttons
- Fully responsive (desktop + mobile)

### 🎨 UI Controls
- Dark / Light theme toggle
- Mute / Unmute voice output
- Web search toggle with glow animation
- Clear chat history (with optional voice confirmation)

### 🤖 Agentic Tool Orchestrator
- Primary router model (`nvidia/nemotron-3-super-120b-a12b:free`) uses **function calling** to auto-detect intent — no slash command needed
- Say *"draw me a diagram of a login flow"* or *"write me a Python function to reverse a linked list"* and Eka routes it to the right tool automatically
- Slash commands remain available as explicit shortcuts (`/avatar`, `/code`, `/diagram`, `/doc`)
- Auto-routing fails safe: any router error silently falls back to a normal AI reply — never blocks the conversation

### 🖼️ AI Avatar Generator
- Free DiceBear SVG avatars — no API key required
- 10 styles (bottts, avataaars, pixel-art, lorelei, etc.)
- `/avatar <name> [style]` or just ask for one in plain English
- Inline SVG rendering + one-click download

### 💻 AI Code Writer & Verification
- Code generation via a dedicated code model (`poolside/laguna-xs-2.1:free`)
- **Static-only verification** — real Python syntax checks via `ast.parse`, structural checks for other languages. Generated code is **never executed** server-side
- `/code <language> <task>` — syntax-highlighted output, copy button, and file download

### 📊 AI Diagram Generator
- Natural-language → Mermaid.js diagrams (flowcharts, sequence diagrams, class diagrams, ER diagrams, and more)
- Renders as live, interactive SVG directly in the chat — not just a code block
- `/diagram <description>` — copy syntax or download the `.mmd` file
- Graceful fallback to raw Mermaid syntax if client-side rendering fails

### 📄 AI Document Generator
- Generates reports, resumes, articles, letters, proposals, summaries, and essays
- Exports to **Markdown, DOCX, or PDF** (`python-docx` / `reportlab`)
- Automatically falls back to Markdown if a format's library isn't available — never a hard failure
- `/doc <format> <topic>` — formatted preview bubble + prominent download button

### 🔑 Bring Your Own Key (BYOK)
- Use your own OpenRouter API key instead of the shared server key
- Stored only in browser `localStorage`, sent as an `Authorization` header — never touches server-side storage or logs
- Automatically forwarded through every AI call and every tool (avatar, code, diagram, document)
- Manage it anytime from **Settings**

### 🔐 Authentication (Login / Signup)
- Dark glassmorphism auth pages matching the main app's theme
- SQLite-backed user accounts (stdlib `sqlite3`, zero extra deps)
- Passwords hashed with PBKDF2-HMAC-SHA256 (260k iterations) + per-user salt, timing-safe comparison
- Session-based auth via Flask sessions (`/login`, `/signup`, `/logout`)

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Backend** | ![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white) Flask · Flask-CORS · Requests · python-dotenv · sqlite3 (stdlib) |
| **Document Export** | python-docx · reportlab · markdown |
| **Frontend** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) Vanilla JS · Web Speech API · SpeechSynthesis · Mermaid.js · marked.js |
| **AI Layer** | ![OpenAI](https://img.shields.io/badge/OpenAI_Compatible-412991?style=flat&logo=openai&logoColor=white) OpenRouter — `nemotron-3-super` (router/orchestrator) · `gemma-4-26b-a4b-it` (vision) · `poolside/laguna-xs-2.1` (code) · Wikipedia REST API |
| **Free Tools** | DiceBear API (avatars, no key required) |
| **Deployment** | ![Render](https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=white) Render (cloud hosting) |

---

## 📁 Project Structure

```
eka/
├── app.py                    # Flask backend — AI orchestrator, tools, auth, chat
├── requirements.txt
├── templates/
│   ├── base.html              # Shared layout for auth pages
│   ├── index.html             # Chat UI (HTML5)
│   ├── login.html             # Login page (extends base.html)
│   └── signup.html            # Signup page (extends base.html)
├── static/
│   ├── style.css               # Chat UI styling & animations
│   ├── script.js               # Chat logic, voice, tools, auto-routing
│   ├── css/
│   │   ├── theme-vars.css       # Shared design tokens (colors, fonts)
│   │   └── auth.css             # Login/signup glassmorphism styling
│   └── img/
│       └── Swastik.jpg          # Brand image (auth pages)
├── eka_users.db               # SQLite user store (auto-created, gitignored)
├── .env                       # API keys & config
└── README.md
```

---

## ⚙️ Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

<details>
<summary>Manual install (equivalent)</summary>

```bash
pip install flask requests flask-cors python-dotenv gTTS ddgs python-docx reportlab markdown
```
</details>

### 2. Configure Environment

Create a `.env` file in the root:

```env
AI_API_URL="https://openrouter.ai/api/v1/chat/completions"
AI_API_KEY="your-openrouter-key-here"
BOT_NAME="EKA"
DEV_NAME="Your Name"
SECRET_KEY="a-long-random-string"        # Flask session signing — required for auth to persist across restarts
AUTH_DB_PATH="eka_users.db"              # optional — defaults to eka_users.db next to app.py
```

> `AI_API_KEY` is the **server-side fallback key**. Individual users can also supply their own key via **Settings → BYOK**, which takes priority per-request.

### 3. Run Locally

```bash
python app.py
```

Open `http://127.0.0.1:5000` in your browser. Visit `/signup` to create an account, or use the chat anonymously.

### 4. Deploy on Render

1. Push your repo to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `python app.py`
6. Add your environment variables in the Render dashboard
7. Deploy 🎉

---

## 🧪 Try It Out

**Plain conversation**
```
"What is Artificial Intelligence?"
"Explain black holes in simple words"
"Latest news on space exploration"  ← with 🌐 Web Search ON
```

**Tools — auto-routed (just ask naturally)**
```
"Make me an avatar named Nova"
"Write me a Python function to reverse a linked list"
"Draw me a diagram of a login flow"
"Write a one-page report on renewable energy as a PDF"
```

**Tools — slash-command shortcuts**
```
/avatar Rohan pixel-art
/code python write a function for Fibonacci
/diagram sequence diagram for a checkout flow
/doc pdf project report on Q3 sales
```

---

## 📌 Notes

- Best experience on **Google Chrome** (voice features)
- Web search only activates when toggled ON
- Chat itself is session-agnostic — conversation history isn't tied to a logged-in account (yet)
- AI responses are used when Wikipedia is disabled or unavailable
- Generated code is **verified statically only** (syntax/structure checks) — never executed server-side
- Document export falls back to Markdown automatically if `python-docx`/`reportlab` aren't installed
- BYOK keys live only in the browser's `localStorage` — clearing site data removes them
- Set `SECRET_KEY` in production, or user sessions won't survive a server restart

---

## 👤 Author

<div align="center">

**Abhi**
Developer & Designer

[![GitHub](https://img.shields.io/badge/GitHub-Abhiraj1121-181717?style=for-the-badge&logo=github)](https://github.com/Abhiraj1121)

*Built with curiosity. Deployed with confidence.*

</div>

---

<div align="center">
<sub>© Eka — Legal Docs: <a href="https://abhiraj1121.github.io/ai-tc/">abhiraj1121.github.io/ai-tc</a></sub>
</div>
