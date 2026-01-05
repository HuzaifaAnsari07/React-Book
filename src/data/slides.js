const slides = [
  {
    title: "👋 Introduction & Prerequisites",
    content: `
Welcome to the React Session 🚀

Prerequisites:
• Basic HTML
• Basic CSS
• Basic JavaScript (variables, functions)


Importance of React:
• Used by Facebook, Netflix, Instagram
• Component-based
• Fast & scalable
    `
  },
  {
    title: "🤔 Why React? JS vs JSX",
    content: `
Why React?
• UI becomes easy to manage
• Reusable components
• Faster updates using Virtual DOM

JS vs JSX:
JavaScript:
document.createElement(...)

JSX:
<h1>Hello React</h1>

JSX is readable, clean, and developer-friendly.
    `
  },
  {
    title: "⚡ Why Vite?",
    content: `
Why Vite instead of CRA?

• Faster startup
• Lightning-fast HMR
• Lightweight
• Modern tooling

Command:
npm create vite@latest
    `
  },
  {
    title: "🛠 Installation",
    content: `
Steps:
1. Install Node.js
2. npm create vite@latest
3. cd project-name
4. npm install
5. npm run dev

Boom 💥 React app ready!
    `
  },
  {
    title: "🧩 Components",
    content: `
Component = Reusable UI piece

Types:
• Functional Components (Most used)
• Class Components (Old)

Example:
function Button() {
  return <button>Click</button>
}

Everything in React is a component.
    `
  },
  {
    title: "📦 Props",
    content: `
Props = Data passed to components

Example:
<Button text="Click Me" />

Why Props?
• Reusability
• Dynamic data
• Clean structure
    `
  },
  {
    title: "🎣 Hooks & State",
    content: `
Hooks let you use state in functional components.

State:
• Stores data
• Changes UI automatically

Why state?
Because UI should react to data changes.
    `
  },
  {
    title: "🔄 useState & useEffect",
    content: `
useState:
const [count, setCount] = useState(0)

useEffect:
Runs side-effects
• API calls
• Timers
• DOM changes

React updates UI automatically.
    `
  },
  {
    title: "🧭 Routing",
    content: `
Routing = Multiple pages without reload

Library:
react-router-dom

Routes:
• Home
• About
• Contact

Single Page Application (SPA)
    `
  },
  {
    title: "🎉 Conclusion",
    content: `
React is:
• Powerful
• Flexible
• Industry-ready

Best Wishes 💙
Keep building & exploring!
    `
  }
]

export default slides
