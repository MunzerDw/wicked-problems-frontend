import Flex from 'components/Flex'
import Icon from 'components/Icon'
import { Handle } from 'react-flow-renderer'
import axios from 'axios'
import { useEffect, useState } from 'react'
import nodeEditor from 'models/NodeEditor'
import { observer } from 'mobx-react'
import project from 'models/Project'
import firebase from 'firebase/app'

const Node = observer(({ icon, color, children, ...props }) => {
  const [x, setX] = useState()
  const [y, setY] = useState()
  const nodeData = project.findNode(props.id) || {}
  const node = {
    ...nodeData,
    data: {
      ...nodeData.data,
      x: props.xPos,
      y: props.yPos,
      vote: nodeData.data?.votes?.find((vote) => {
        return vote.userId === firebase.auth()?.currentUser?.uid
      }),
    },
  }
  // eslint-disable-next-line
  useEffect(() => {
    if (nodeEditor.getEditorNode()?.id === props.id) {
      if (props.selected) {
        nodeEditor.setEditorNode(node)
      } else {
        nodeEditor.setOpen(false)
      }
    }
    if (
      !props.isDragging &&
      (props.xPos !== x || props.yPos !== y) &&
      (x || y)
    ) {
      axios.put('/nodes/' + props.id, { x: props.xPos, y: props.yPos })
    }
    if (!props.isDragging) {
      setX(props.xPos)
      setY(props.yPos)
    }
  })

  const onDoubleClick = () => {
    if (node.id !== nodeEditor.getEditorNode().id) {
      nodeEditor.setOpen(true)
      nodeEditor.setEditorNode(node)
    }
  }

  return (
    <Flex.Row
      space="0"
      onDoubleClick={onDoubleClick}
      className={
        'bg-gray-200 dark:bg-gray-500 w-96 border-2 rounded dark:border-none trans hover:shadow-lg ' +
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
      <div className="w-full h-full">
        {children({ ...node }, onDoubleClick)}
      </div>
    </Flex.Row>
  )
})

export default Node
