import Flex from 'components/Flex'
import Menu from 'components/Menu/Menu'
import MenuToggle from './components/MenuToggle'

function CanvasPage({ className, topBar, ...props }) {
  return (
    <div className="h-screen w-screen dark:bg-gray-800">
      <Flex.Row space="0" align="start" className="w-full relative">
        <Menu />
        <Flex.Col space="0" className="w-full">
          <div className="w-full p-1">
            <MenuToggle />
            {topBar}
          </div>
          <div className={'p-6 pt-2 w-full ' + className}>{props.children}</div>
        </Flex.Col>
      </Flex.Row>
    </div>
  )
}
export default CanvasPage
