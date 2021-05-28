import Flex from 'components/Flex'
import Icon from 'components/Icon'
import { Handle } from 'react-flow-renderer'

function Node({ icon, color, children, ...props }) {
  return (
    <Flex.Row
      space="0"
      className={
        'bg-white w-96 border rounded border-gray-500 dark:border-none text-black'
      }
    >
      <Handle type="source" position="right" />
      <Handle type="target" position="left" />
      <div className="flex p-4">
        <Icon size={50} name={icon} className="m-auto" color={color} />
      </div>
      <div className="p-4 w-full h-full">{children}</div>
    </Flex.Row>
  )
}

export default Node
