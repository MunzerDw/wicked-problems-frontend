import { useEffect } from 'react'
import { useState } from 'react'
import Button from './Button'

function ThemeToogle() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem('darkMode'))
  )

  useEffect(() => {
    if (darkMode) {
      document.getElementById('html').setAttribute('class', 'dark')
    } else {
      document.getElementById('html').setAttribute('class', '')
    }
  })

  return (
    <Button
      className="rounded-full"
      color={darkMode ? 'gray' : 'yellow'}
      icon={darkMode ? 'FaMoon' : 'FaSun'}
      onClick={() => {
        if (!darkMode) {
          document.getElementById('html').setAttribute('class', 'dark')
          localStorage.setItem('darkMode', true)
        } else {
          document.getElementById('html').setAttribute('class', '')
          localStorage.setItem('darkMode', false)
        }
        setDarkMode(!darkMode)
      }}
      iconBtn
    />
  )
}

export default ThemeToogle
