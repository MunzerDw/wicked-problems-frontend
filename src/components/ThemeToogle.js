import useDarkMode from '../hooks/useDarkMode'
import Button from './Button'

function ThemeToogle() {
  const { darkMode, setDarkMode } = useDarkMode()

  return (
    <Button
      className="rounded-full"
      basic
      color={darkMode ? 'white' : 'yellow'}
      icon={darkMode ? 'FaMoon' : 'FaSun'}
      onClick={() => {
        setDarkMode(!darkMode)
      }}
      iconBtn
    />
  )
}

export default ThemeToogle
