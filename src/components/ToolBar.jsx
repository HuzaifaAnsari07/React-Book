export default function ToolBar({ setShowBoard }) {
  return (
    <div className="toolbar">
      <button onClick={() => setShowBoard(true)}>🧾 Open Board</button>
    </div>
  )
}
