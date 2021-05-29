import Flex from 'components/Flex'
import Icon from 'components/Icon'
import { Handle } from 'react-flow-renderer'
import axios from 'axios'
import { useEffect, useState } from 'react'
import nodeEditor from 'models/NodeEditor'

function Node({ icon, color, children, ...props }) {
  const [x, setX] = useState()
  const [y, setY] = useState()
  const [data, setData] = useState()

  // eslint-disable-next-line
  useEffect(() => {
    if (nodeEditor.editorNode?.id === props.id) {
      nodeEditor.setEditorNode({
        ...nodeEditor.editorNode,
        x: props.xPos,
        y: props.yPos,
      })
    }
    if (!props.isDragging && (props.xPos !== x || props.yPos !== y)) {
      axios.put('/nodes/' + props.id, { x: props.xPos, y: props.yPos })
    }
    if (!props.isDragging) {
      setX(props.xPos)
      setY(props.yPos)
    }
  })
  useEffect(() => {
    setData({ ...props })
    // eslint-disable-next-line
  }, [])

  return (
    <Flex.Row
      space="0"
      onDoubleClick={() => {
        if (data.id !== nodeEditor.getEditorNode().id) {
          nodeEditor.setOnChange((editorNode) => {
            setData(editorNode)
          })
          nodeEditor.setOpen(true)
          nodeEditor.setEditorNode(data)
        }
      }}
      className={
        'bg-gray-200 dark:bg-gray-500 w-96 border-2 rounded dark:border-none text-black p-4 ' +
        (props.selected
          ? ' border-gray-600 dark:border-white'
          : 'border-gray-200 dark:border-gray-500')
      }
    >
      <Handle type="source" position="right" />
      <Handle type="target" position="left" />
      <div className="flex p-4 rounded-full">
        <Icon size={50} name={icon} className="m-auto" color={color} />
      </div>
      <div className="w-full h-full">{children(data)}</div>
    </Flex.Row>
  )
}

export default Node
