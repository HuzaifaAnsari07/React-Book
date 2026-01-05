export default function ProgressBar({ current, total }) {
  const progress = ((current + 1) / total) * 100

  return (
    <div className="progress-container">
      <div className="progress" style={{ width: `${progress}%` }} />
    </div>
  )
}
