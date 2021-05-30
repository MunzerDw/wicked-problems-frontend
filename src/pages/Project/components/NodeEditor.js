import React from 'react'
import { observer } from 'mobx-react'
import nodeEditor from 'models/NodeEditor'
import Icon from 'components/Icon'
import Flex from 'components/Flex'
import Input from 'components/Input'

const NodeEditor = observer(() => {
  const node = nodeEditor.editorNode || {}

  return (
    <div
      className={
        'fixed top-0 right-0 h-full bg-white dark:bg-gray-700 shadow-lg dark:border-non overflow-hidden trans ' +
        (nodeEditor.open ? 'w-96' : 'w-0')
      }
      style={{
        zIndex: '110',
      }}
    >
      <Icon
        className="absolute top-0 left-0 cursor-pointer m-4"
        name="FaTimes"
        size="25"
        onClick={() => {
          nodeEditor.setOpen(false)
          nodeEditor.setEditorNode(null)
        }}
      />
      <div className="absolute top-0 right-0 cursor-pointer flex flex-col space-y-1 text-sm text-gray-500 m-1">
        <Flex.Row>x: {Math.floor(node.xPos * 100) / 100}</Flex.Row>
        <Flex.Row>y: {Math.floor(node.yPos * 100) / 100}</Flex.Row>
      </div>
      <br />
      <br />
      <Flex.Col className="p-6">
        <Input
          label="Text"
          value={node.data?.text}
          onChange={(e) =>
            nodeEditor.updateEditorNode({
              text: e.currentTarget.value,
            })
          }
        />
      </Flex.Col>
    </div>
  )
})

export default NodeEditor
