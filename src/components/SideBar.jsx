export default function Sidebar({ slides, current, goTo }) {
  return (
    <div className="sidebar">
      <h2>📘 React Book</h2>
      {slides.map((slide, index) => (
        <button
          key={index}
          className={index === current ? "active" : ""}
          onClick={() => goTo(index)}
        >
          {slide.title}
        </button>
      ))}
    </div>
  )
}
