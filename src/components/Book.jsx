import { useEffect, useRef, useState } from "react"
import slides from "../data/slides"

import Sidebar from "./SideBar"
import Slide from "./Slide"
import Navigation from "./Navigation"
import ProgressBar from "./ProgressBar"
import DrawLayer from "./DrawLayer"
import WhiteBoard from "./WhiteBoard"

export default function Book() {
  const [current, setCurrent] = useState(0)
  const [showBoard, setShowBoard] = useState(false)
  const [tool, setTool] = useState(null) // null | pencil | laser

  const drawRef = useRef(null)

  const next = () => {
    if (current < slides.length - 1) setCurrent(c => c + 1)
  }

  const prev = () => {
    if (current > 0) setCurrent(c => c - 1)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKey = e => {
      if (showBoard) return
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [current, showBoard])

  // Toggle logic
  const toggleTool = selectedTool => {
    setTool(prev => (prev === selectedTool ? null : selectedTool))
  }

  return (
    <div className="book-layout">
      {/* SIDEBAR */}
      <Sidebar slides={slides} current={current} goTo={setCurrent} />

      {/* MAIN BOOK */}
      <div className="book">
        <ProgressBar current={current} total={slides.length} />
        <Slide slide={slides[current]} />
        <Navigation
          current={current}
          total={slides.length}
          next={next}
          prev={prev}
        />
      </div>

      {/* TOOLBAR */}
      <div className="toolbar">
        <button
          onClick={() => toggleTool("pencil")}
          style={{
            background: tool === "pencil" ? "#22c55e" : "#38bdf8"
          }}
        >
          ✏ Pencil
        </button>

        <button
          onClick={() => toggleTool("laser")}
          style={{
            background: tool === "laser" ? "#ef4444" : "#38bdf8"
          }}
        >
          🔴 Laser
        </button>

        <button onClick={() => setShowBoard(true)}>
          🧾 Open Board
        </button>

        <button onClick={() => drawRef.current?.clearAll()}>
          🧹 Clear All
        </button>
      </div>

      {/* DRAW / LASER LAYER */}
      <DrawLayer ref={drawRef} tool={tool} />

      {/* WHITE BOARD */}
      {showBoard && (
        <WhiteBoard onClose={() => setShowBoard(false)} />
      )}
    </div>
  )
}
