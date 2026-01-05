import { useEffect, useRef, useState } from "react"

export default function WhiteBoard({ onClose }) {
  const canvasRef = useRef(null)
  const boardRef = useRef(null)

  const [drawing, setDrawing] = useState(false)
  const [mode, setMode] = useState("draw") // draw | text
  const [textBoxes, setTextBoxes] = useState([])
  const textCounter = useRef(0) // 🔥 keeps track of how many boxes created

  /* ========== CANVAS SETUP ========== */
  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }, [])

  /* ========== DRAWING ========== */
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

  /* ========== ADD TEXT BOX ========== */
  const addTextBox = () => {
    const offset = textCounter.current * 20

    setTextBoxes(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        x: 80 + offset,
        y: 80 + offset,
        content: "Type here..."
      }
    ])

    textCounter.current += 1
  }

  const updateText = (id, value) => {
    setTextBoxes(prev =>
      prev.map(box =>
        box.id === id ? { ...box, content: value } : box
      )
    )
  }

  const moveTextBox = (id, x, y) => {
    setTextBoxes(prev =>
      prev.map(box =>
        box.id === id ? { ...box, x, y } : box
      )
    )
  }

  const clearBoard = () => {
    const ctx = canvasRef.current.getContext("2d")
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    setTextBoxes([])
    textCounter.current = 0
  }

  /* ========== DRAG WHOLE BOARD ========== */
  useEffect(() => {
    const board = boardRef.current
    const header = board.querySelector(".board-header")

    let dragging = false
    let ox = 0
    let oy = 0

    const down = e => {
      dragging = true
      ox = e.clientX - board.offsetLeft
      oy = e.clientY - board.offsetTop
    }

    const move = e => {
      if (!dragging) return
      board.style.left = e.clientX - ox + "px"
      board.style.top = e.clientY - oy + "px"
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

  return (
    <div className="whiteboard" ref={boardRef}>
      {/* HEADER */}
      <div className="board-header">
        <span>🧾 White Board</span>
        <button onClick={onClose}>❌</button>
      </div>

      {/* TOOLS */}
      <div className="board-tools">
        <button onClick={() => setMode("draw")}>✏ Draw</button>
        <button
          onClick={() => {
            setMode("text")
            addTextBox()
          }}
        >
          🅣 Add Text
        </button>
        <button onClick={clearBoard}>🧹 Clear</button>
      </div>

      {/* BOARD AREA */}
      <div className="board-area">
        <canvas
          ref={canvasRef}
          className="board-canvas"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
        />

        {/* MULTIPLE TEXT BOXES */}
        {textBoxes.map(box => (
          <TextBox
            key={box.id}
            box={box}
            onMove={moveTextBox}
            onChange={updateText}
          />
        ))}
      </div>
    </div>
  )
}

/* ========== TEXT BOX COMPONENT ========== */
function TextBox({ box, onMove, onChange }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    let dragging = false
    let ox = 0
    let oy = 0

    const down = e => {
      dragging = true
      ox = e.clientX - el.offsetLeft
      oy = e.clientY - el.offsetTop
      e.stopPropagation()
    }

    const move = e => {
      if (!dragging) return
      onMove(box.id, e.clientX - ox, e.clientY - oy)
    }

    const up = () => (dragging = false)

    el.querySelector(".text-header").addEventListener("mousedown", down)
    window.addEventListener("mousemove", move)
    window.addEventListener("mouseup", up)

    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseup", up)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="text-dialog"
      style={{ left: box.x, top: box.y }}
      onKeyDown={e => e.stopPropagation()} // prevent slide navigation
    >
      <div className="text-header">Text</div>
      <div
        className="text-content"
        contentEditable
        suppressContentEditableWarning
        onInput={e => onChange(box.id, e.currentTarget.innerText)}
      >
        {box.content}
      </div>
    </div>
  )
}
