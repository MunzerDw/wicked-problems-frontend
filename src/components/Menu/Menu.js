import Tab from './components/Tab'
import { contexts } from 'states'
import { useContext } from 'react'
import MenuToggle from 'components/CanvasPage/components/MenuToggle'
import Flex from 'components/Flex'

function Menu() {
  const { menuOpen } = useContext(contexts.GlobalCtx)
  const projectName = window.location.pathname.split('/')[2]
  return (
    <div
      className={
        'w-full h-screen absolute bg-gray-300 dark:bg-gray-700 flex flex-col overflow-hidden '
      }
      style={{
        zIndex: '1000',
        transitionDuration: '250ms',
        maxWidth: menuOpen ? '250px' : '0px',
      }}
    >
      <div className="p-1 flex justify-end w-full">
        <MenuToggle />
      </div>
      <Flex.Col className="p-6">
        <Tab text="Home" to="/" />
        <Tab text="Canvas" to={'/projects/' + projectName} />
        <Tab
          text="Statistics"
          to={'/projects/' + projectName + '/statistics'}
        />
        <Tab text="Snapshots" to={'/projects/' + projectName + '/snapshots'} />
        <Tab
          text="Public Analysis"
          to={'/projects/' + projectName + '/publicanalysis'}
        />
      </Flex.Col>
    </div>
  )
}
export default Menu
