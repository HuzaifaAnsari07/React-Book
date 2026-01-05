import { useEffect, useState } from "react"

export default function TypeWriter({ text }) {
  const [displayed, setDisplayed] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setDisplayed("")
    setIndex(0)
  }, [text])

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(prev => prev + text[index])
        setIndex(prev => prev + 1)
      }, 15)

      return () => clearTimeout(timeout)
    }
  }, [index, text])

  return <pre>{displayed}</pre>
}
