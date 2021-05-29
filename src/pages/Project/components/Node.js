import Flex from 'components/Flex'
import Icon from 'components/Icon'
import { Handle } from 'react-flow-renderer'
import axios from 'axios'
import { useEffect, useState } from 'react'

function Node({ icon, color, children, ...props }) {
  const [x, setX] = useState()
  const [y, setY] = useState()
  useEffect(() => {
    if (!props.isDragging && (props.xPos !== x || props.yPos !== y)) {
      axios.put('/nodes/' + props.id, { x: props.xPos, y: props.yPos })
    }
    if (!props.isDragging) {
      setX(props.xPos)
      setY(props.yPos)
    }
  })
  return (
    <Flex.Row
      space="0"
      className={
        'bg-gray-500 dark:bg-gray-500 w-96 border rounded border-gray-500 dark:border-none text-black'
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
