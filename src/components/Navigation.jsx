export default function Navigation({ current, total, next, prev }) {
  return (
    <div className="nav">
      <button onClick={prev} disabled={current === 0}>
        ⬅ Previous
      </button>

      <span>
        Slide {current + 1} of {total}
      </span>

      <button onClick={next} disabled={current === total - 1}>
        Next ➡
      </button>
    </div>
  )
}
