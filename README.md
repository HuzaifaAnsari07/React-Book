📘 React Book – A Digital Teaching & Presentation Platform
🚀 Overview

React Book is an interactive, digital teaching platform built using React that replaces traditional PowerPoint presentations with a live, interactive, and smart learning experience.

Instead of static slides, React Book allows presenters to:

Navigate topic-wise content

Draw, highlight, and explain concepts live

Use a floating whiteboard

Add multiple draggable text notes

Use a laser pointer

Save whiteboard data per slide

This project is specially designed for technical teaching sessions, React workshops, and interactive classrooms.

🎯 Why React Book?

Traditional presentations are:

Static

Non-interactive

Hard to explain live coding concepts

React Book solves this by:

Making teaching dynamic

Allowing real-time explanations

Letting presenters interact with content visually

Providing tools similar to smart boards and online whiteboards

This is not a presentation. This is a teaching tool.

🧠 Core Features
📑 Slide-Based Content

Topic-wise slides (Intro, JSX, Hooks, Routing, etc.)

Sidebar navigation

Next / Previous slide controls

Keyboard navigation support

✏ Pencil Tool

Toggleable drawing tool

Draw directly on slides

Permanent drawings

Does not block buttons or sidebar

Cursor changes automatically when active

🔴 Laser Pointer Tool

Toggleable laser mode

Draws temporary laser trails

Laser drawings fade out automatically (after 3 seconds)

Perfect for highlighting important parts during explanation

🧾 Floating Whiteboard

Movable whiteboard window

Can be dragged anywhere on screen

Works independently from slides

Whiteboard Capabilities:

Freehand drawing (entire board area works)

Multiple draggable text boxes

Resizable text boxes

Delete individual text boxes

Clear entire whiteboard

Text editing without interfering with slide navigation

💾 Per-Slide Whiteboard Save

Each slide has its own whiteboard state

Drawings and text boxes are restored when revisiting a slide

Switching slides does not lose work

🖱 Smart Cursor Behavior
Tool State	Cursor
No tool selected	Normal arrow
Pencil ON	Crosshair
Laser ON	Crosshair
🧱 Project Structure
src/
│
├── components/
│   ├── Book.jsx           # Main container
│   ├── Sidebar.jsx        # Slide navigation
│   ├── Slide.jsx          # Slide content
│   ├── Navigation.jsx    # Next / Previous buttons
│   ├── ProgressBar.jsx   # Slide progress indicator
│   ├── DrawLayer.jsx     # Pencil + Laser drawing layer
│   ├── WhiteBoard.jsx    # Floating whiteboard
│
├── data/
│   └── slides.js          # All slide content
│
├── index.css              # Global styles
└── main.jsx

⚙️ Tech Stack

React (Hooks-based architecture)

JavaScript (ES6+)

HTML5 Canvas

CSS (Custom styling, no UI libraries)

🧩 Key Concepts Used

React Hooks (useState, useEffect, useRef)

Controlled components

Canvas drawing & scaling

Pointer event handling

Component-based architecture

State lifting (per-slide board save)

Custom drag logic

🖥️ How to Run the Project
1️⃣ Clone the Repository
git clone https://github.com/your-username/react-book.git

2️⃣ Install Dependencies
npm install

3️⃣ Start Development Server
npm run dev

🎤 Best Use Cases

React workshops

Classroom teaching

Online lectures

Live coding explanations

Technical presentations

Hackathon demos

🌟 What Makes This Project Special?

✔ Not a static PPT
✔ Built completely in React
✔ Interactive teaching-first design
✔ Real smart-board features
✔ Modular & scalable architecture

This project demonstrates practical React skills, not just UI building.

🔮 Future Enhancements (Planned)

Undo / Redo

Export whiteboard as image

Keyboard shortcuts (P, L, Esc, etc.)

Code playground slides

AI-powered explanations

Save session as notes

Multi-user collaboration

👨‍💻 Author

Ansari Huzaifa
First Year CSE (AIML) Student
Passionate about React, UI/UX, and Interactive Learning Tools

⭐ Final Note

React Book is built with the mindset of teaching, not presenting.

If you’re tired of boring slides —
this is the future of technical education.
