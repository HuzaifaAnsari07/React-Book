import {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle
} from "react"

const LASER_LIFETIME = 3000 // 3 seconds

const DrawLayer = forwardRef(({ tool }, ref) => {
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const laserStrokes = useRef([])
  const [drawing, setDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      ctxRef.current = canvas.getContext("2d")
    }
    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  useImperativeHandle(ref, () => ({
    clearAll() {
      const ctx = ctxRef.current
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      laserStrokes.current = []
    }
  }))

  const startDraw = e => {
    if (!tool) return

    setDrawing(true)
    const ctx = ctxRef.current
    ctx.beginPath()
    ctx.moveTo(e.clientX, e.clientY)

    if (tool === "laser") {
      laserStrokes.current.push({
        points: [{ x: e.clientX, y: e.clientY }],
        startTime: Date.now()
      })
    }
  }

  const draw = e => {
    if (!drawing || !tool) return

    const ctx = ctxRef.current

    if (tool === "pencil") {
      ctx.lineTo(e.clientX, e.clientY)
      ctx.strokeStyle = "#38bdf8"
      ctx.lineWidth = 2
      ctx.stroke()
    }

    if (tool === "laser") {
      const stroke =
        laserStrokes.current[laserStrokes.current.length - 1]
      stroke.points.push({ x: e.clientX, y: e.clientY })
    }
  }

  const stopDraw = () => setDrawing(false)

  // Laser fade animation
  useEffect(() => {
    if (tool !== "laser") return

    let animationId

    const animate = () => {
      const ctx = ctxRef.current
      const now = Date.now()

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

      laserStrokes.current = laserStrokes.current.filter(stroke => {
        const age = now - stroke.startTime
        if (age > LASER_LIFETIME) return false

        const alpha = 1 - age / LASER_LIFETIME

        ctx.beginPath()
        ctx.strokeStyle = `rgba(255,0,0,${alpha})`
        ctx.lineWidth = 3

        stroke.points.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        })

        ctx.stroke()
        return true
      })

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [tool])

  return (
    <canvas
      ref={canvasRef}
      className={`draw-layer ${tool ? "active" : ""}`}
      onMouseDown={startDraw}
      onMouseMove={draw}
      onMouseUp={stopDraw}
      onMouseLeave={stopDraw}
    />
  )
})

export default DrawLayer
