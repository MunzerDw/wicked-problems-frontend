import { useEffect, useState } from 'react'

function useDarkMode() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem('darkMode') || false)
  )
  useEffect(() => {
    if (darkMode) {
      document.getElementById('html').setAttribute('class', 'dark')
      localStorage.setItem('darkMode', true)
    } else {
      document.getElementById('html').setAttribute('class', '')
      localStorage.setItem('darkMode', false)
    }
  }, [darkMode])
  return { darkMode, setDarkMode }
}

export default useDarkMode
