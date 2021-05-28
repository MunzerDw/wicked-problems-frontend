import Flex from 'components/Flex'
import Icon from 'components/Icon'

function Node({ icon, color, children, ...props }) {
  // console.log('node is rendered', props)
  return (
    <Flex.Row
      space="0"
      className={
        'bg-white w-96 border rounded border-gray-500 dark:border-nonde text-black'
      }
    >
      <div className="flex p-4">
        <Icon size={50} name={icon} className="m-auto" color={color} />
      </div>
      <div className="p-4 w-full h-full">{children}</div>
    </Flex.Row>
  )
}

export default Node
