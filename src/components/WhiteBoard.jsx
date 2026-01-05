import { useEffect, useRef, useState } from "react"

export default function WhiteBoard({ onClose }) {
  const canvasRef = useRef(null)
  const boardRef = useRef(null)
  const textRef = useRef(null)

  const [drawing, setDrawing] = useState(false)
  const [mode, setMode] = useState("draw") // draw | text
  const [showTextBox, setShowTextBox] = useState(false)

  // ---------- CANVAS SETUP ----------
  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }, [])

  // ---------- DRAWING ----------
  const startDraw = e => {
    if (mode !== "draw") return
    setDrawing(true)
    const ctx = canvasRef.current.getContext("2d")
    ctx.beginPath()
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
  }

  const draw = e => {
    if (!drawing || mode !== "draw") return
    const ctx = canvasRef.current.getContext("2d")
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.stroke()
  }

  const stopDraw = () => setDrawing(false)

  const clearBoard = () => {
    const ctx = canvasRef.current.getContext("2d")
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    setShowTextBox(false)
  }

  // ---------- DRAG WHOLE BOARD ----------
  useEffect(() => {
    const board = boardRef.current
    const header = board.querySelector(".board-header")

    let dragging = false
    let offsetX = 0
    let offsetY = 0

    const down = e => {
      dragging = true
      offsetX = e.clientX - board.offsetLeft
      offsetY = e.clientY - board.offsetTop
    }

    const move = e => {
      if (!dragging) return
      board.style.left = e.clientX - offsetX + "px"
      board.style.top = e.clientY - offsetY + "px"
    }

    const up = () => (dragging = false)

    header.addEventListener("mousedown", down)
    window.addEventListener("mousemove", move)
    window.addEventListener("mouseup", up)

    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseup", up)
    }
  }, [])

  // ---------- DRAG TEXT BOX ----------
  useEffect(() => {
    if (!showTextBox) return

    const box = textRef.current
    const header = box.querySelector(".text-header")

    let dragging = false
    let offsetX = 0
    let offsetY = 0

    const down = e => {
      dragging = true
      offsetX = e.clientX - box.offsetLeft
      offsetY = e.clientY - box.offsetTop
    }

    const move = e => {
      if (!dragging) return
      box.style.left = e.clientX - offsetX + "px"
      box.style.top = e.clientY - offsetY + "px"
    }

    const up = () => (dragging = false)

    header.addEventListener("mousedown", down)
    window.addEventListener("mousemove", move)
    window.addEventListener("mouseup", up)

    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseup", up)
    }
  }, [showTextBox])

  return (
    <div className="whiteboard" ref={boardRef}>
      {/* ---------- HEADER ---------- */}
      <div className="board-header">
        <span>🧾 White Board</span>
        <button onClick={onClose}>❌</button>
      </div>

      {/* ---------- TOOLS ---------- */}
      <div className="board-tools">
        <button onClick={() => setMode("draw")}>✏ Draw</button>

        <button
          onClick={() => {
            setMode("text")
            setShowTextBox(true)
          }}
        >
          🅣 Add Text
        </button>

        <button onClick={clearBoard}>🧹 Clear</button>
      </div>

      {/* ---------- BOARD AREA ---------- */}
      <div className="board-area">
        <canvas
          ref={canvasRef}
          className="board-canvas"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
        />

        {/* ---------- TEXT DIALOG ---------- */}
        {showTextBox && (
          <div
            ref={textRef}
            className="text-dialog"
            onKeyDown={e => e.stopPropagation()} // 🔥 Prevent slide change
          >
            <div className="text-header">Text Note</div>

            <div
              className="text-content"
              contentEditable
              suppressContentEditableWarning
            >
              Type here...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
