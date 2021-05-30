import Button from 'components/Button'
import Dropdown from 'components/Dropdown'
import Flex from 'components/Flex'
import Icon from 'components/Icon'
import nodeEditor from 'models/NodeEditor'
import project from 'models/Project'
import Node from './Node'

function Action({ ...props }) {
  return (
    <Node {...props} color={'#818CF8'} icon="FaArrowsAlt">
      {(data, setData, onDoubleClick) => (
        <>
          <Flex.Col
            justify="between"
            space="1"
            className="w-full p-2 pl-0"
            style={{
              minHeight: '120px',
            }}
          >
            <Flex.Row justify="end" className="w-full">
              <Dropdown
                trigger={<Icon name="FaEllipsisV" className="cursor-pointer" />}
                actions={[
                  {
                    key: (
                      <Flex.Row>
                        <Icon name="FaEdit" />
                        <div>edit</div>
                      </Flex.Row>
                    ),
                    action: () => {
                      onDoubleClick()
                    },
                  },
                  {
                    key: (
                      <Flex.Row>
                        <Icon name="FaTrashAlt" />
                        <div>delete</div>
                      </Flex.Row>
                    ),
                    action: () => {
                      project.deleteNodes([data.id])
                    },
                  },
                ]}
              />
            </Flex.Row>
            <div>{data?.data?.text}</div>
            <Flex.Row justify="end" className="w-full">
              <Button
                title="Action has been taken?"
                iconSize="25"
                icon="FaBullseye"
                iconColor={data.data?.done ? 'red' : 'gray'}
                onClick={async (e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  const newData = await nodeEditor.updateEditorNode(
                    {
                      done: !data.data?.done,
                    },
                    data.id
                  )
                  setData({ ...data, data: { ...data.data, ...newData } })
                }}
              />
            </Flex.Row>
          </Flex.Col>
        </>
      )}
    </Node>
  )
}

export default Action
