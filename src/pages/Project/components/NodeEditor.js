import React from 'react'
import { observer } from 'mobx-react'
import nodeEditor from 'models/NodeEditor'
import Icon from 'components/Icon'
import Flex from 'components/Flex'
import Input from 'components/Input'
import Textarea from 'components/Textarea'
import Toogle from 'components/Toogle'
import project from 'models/Project'

const NodeEditor = observer(() => {
  const node = nodeEditor.editorNode || {}
  let icon, color
  switch (node.type) {
    case 'ARGUMENT':
      if (node.data.for) {
        icon = 'FaCheck'
        color = '#10B981'
      } else {
        icon = 'FaTimes'
        color = '#EF4444'
      }
      break
    case 'IDEA':
      icon = 'FaLightbulb'
      color = '#F59E0B'
      break
    case 'ACTION':
      icon = 'FaArrowsAlt'
      color = '#818CF8'
      break
    case 'CONSTRAINT':
      icon = 'FaExclamationTriangle'
      color = ''
      break
    case 'QUESTION':
      icon = 'FaQuestion'
      color = '#fce71e'
      break

    default:
      break
  }

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
        <Flex.Row>x: {Math.floor(node?.data?.x * 100) / 100}</Flex.Row>
        <Flex.Row>y: {Math.floor(node?.data?.y * 100) / 100}</Flex.Row>
      </div>
      <br />
      <br />
      <Flex.Col className="p-6">
        <div className="bg-gray-200 dark:bg-gray-800 rounded w-full">
          <Flex.Row space="0">
            <div className="flex p-4 rounded-full">
              <Icon size={50} name={icon} className="m-auto" color={color} />
            </div>
            <div className="p-2 pl-0 w-full">
              <Textarea
                value={node.data?.text}
                onChange={(e) =>
                  project.updateNode({
                    text: e.currentTarget.value,
                  })
                }
              />
            </div>
          </Flex.Row>
        </div>
        {node.type === 'ACTION' && (
          <Flex.Col className="w-full" space="0">
            <div className="text-lg">Has this action been taken?</div>
            <Flex.Row className="w-full" justify="between">
              <div className="font-bold text-lg">
                {node.data.done ? 'Yes' : 'No'}
              </div>
              <Toogle
                checked={node.data.done}
                onChange={(val) =>
                  project.updateNode({
                    done: val,
                  })
                }
              />
            </Flex.Row>
          </Flex.Col>
        )}
        {/* {node.type === 'ACTION' || node.type === 'IDEA' && (
          <Flex.Col className="w-full" space="0">
            <div className="text-lg">Has this action been taken?</div>
            <Flex.Row className="w-full" justify="between">
              <div className="font-bold text-lg">
                {node.data.done ? 'Yes' : 'No'}
              </div>
              <Toogle
                checked={node.data.done}
                onChange={(val) =>
                  project.updateNode({
                    done: val,
                  })
                }
              />
            </Flex.Row>
          </Flex.Col>
        )} */}
      </Flex.Col>
    </div>
  )
})

export default NodeEditor
