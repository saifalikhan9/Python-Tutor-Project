# Python Tutor for Kids 🐍👩‍🏫

An educational web app designed to help students (up to 9th grade) learn Python in a fun and interactive way. It features a chatbot tutor powered by the **Gemini SDK**, and a built-in code playground where students can write and test Python code right in the browser.

---

## ✨ Features

- 💡 **AI‑Powered Learning**  
  Personalized guidance and instant feedback from a chatbot tutor powered by the Gemini SDK.

- 📖 **Interactive Lessons**  
  A series of bite‑sized, grade‑appropriate lessons (e.g. “What is Python?”, “Printing & `print()`”, “Variables”, “Basic Math”) with code examples.

- 💻 **Practice Playground**  
  Safe, in‑browser CodeMirror editor with Python syntax highlighting and live output.

- ⚙️ **Settings & Configuration**  
  Easily set or remove your Gemini API key from the Settings page.

- 🌙 **One Dark Theme**  
  Editor styled with the popular One Dark theme for reduced eye strain.


---
## Project Screenshots
![Screenshot (58)](https://github.com/user-attachments/assets/7bb18f65-cd04-41bc-968c-02556a42abac)
![Screenshot (59)](https://github.com/user-attachments/assets/bdfe5c9d-8561-4615-82fc-e5cb100c19c8)
![Screenshot (60)](https://github.com/user-attachments/assets/66a35d63-8579-4843-8f17-34fd15e76748)
![Screenshot (57)](https://github.com/user-attachments/assets/da5ab874-ef24-43dc-8360-bda93afbf8c9)

## 🧰 Tech Stack

### Frontend
- **React** — UI framework
- **Vite** — Lightning-fast build tool
- **Tailwind CSS** — Utility-first CSS framework
- **React Router DOM** — For routing
- **@uiw/react-codemirror** — Code editor component
- **@codemirror/lang-python** — Python language support
- **@codemirror/theme-one-dark** — Editor theme
- **React Markdown** — For rendering markdown responses
- **React Syntax Highlighter** — To show Python code with highlighting
- **Rehype Highlight** — Markdown syntax highlighting

### AI Integration
- **Gemini SDK** — Used to power the AI chatbot Python tutor

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed.

### Installation

```bash
git clone https://github.com/your-username/python-tutor.git
cd frontend
npm install
npm run dev
