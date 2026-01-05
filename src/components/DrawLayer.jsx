import {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle
} from "react"

const DrawLayer = forwardRef((props, ref) => {
  const canvasRef = useRef(null)
  const [drawing, setDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  useImperativeHandle(ref, () => ({
    clearAll() {
      const ctx = canvasRef.current.getContext("2d")
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }))

  const startDraw = e => {
    // ✅ Start drawing
    setDrawing(true)
    const ctx = canvasRef.current.getContext("2d")
    ctx.beginPath()
    ctx.moveTo(e.clientX, e.clientY)
  }

  const draw = e => {
    if (!drawing) return
    const ctx = canvasRef.current.getContext("2d")
    ctx.lineTo(e.clientX, e.clientY)
    ctx.strokeStyle = "#38bdf8"
    ctx.lineWidth = 2
    ctx.stroke()
  }

  const stopDraw = () => setDrawing(false)

  return (
    <canvas
      ref={canvasRef}
      className="draw-layer"
      onMouseDown={startDraw}
      onMouseMove={draw}
      onMouseUp={stopDraw}
      onMouseLeave={stopDraw}
    />
  )
})

export default DrawLayer
