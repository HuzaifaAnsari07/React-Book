import TypeWriter from "./TypeWriter"

export default function Slide({ slide }) {
  return (
    <div className="slide">
      <h1>{slide.title}</h1>
      <TypeWriter text={slide.content} />
    </div>
  )
}
