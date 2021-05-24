import Tab from './components/Tab'

function Menu(props) {
  return (
    <div
      className="w-full h-full bg-gray-300 p-6"
      style={{
        maxWidth: '250px',
      }}
    >
      <Tab text="Projects" />
      <Tab text="Statistics" />
    </div>
  )
}
export default Menu
