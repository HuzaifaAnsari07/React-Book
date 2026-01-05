import { useEffect, useRef, useState } from "react"

export default function WhiteBoard({ data, onChange, onClose }) {
  const canvasRef = useRef(null)

  // Board position (movable)
  const [pos, setPos] = useState({ x: 100, y: 80 })
  const [draggingBoard, setDraggingBoard] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const [drawing, setDrawing] = useState(false)
  const [texts, setTexts] = useState(data?.texts || [])

  /* ================= CANVAS SETUP ================= */
  useEffect(() => {
    const canvas = canvasRef.current
    const container = canvas.parentElement

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"

      const ctx = canvas.getContext("2d")
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.lineCap = "round"
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  /* ================= SAVE STATE PER SLIDE ================= */
  useEffect(() => {
    onChange?.({ texts })
  }, [texts])

  /* ================= BOARD DRAG ================= */
  const startBoardDrag = e => {
    setDraggingBoard(true)
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y
    })
  }

  const onBoardMove = e => {
    if (!draggingBoard) return
    setPos({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y
    })
  }

  const stopBoardDrag = () => setDraggingBoard(false)

  useEffect(() => {
    window.addEventListener("mousemove", onBoardMove)
    window.addEventListener("mouseup", stopBoardDrag)
    return () => {
      window.removeEventListener("mousemove", onBoardMove)
      window.removeEventListener("mouseup", stopBoardDrag)
    }
  })

  /* ================= DRAWING ================= */
  const getPos = e => {
    const rect = canvasRef.current.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  const startDraw = e => {
    setDrawing(true)
    const ctx = canvasRef.current.getContext("2d")
    const { x, y } = getPos(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = e => {
    if (!drawing) return
    const ctx = canvasRef.current.getContext("2d")
    const { x, y } = getPos(e)
    ctx.lineTo(x, y)
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.stroke()
  }

  const stopDraw = () => setDrawing(false)

  /* ================= TEXT ================= */
  const addText = () => {
    setTexts(prev => [
      ...prev,
      {
        id: Date.now(),
        x: 120,
        y: 120,
        content: "Type here..."
      }
    ])
  }

  const updateText = (id, content) => {
    setTexts(prev =>
      prev.map(t => (t.id === id ? { ...t, content } : t))
    )
  }

  const moveText = (id, x, y) => {
    setTexts(prev =>
      prev.map(t => (t.id === id ? { ...t, x, y } : t))
    )
  }

  const deleteText = id => {
    setTexts(prev => prev.filter(t => t.id !== id))
  }

  /* ================= 🔥 CLEAR ALL (RESTORED) ================= */
  const clearBoard = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setTexts([]) // remove all text boxes
  }

  return (
    <div
      className="whiteboard"
      style={{ left: pos.x, top: pos.y }}
    >
      {/* HEADER (DRAG HANDLE) */}
      <div className="board-header" onMouseDown={startBoardDrag}>
        <span>🧾 White Board</span>
        <button onClick={onClose} style={{ cursor: "pointer" }}>❌</button>
      </div>

      {/* TOOLS */}
      <div className="board-tools">
        <button onClick={addText}>🅣 Add Text</button>
        <button onClick={clearBoard}>🧹 Clear All</button>
      </div>

      {/* BOARD AREA */}
      <div className="board-area">
        <canvas
          ref={canvasRef}
          className="board-canvas"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
        />

        {texts.map(t => (
          <TextBox
            key={t.id}
            box={t}
            onMove={moveText}
            onChange={updateText}
            onDelete={deleteText}
          />
        ))}
      </div>
    </div>
  )
}

/* ================= TEXT BOX ================= */
function TextBox({ box, onMove, onChange, onDelete }) {
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
      onKeyDown={e => e.stopPropagation()}
    >
      <div className="text-header">
        Text
        <button
          className="delete-btn"
          onClick={() => onDelete(box.id)}
        >
          ❌
        </button>
      </div>

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
