import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import nodeEditor from 'models/NodeEditor'
import Icon from 'components/Icon'
import Flex from 'components/Flex'
import Textarea from 'components/Textarea'
import Toogle from 'components/Toogle'
import project from 'models/Project'

const NodeEditor = observer(() => {
  const node = nodeEditor.editorNode || {}
  const vote = node.data?.vote

  useEffect(() => {
    if (node.id) {
      document.getElementById('editorTextarea').focus()
    }
  }, [node.id])

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
      <Flex.Col className="p-6" space="16">
        <div className="bg-gray-200 dark:bg-gray-800 rounded w-full">
          <Flex.Row space="0">
            <div className="flex p-4 rounded-full">
              <Icon size={50} name={icon} className="m-auto" color={color} />
            </div>
            <div className="p-2 pl-0 w-full">
              <Textarea
                id="editorTextarea"
                value={node.data?.text}
                onChange={(e) => {
                  if (nodeEditor?.editorNode?.data) {
                    nodeEditor.setEditorNode({
                      ...nodeEditor.editorNode,
                      data: {
                        ...nodeEditor.editorNode.data,
                        text: e.currentTarget.value,
                      },
                    })
                  }
                }}
                onBlur={(e) => {
                  const oldNode = project.findNode(nodeEditor?.editorNode?.id)
                  if (
                    nodeEditor?.editorNode?.id &&
                    nodeEditor?.editorNode?.data?.text !== oldNode?.data?.text
                  ) {
                    project.updateNode({
                      text: e.currentTarget.value,
                    })
                  }
                }}
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
        {(node.type === 'ACTION' || node.type === 'IDEA') && (
          <Flex.Row className="w-full" justify="around" space="0">
            <div
              className={
                'flex p-4 rounded border cursor-pointer flex-col space-around items-center trans ' +
                (node.data?.vote?.vote === true
                  ? 'text-indigo-400 border-indigo-400'
                  : '')
              }
              onClick={async (e) => {
                e.preventDefault()
                e.stopPropagation()
                await project.vote({
                  nodeId: node.id,
                  vote: vote?.vote === true ? null : true,
                })
              }}
            >
              <Icon size={50} name={'FaChevronUp'} className="m-auto" />
              <div>
                {node.data?.votes?.filter((vote) => {
                  return vote.vote === true
                }).length || '0'}
              </div>
            </div>
            <div
              className={
                'flex p-4 rounded border cursor-pointer flex-col space-around items-center trans ' +
                (node.data?.vote?.vote === false
                  ? 'text-red-500 border-red-500'
                  : '')
              }
              onClick={async (e) => {
                e.preventDefault()
                e.stopPropagation()
                await project.vote({
                  nodeId: node.id,
                  vote: vote?.vote === false ? null : false,
                })
              }}
            >
              <Icon size={50} name={'FaChevronDown'} className="m-auto" />
              <div>
                {node.data?.votes?.filter((vote) => {
                  return vote.vote === false
                }).length || '0'}
              </div>
            </div>
          </Flex.Row>
        )}
      </Flex.Col>
    </div>
  )
})

export default NodeEditor
